import React, { useState, useEffect } from 'react';

export function Forum() {
  const [playerName, setPlayerName] = useState('');
  const [forum, setForum] = useState('Public');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    setPlayerName(localStorage.getItem('userName') || 'guest');
  }, []);

  useEffect(() => {
    configureWebSocket();
  }, [forum]);

  let socket;

  const configureWebSocket = () => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage.forum === forum) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        console.log("Recieved")
      }
    };
  };

  const sendMessage = () => {
    
    const trimmedMessage = messageInput.trim();
    
      
      const newMessage = {
        from: playerName,
        message: trimmedMessage,
        forum: forum
      };
      
      socket.send(JSON.stringify(newMessage));
     
      setMessageInput('');
    
  };

  const changeForum = () => {
    const newForum = document.getElementById('forum-input').value.trim();
    if (newForum !== '') {
      setForum(newForum);
      setMessages([]);
    }
  };

  return (
    <main>
      <div>
        <input type="text" id="forum-input" placeholder="Enter new forum..." />
        <button id="change-forum-btn" onClick={changeForum}>Change Forum</button>
      </div>

      <br />

      <div id="chat-box">
        <div id="player-messages">
          {messages.map((msg, index) => (
            <div className="event" key={index}>
              <div className="user-row">
                <span className={msg.from === playerName ? 'CurrentUser' : 'OtherUser'}>
                  {msg.from}:
                </span> {msg.message}
              </div>
            </div>
          ))}
        </div>
        <input
          type="text"
          id="message-input"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button id="send-button" onClick={sendMessage}>Send</button>
      </div>
    </main>
  );
}
