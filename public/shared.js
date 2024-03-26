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
  let forum = await getForum(getPlayerName());
  displayedForum.textContent = forum;

  let socket;
  configureWebSocket();

  async function getForum(user) {
    const response = await fetch(`api/Forums/${user}`);
    const forumData = await response.text();
    return forumData; // Assuming forumData contains forum information
  }



  function getPlayerName() {
    return localStorage.getItem('userName') || 'guest';
  }

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      const currentForum = await getForum(msg.from); // Use msg.from to get the forum for the sender
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

    // Display sent message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('event');
    messageDiv.innerHTML = `
      <div class="user-row">
        <span class="CurrentUser">${playerName}:</span> ${message}
      </div>`;
    chatMessages.appendChild(messageDiv);

    // Send message along with the current forum
    const currentForum = await getForum(playerName);
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
  async function changeForum() {
    const newForum = forumInput.value.trim();
    if (newForum !== '') {
      // Update the displayed forum
      displayedForum.textContent = newForum;

      // You can further implement sending the new forum to the server here
      // For example:
      await fetch(`/api/Forums/${getPlayerName()}`, {
        method: 'POST',
        body: JSON.stringify({newForum: newForum}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
