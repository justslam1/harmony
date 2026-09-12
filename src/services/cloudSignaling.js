// Universal Cross-Device Cloud Signaling for Ruang Jiwa Telehealth
// Enables real-time synchronization between separate devices (e.g. Psychologist on Laptop, Client on Smartphone)
// Uses lightweight public SSE (Server-Sent Events) and HTTP JSON polling over HTTPS.

const CLIENT_INSTANCE_ID = `client_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

export function getCleanRoomTopic(roomId) {
  const clean = (roomId || 'RJ-8821940').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `ruangjiwa-room-${clean}`;
}

/**
 * Publish an event to the cloud room topic
 * @param {string} roomId
 * @param {object} payload
 */
export async function publishCloudEvent(roomId, payload) {
  try {
    const topic = getCleanRoomTopic(roomId);
    const bodyObj = {
      ...payload,
      senderInstanceId: CLIENT_INSTANCE_ID,
      timestamp: Date.now()
    };

    const res = await fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj)
    });

    return res.ok;
  } catch (err) {
    console.warn('[CloudSignaling] Gagal publish event:', err);
    return false;
  }
}

/**
 * Subscribe to cloud room events with SSE (real-time) and immediate history poll
 * @param {string} roomId
 * @param {function} onEvent
 * @returns {function} cleanup function
 */
export function subscribeCloudEvents(roomId, onEvent) {
  const topic = getCleanRoomTopic(roomId);
  let eventSource = null;
  let pollInterval = null;
  let isClosed = false;
  const processedMessageIds = new Set();

  const handleRawMessage = (rawMsg) => {
    try {
      if (!rawMsg) return;
      let parsed = typeof rawMsg === 'string' ? JSON.parse(rawMsg) : rawMsg;
      
      // If wrapped in ntfy format: { event: 'message', message: '...' }
      if (parsed.message && typeof parsed.message === 'string') {
        try {
          parsed = JSON.parse(parsed.message);
        } catch (e) {
          // not json message
        }
      }

      // Ignore echoes from self
      if (parsed.senderInstanceId && parsed.senderInstanceId === CLIENT_INSTANCE_ID) {
        return;
      }

      // Ignore messages older than 20 minutes
      if (parsed.timestamp && Date.now() - parsed.timestamp > 20 * 60 * 1000) {
        return;
      }

      onEvent(parsed);
    } catch (e) {
      console.warn('[CloudSignaling] Gagal parse event payload:', e);
    }
  };

  // 1. Immediate Poll for Recent Events (e.g. if host admitted before client opened page)
  const fetchRecentEvents = async () => {
    if (isClosed) return;
    try {
      const res = await fetch(`https://ntfy.sh/${topic}/json?poll=1`);
      if (!res.ok) return;
      const text = await res.text();
      const lines = text.trim().split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const item = JSON.parse(line);
          if (item.id && processedMessageIds.has(item.id)) continue;
          if (item.id) processedMessageIds.add(item.id);
          handleRawMessage(item);
        } catch (err) {}
      }
    } catch (err) {
      // Offline or network glitch
    }
  };

  fetchRecentEvents();

  // 2. Real-time EventSource (SSE)
  try {
    eventSource = new EventSource(`https://ntfy.sh/${topic}/sse`);

    eventSource.onmessage = (event) => {
      if (isClosed || !event.data) return;
      try {
        const item = JSON.parse(event.data);
        if (item.id) {
          if (processedMessageIds.has(item.id)) return;
          processedMessageIds.add(item.id);
        }
        handleRawMessage(item);
      } catch (err) {
        handleRawMessage(event.data);
      }
    };

    eventSource.onerror = () => {
      // EventSource auto-reconnects, nothing needed here
    };
  } catch (err) {
    console.warn('[CloudSignaling] EventSource not supported, using fallback polling');
  }

  // 3. Fallback Poll every 3 seconds
  pollInterval = setInterval(fetchRecentEvents, 3000);

  // Return unsubscribe cleanup
  return () => {
    isClosed = true;
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  };
}
