// WebRTC Hybrid Peer-to-Peer & Online Cloud Signaling Manager for Ruang Jiwa
// Uses PeerJS Cloud Signaling (Public Cloud Broker on 0.peerjs.com via WSS) for
// cross-device & cross-network internet calls (e.g. Phone to Laptop),
// combined with BroadcastChannel for zero-latency same-machine testing.

import { Peer } from 'peerjs';

export class WebRTCManager {
  constructor({ roomId, role, onRemoteStream, onConnectionState, onChatMessage, onClientWaiting, onHostAdmitted }) {
    this.roomId = roomId || 'RJ-8821940';
    this.role = role || 'client'; // 'client' | 'psychologist'
    this.onRemoteStream = onRemoteStream;
    this.onConnectionState = onConnectionState;
    this.onChatMessage = onChatMessage;
    this.onClientWaiting = onClientWaiting;
    this.onHostAdmitted = onHostAdmitted;

    this.localStream = null;
    this.remoteStream = null;
    this.peer = null;
    this.activeCall = null;
    this.dataConnection = null;
    this.isConnected = false;
    this.isHostAdmitted = false;
    this.retryInterval = null;

    // Standard predictable peer IDs based on clean room name
    const cleanRoom = this.roomId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    this.myPeerId = this.role === 'psychologist' 
      ? `rj-${cleanRoom}-psy` 
      : `rj-${cleanRoom}-client`;
    this.targetPeerId = this.role === 'psychologist' 
      ? `rj-${cleanRoom}-client` 
      : `rj-${cleanRoom}-psy`;

    // Local BroadcastChannel for instant same-browser fallback
    this.initBroadcastSignaling();
  }

  initBroadcastSignaling() {
    try {
      this.localBc = new BroadcastChannel(`ruangjiwa_bc_${this.roomId}`);
      this.localBc.onmessage = (event) => {
        const data = event.data;
        if (!data || data.senderRole === this.role) return;

        if (data.type === 'peer_online' && this.localStream && !this.isConnected) {
          console.log('[WebRTC Hybrid] Local peer detected, initiating call to:', this.targetPeerId);
          this.callTargetPeer();
        } else if (data.type === 'client_waiting') {
          console.log('[WebRTC Signaling] Pasien ada di ruang tunggu:', data.clientInfo);
          if (this.onClientWaiting) this.onClientWaiting(data.clientInfo);
          // If host already admitted, respond with host_admit immediately to let client in!
          if (this.role === 'psychologist' && this.isHostAdmitted) {
            this.admitClient();
          }
        } else if (data.type === 'host_admit') {
          console.log('[WebRTC Signaling] Psikolog mengizinkan masuk!');
          if (this.onHostAdmitted) this.onHostAdmitted();
        } else if (data.type === 'chat_msg') {
          if (this.onChatMessage) this.onChatMessage(data.payload);
        }
      };
    } catch (err) {
      console.warn('BroadcastChannel not supported:', err);
    }
  }

  // Start WebRTC session with local media stream
  async start(localStream) {
    this.localStream = localStream;
    this.initPeerJS();

    // Broadcast presence locally as well
    if (this.localBc) {
      this.localBc.postMessage({ type: 'peer_online', senderRole: this.role });
    }
  }

  // Initialize PeerJS Cloud Connection (WSS)
  initPeerJS() {
    try {
      const peerConfig = {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      };

      // Create Peer with primary ID, or fallback if ID occupied
      this.peer = new Peer(this.myPeerId, peerConfig);

      this.peer.on('open', (id) => {
        console.log(`[WebRTC Cloud] Online PeerJS ID Terdaftar: ${id}`);
        this.startCallingLoop();
      });

      // Handle Incoming Call from remote peer
      this.peer.on('call', (call) => {
        console.log('[WebRTC Cloud] Menerima panggilan video masuk dari:', call.peer);
        this.activeCall = call;

        // Answer with local media stream
        call.answer(this.localStream);

        call.on('stream', (remoteMediaStream) => {
          console.log('[WebRTC Cloud] Remote Stream Video/Audio diterima!');
          this.handleConnectedStream(remoteMediaStream);
        });

        call.on('close', () => {
          this.handleDisconnected();
        });

        call.on('error', (err) => {
          console.error('[WebRTC Call Error]', err);
        });
      });

      // Handle Incoming Data Connection for Chat
      this.peer.on('connection', (conn) => {
        console.log('[WebRTC Cloud] Saluran Chat Data terhubung dari:', conn.peer);
        this.setupDataConnection(conn);
      });

      // Handle Peer Errors (e.g. ID already taken upon fast refresh)
      this.peer.on('error', (err) => {
        console.warn('[WebRTC Peer Warning]', err.type, err.message);
        if (err.type === 'unavailable-id') {
          // Retry with alternative suffix
          const fallbackId = `${this.myPeerId}-${Math.floor(1000 + Math.random() * 9000)}`;
          console.log(`[WebRTC] ID utama sibuk, mencoba ID alternatif: ${fallbackId}`);
          this.peer.destroy();
          this.peer = new Peer(fallbackId, peerConfig);
          this.peer.on('open', () => this.startCallingLoop());
        }
      });

      this.peer.on('disconnected', () => {
        console.log('[WebRTC Cloud] Koneksi ke signaling broker terputus, mencoba reconnect...');
        this.peer.reconnect();
      });

    } catch (err) {
      console.error('[WebRTC Cloud Init Error]', err);
    }
  }

