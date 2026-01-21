import React, { useState, useEffect, useRef } from 'react';

const PrivateChat = () => {
  const [messages, setMessages] = useState([
    { text: "Bonjour, j'ai une question concernant cette demande.", sender: 'received' },
    { text: "Bien sûr, de quoi s'agit-il ?", sender: 'sent' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const sender = messages.length % 2 === 0 ? 'received' : 'sent';
    
    setMessages([...messages, { text: newMessage, sender: sender }]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="private-chat">
      <h4>Chat privé</h4>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
            <span className="timestamp">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

export default PrivateChat;