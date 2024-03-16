import React, { FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// 메시지 객체의 타입 정의
interface Message {
  user: string;
  message: string;
}

export const Chatting = () => {
  const [messages, setMessages] = useState<Message[]>([]); // 메시지 배열의 타입을 Message로 지정
  const [input, setInput] = useState('');
  const socket = io('ws://localhost:4200/chatting', {
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('chatMessage', (message: Message) => {
      console.log('message', message);
      // message 객체의 타입을 Message로 지정
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageSend = () => {
    if (input.trim() !== '') {
      socket.emit('chatMessage', { message: input });
      setInput('');
    }
  };

  console.log('messagesState', messages);
  console.log('socket', socket);

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}: </strong>
            {message.message}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};
