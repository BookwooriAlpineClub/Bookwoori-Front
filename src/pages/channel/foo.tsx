import React, { useEffect, useState } from 'react';
import { connectHandler, sendHandler, disconnectHandler } from '@src/apis/chat';

const WebSocketExample = () => {
  const [messages, setMessages] = useState<MessageRequest[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    // 메시지 핸들러 정의 (새로운 메시지가 도착할 때 호출)
    const onMessage = (message: MessageRequest) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // WebSocket 연결 (구독하고자 하는 url)
    connectHandler(onMessage, '/topic/channel/23');

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      disconnectHandler();
    };
  }, []);

  // 메시지 전송 핸들러
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // dm일 경우 MessageRequest 형식 변경 필요
    const message: MessageRequest = {
      channelId: 23,
      // messageRoomId: 1,
      type: 'text',
      content: newMessage,
    };

    try {
      await sendHandler(message, '/pub/channel/send');
      console.log('Message sent successfully');
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <h1>WebSocket Chat Example</h1>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          height: '300px',
          overflowY: 'auto',
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>
            <strong>Room {message.messageRoomId}:</strong> {message.content}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Enter your message'
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default WebSocketExample;
