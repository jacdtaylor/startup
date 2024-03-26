

document.addEventListener('DOMContentLoaded', () => {
  const playerNameEl = document.querySelector('.player-name');
  playerNameEl.textContent = getPlayerName();

  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('player-messages');

  const playerName = getPlayerName();
  let socket;

  configureWebSocket();

  function getPlayerName() {
    return localStorage.getItem('userName') || 'guest';
  }

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      const currentForum = await fetch(`api/Forum/${playerName}`);
      if (msg.forum === currentForum) {
        displayMsg(msg.from, msg.message);
      }
    };
  }

  function displayMsg(from, msg) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('event');
    messageDiv.innerHTML = `<div class="user-row">
    <span class="OtherUser">${from}:</span> ${msg}
  </div>`;
    chatMessages.appendChild(messageDiv);
  }

  async function sendMessage() {
    
    const message = messageInput.value.trim();
    console.log(message)
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('event');
    messageDiv.innerHTML = `
    <div class="user-row">
    <span class="CurrentUser">${playerName}:</span> ${message}
  </div>`;
    chatMessages.appendChild(messageDiv);
    const currentForum = await fetch(`api/Forum/${playerName}`);

    if (message !== '') {
      const event = {
        from: playerName,
        message: message,
        forum: currentForum
      };
      socket.send(JSON.stringify(event));
      messageInput.value = '';
    }
  }

  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});