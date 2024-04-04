import React, { useState, useEffect } from 'react';
import "./shared.css"
import { Notifier } from './forumMessage';

export function Forum() {
  const [currentForum, setCurrentForum] = useState("Public");
  const [events, setEvents] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [forumImput, setForumInput] = useState('');

  React.useEffect(() => {
    Notifier.addHandler(handleGameEvent);

    return () => {
      Notifier.removeHandler(handleGameEvent);
    };
  }); // Empty dependency array to run only once on mount

  function handleGameEvent(event) {
    setEvents([...events, event]);
  }

  function createMessageArray() {
    return events
      .filter(event => event.forum === currentForum) // Filter events by the current forum
      .map((event, index) => (
        <div key={index} className='event'>
          <span className={'player-event'} style={{color: (event.from === localStorage.getItem('userName') ? "rgb(165, 220, 235)" : "rgb(221, 148, 40)")}}>
            {event.from.split('@')[0]}: 
          </span>
          {event.message}
        </div>
      ));
  }

  function sendMessage() {
    setEvents([...events, {from:localStorage.getItem('userName'), message:messageInput, forum:currentForum}]);
    Notifier.broadcastEvent(localStorage.getItem('userName'),messageInput,currentForum);
    setMessageInput("");
    
  }

  function changeForum(newForum) {
    setCurrentForum(newForum);
    setForumInput("")
  }

  return (
    <main>
      <div>
        <div>{currentForum}</div>
        <input
          type="text"
          id="forum-input"
          placeholder="Enter New Forum"
          value={forumImput}
          onChange={(e) => setForumInput(e.target.value)}
          
        />
        <button id="change-forum-btn" onClick={() => changeForum(forumImput)}>Change Forum</button>
      </div>

      <br />

      <div id="chat-box">
        <div id="player-messages">
          {createMessageArray()}
        </div>
        
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
       
      <button className="send-button" onClick={sendMessage}>Send</button>
    </main>
  );
}
