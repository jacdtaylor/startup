document.addEventListener('DOMContentLoaded', async () => {
  const playerNameEl = document.querySelector('.player-name');
  playerNameEl.textContent = getPlayerName();

  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('player-messages');
  const changeForumBtn = document.getElementById('change-forum-btn');
  const playerName = getPlayerName();
  const forumInput = document.getElementById('forum-input');
  
  const displayedForum = document.getElementById('current-forum');

  // Get and display the current forum
  const forum = {forum:"Public"};
  displayedForum.textContent = forum.forum;

  let socket;
  configureWebSocket();




  function getPlayerName() {
    return localStorage.getItem('userName') || 'guest';
  }

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    socket.onmessage = async (event) => {
      const stuff = await event.data.text()
      console.log("Received message:", stuff);

      // console.log("recieved Message")
      const msg = JSON.parse(stuff);
      if (msg.forum === forum.forum) {
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
    
    // Display sent message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('event');
    messageDiv.innerHTML = `
      <div class="user-row">
        <span class="CurrentUser">${playerName}:</span> ${message}
      </div>`;
    chatMessages.appendChild(messageDiv);
    // Send message along with the current forum
    if (message !== '') {
      const event = {
        from: playerName,
        message: message,
        forum: forum.forum
      };
     
      socket.send(JSON.stringify(event));
      messageInput.value = '';
    }
  }
  async function changeForum() {
    const newForum = forumInput.value.trim();
    if (newForum !== '') {
      // Update the displayed forum
      displayedForum.textContent = newForum;
      forum.forum = newForum
    }
  }

  // Add event listener to the "Change Forum" button
  changeForumBtn.addEventListener('click', changeForum);

  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});