  // Periodic heartbeat / call attempt until target peer answers
  startCallingLoop() {
    this.callTargetPeer();

    if (!this.retryInterval) {
      this.retryInterval = setInterval(() => {
        if (!this.isConnected && this.localStream) {
          this.callTargetPeer();
        }
      }, 3500);
    }
  }

  // Call the counterpart (Client calls Psychologist, or Psychologist calls Client)
  callTargetPeer() {
    if (!this.peer || this.peer.destroyed || !this.localStream || this.isConnected) return;

    try {
      console.log(`[WebRTC Cloud] Menghubungi lawan bicara (${this.targetPeerId})...`);
      
      // 1. Establish Audio/Video Call
      const call = this.peer.call(this.targetPeerId, this.localStream);
      if (call) {
        this.activeCall = call;

        call.on('stream', (remoteMediaStream) => {
          console.log('[WebRTC Cloud] Remote stream diterima dari panggilan keluar!');
          this.handleConnectedStream(remoteMediaStream);
        });

        call.on('close', () => {
          this.handleDisconnected();
        });

        call.on('error', (err) => {
          // Expected when target peer hasn't opened page yet
        });
      }

      // 2. Establish Data Channel for instant P2P Chat
      if (!this.dataConnection || !this.dataConnection.open) {
        const conn = this.peer.connect(this.targetPeerId, { reliable: true });
        this.setupDataConnection(conn);
      }

    } catch (err) {
      // Peer not online yet
    }
  }

  setupDataConnection(conn) {
    this.dataConnection = conn;

    conn.on('open', () => {
      console.log('[WebRTC Chat DataChannel] Saluran chat online siap!');
      if (this.role === 'psychologist' && this.isHostAdmitted) {
        this.admitClient();
      }
    });

    conn.on('data', (data) => {
      if (data && data.type === 'client_waiting') {
        console.log('[WebRTC Cloud Data] Pasien ada di ruang tunggu:', data.clientInfo);
        if (this.onClientWaiting) this.onClientWaiting(data.clientInfo);
        if (this.role === 'psychologist' && this.isHostAdmitted) {
          this.admitClient();
        }
      } else if (data && data.type === 'host_admit') {
        console.log('[WebRTC Cloud Data] Psikolog mengizinkan masuk!');
        if (this.onHostAdmitted) this.onHostAdmitted();
      } else if (this.onChatMessage) {
        this.onChatMessage(data);
      }
    });

    conn.on('close', () => {
      this.dataConnection = null;
    });
  }

  handleConnectedStream(stream) {
    this.remoteStream = stream;
    this.isConnected = true;

    if (this.retryInterval) {
      clearInterval(this.retryInterval);
      this.retryInterval = null;
    }

    if (this.onRemoteStream) {
      this.onRemoteStream(stream);
    }

    if (this.onConnectionState) {
      this.onConnectionState('connected');
    }
  }

  handleDisconnected() {
    this.isConnected = false;
    this.remoteStream = null;

    if (this.onConnectionState) {
      this.onConnectionState('disconnected');
    }

    // Resume listening and trying to reconnect
    this.startCallingLoop();
  }

  // Send Chat message across devices via WebRTC DataChannel & BroadcastChannel
  sendPeerMessage(msgObj) {
    let sent = false;

    // 1. Send via PeerJS Cloud DataConnection
    if (this.dataConnection && this.dataConnection.open) {
      try {
        this.dataConnection.send(msgObj);
        sent = true;
      } catch (err) {
        console.warn('Gagal kirim via DataConnection:', err);
      }
    }

    // 2. Also send via BroadcastChannel for same-machine tabs
    if (this.localBc) {
      try {
        this.localBc.postMessage({
          type: 'chat_msg',
          senderRole: this.role,
          payload: msgObj
        });
        sent = true;
      } catch (e) {
        // Ignore
      }
    }

    return sent;
  }

  // Client notifies Host that they are ready in the Virtual Waiting Room
  notifyClientWaiting(clientInfo = {}) {
    const payload = {
      type: 'client_waiting',
      senderRole: this.role,
      clientInfo
    };

    if (this.localBc) {
      try {
        this.localBc.postMessage(payload);
      } catch (e) {
        // ignore
      }
    }

    if (this.dataConnection && this.dataConnection.open) {
      try {
        this.dataConnection.send(payload);
      } catch (err) {
        console.warn('Failed to send client_waiting over DataConnection:', err);
      }
    }
  }

  // Host (Psychologist) admits client into the active video consultation room
  admitClient() {
    const payload = {
      type: 'host_admit',
      senderRole: this.role
    };

    if (this.localBc) {
      try {
        this.localBc.postMessage(payload);
      } catch (e) {
        // ignore
      }
    }

    if (this.dataConnection && this.dataConnection.open) {
      try {
        this.dataConnection.send(payload);
      } catch (err) {
        console.warn('Failed to send host_admit over DataConnection:', err);
      }
    }
  }

  // Close and clean up all connections
  close() {
    if (this.retryInterval) {
      clearInterval(this.retryInterval);
      this.retryInterval = null;
    }

    if (this.activeCall) {
      this.activeCall.close();
      this.activeCall = null;
    }

    if (this.dataConnection) {
      this.dataConnection.close();
      this.dataConnection = null;
    }

    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }

    if (this.localBc) {
      this.localBc.close();
      this.localBc = null;
    }

    this.isConnected = false;
  }
}
