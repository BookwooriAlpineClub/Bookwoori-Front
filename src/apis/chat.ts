import { Client, Frame, IMessage } from '@stomp/stompjs';

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL!;

let stompClient: Client | null = null;
type MessageHandler = (message: MessageRequest) => void;

// WebSocket 연결 & 구독
export const connectHandler = (
  onMessage: MessageHandler,
  subscribeUrl: string,
) => {
  const accessToken = localStorage.getItem('accessToken');

  stompClient = new Client({
    brokerURL: WEBSOCKET_URL,
    connectHeaders: {
      Authorization: `${accessToken}`.trim(),
    },
    forceBinaryWSFrames: true,
    webSocketFactory: () => {
      const ws = new WebSocket(WEBSOCKET_URL);

      ws.onopen = () => {
        console.log('[WebSocket Open]: Connection established');
      };

      ws.onerror = (error) => {
        console.error('[WebSocket Error]:', error);
      };

      ws.onclose = (event) => {
        console.warn('[WebSocket Closed]:', event);
      };

      return ws;
    },
    onConnect: (frame) => {
      console.log('[STOMP Connected]:', frame);
      if (stompClient) {
        stompClient.subscribe(subscribeUrl, (message: IMessage) => {
          const body = JSON.parse(message.body);
          onMessage(body);
        });
      }
    },
    onDisconnect: (frame) => {
      console.log('[STOMP Disconnected]:', frame);
    },
    onUnhandledMessage: (message) => {
      console.warn('[STOMP Unhandled Message]:', message);
    },
    onUnhandledFrame: (frame) => {
      console.warn('[STOMP Unhandled Frame]:', frame);
    },
    onWebSocketError: (event: Event) => {
      console.error('[WebSocket Error Observed]:', event);
    },
    onStompError: (frame: Frame) => {
      console.error('[STOMP Error]:', frame.headers['message']);
      console.error('[STOMP Error Details]:', frame.body);
      console.error('[STOMP Headers]:', frame.headers);
    },
    debug: (msg: string) => {
      console.log('[STOMP Debug]:', msg);
    },
  });
  stompClient.activate();
};

// 메세지 전송
export const sendHandler = async (
  message: MessageRequest,
  sendUrl: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: sendUrl,
        body: JSON.stringify(message),
      });
      resolve();
    } else {
      reject(new Error('WebSocket is not connected'));
    }
  });
};

// 메세지 반응 전송
export const reactHandler = async (
  reaction: ReactionRequest,
  reactionUrl: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: reactionUrl,
        body: JSON.stringify(reaction),
      });
      resolve();
    } else {
      reject(new Error('WebSocket is not connected'));
    }
  });
};

// 메세지 답장 전송
export const replyHandler = async (
  reply: ReplyRequest,
  replyUrl: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: replyUrl,
        body: JSON.stringify(reply),
      });
      resolve();
    } else {
      reject(new Error('WebSocket is not connected'));
    }
  });
};

// WebSocket 연결 해제
export const disconnectHandler = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log('Disconnected from WebSocket');
  }
};
