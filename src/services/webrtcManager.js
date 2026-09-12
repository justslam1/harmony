// WebRTC Peer-to-Peer Manager for Ruang Jiwa Telehealth
// Supports STUN Server ICE Candidates, BroadcastChannel signaling for multi-tab/browser testing,
// and RTCDataChannel for real-time encrypted messaging.

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' }
  ]
};

export class WebRTCManager {
  constructor({ roomId, role, onRemoteStream, onConnectionState, onChatMessage }) {
    this.roomId = roomId || 'RJ-8821940';
    this.role = role || 'client'; // 'client' or 'psychologist'
    this.peerId = `${this.role}_${Math.random().toString(36).substring(2, 7)}`;
    this.onRemoteStream = onRemoteStream;
    this.onConnectionState = onConnectionState;
    this.onChatMessage = onChatMessage;

    this.peerConnection = null;
    this.dataChannel = null;
    this.localStream = null;
    this.signalingChannel = null;
    this.isInitiator = this.role === 'client';
    this.isConnected = false;

    this.initSignaling();
  }

  // Initialize browser-based signaling (BroadcastChannel & localStorage fallback)
  initSignaling() {
    try {
      this.signalingChannel = new BroadcastChannel(`ruangjiwa_webrtc_${this.roomId}`);
      this.signalingChannel.onmessage = (event) => this.handleSignalingData(event.data);
    } catch (e) {
      console.warn('BroadcastChannel not supported, using fallback event listener', e);
    }
  }

  // Broadcast signaling messages (Offer, Answer, ICE Candidate)
  sendSignaling(data) {
    const payload = {
      ...data,
      senderId: this.peerId,
      senderRole: this.role,
      roomId: this.roomId
    };

    if (this.signalingChannel) {
      this.signalingChannel.postMessage(payload);
    }
  }

  // Handle incoming signaling messages from peer
  async handleSignalingData(msg) {
    if (!msg || msg.senderId === this.peerId || msg.roomId !== this.roomId) return;

    try {
      if (msg.type === 'peer_joined') {
        // A new peer entered the room
        console.log(`[WebRTC] Peer bergabung: ${msg.senderRole} (${msg.senderId})`);
        if (this.role === 'client' && this.localStream) {
          // Client creates Offer
          await this.createOffer();
        }
      } else if (msg.type === 'offer') {
        console.log('[WebRTC] Menerima Offer dari peer');
        await this.handleOffer(msg.offer);
      } else if (msg.type === 'answer') {
        console.log('[WebRTC] Menerima Answer dari peer');
        await this.handleAnswer(msg.answer);
      } else if (msg.type === 'ice-candidate') {
        if (this.peerConnection && msg.candidate) {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.candidate));
        }
      } else if (msg.type === 'peer_left') {
        this.handlePeerDisconnected();
      }
    } catch (err) {
      console.error('[WebRTC Signaling Error]', err);
    }
  }

  // Start WebRTC connection with a local media stream
  async start(localStream) {
    this.localStream = localStream;
    this.setupPeerConnection();

    // Broadcast that this peer has joined the room
    this.sendSignaling({ type: 'peer_joined' });

    // If client, check if psychologist is already waiting or start negotiation
    if (this.role === 'client') {
      setTimeout(() => {
        this.createOffer();
      }, 800);
    }
  }

  setupPeerConnection() {
    if (this.peerConnection) return;

    this.peerConnection = new RTCPeerConnection(ICE_SERVERS);

    // Add local tracks to peer connection
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
      });
    }

    // Remote stream event
    this.peerConnection.ontrack = (event) => {
      console.log('[WebRTC] Remote stream received:', event.streams[0]);
      if (this.onRemoteStream && event.streams && event.streams[0]) {
        this.onRemoteStream(event.streams[0]);
      }
    };

    // ICE Candidate generation
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignaling({
          type: 'ice-candidate',
          candidate: event.candidate
        });
      }
    };

    // Connection state monitoring
    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection.connectionState;
      console.log('[WebRTC] Connection state:', state);
      this.isConnected = state === 'connected';
      if (this.onConnectionState) {
        this.onConnectionState(state);
      }
    };

    // Setup DataChannel for instant P2P encrypted chat
    if (this.role === 'client') {
      this.dataChannel = this.peerConnection.createDataChannel('ruangjiwa_chat', {
        ordered: true
      });
      this.setupDataChannelListeners(this.dataChannel);
    } else {
      this.peerConnection.ondatachannel = (event) => {
        this.dataChannel = event.channel;
        this.setupDataChannelListeners(this.dataChannel);
      };
    }
  }

  setupDataChannelListeners(channel) {
    if (!channel) return;
    channel.onopen = () => {
      console.log('[WebRTC DataChannel] Saluran chat P2P terhubung!');
    };
    channel.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (this.onChatMessage) {
          this.onChatMessage(parsed);
        }
      } catch (err) {
        console.warn('Failed to parse WebRTC DataChannel message:', err);
      }
    };
  }

  // Create & Send SDP Offer
  async createOffer() {
    if (!this.peerConnection) this.setupPeerConnection();

    try {
      const offer = await this.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      await this.peerConnection.setLocalDescription(offer);
      this.sendSignaling({
        type: 'offer',
        offer: offer
      });
    } catch (err) {
      console.error('[WebRTC] Gagal membuat Offer:', err);
    }
  }

  // Handle incoming Offer & Send SDP Answer
  async handleOffer(offer) {
    if (!this.peerConnection) this.setupPeerConnection();

    try {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.sendSignaling({
        type: 'answer',
        answer: answer
      });
    } catch (err) {
      console.error('[WebRTC] Gagal menangani Offer:', err);
    }
  }

  // Handle incoming Answer
  async handleAnswer(answer) {
    try {
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    } catch (err) {
      console.error('[WebRTC] Gagal menangani Answer:', err);
    }
  }

  // Send real-time P2P chat message over DataChannel
  sendPeerMessage(msgObj) {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      this.dataChannel.send(JSON.stringify(msgObj));
      return true;
    }
    return false;
  }

  handlePeerDisconnected() {
    this.isConnected = false;
    if (this.onConnectionState) {
      this.onConnectionState('disconnected');
    }
  }

  // Close and cleanup WebRTC connection
  close() {
    this.sendSignaling({ type: 'peer_left' });

    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    if (this.signalingChannel) {
      this.signalingChannel.close();
      this.signalingChannel = null;
    }

    this.isConnected = false;
  }
}
