





const playerNameEl = document.querySelector('.player-name');
playerNameEl.textContent = getPlayerName();

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'guest';
}


async function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  this.socket.onopen = (event) => {
    this.displayMsg('system', 'game', 'connected');
  };
  this.socket.onclose = (event) => {
    this.displayMsg('system', 'game', 'disconnected');
  };
  this.socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    const name = getPlayerName();
    let currentForum = await fetch(`/Forum/${name}`)

    if (msg.type === GameEndEvent) {
      this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
    } else if (msg.type === GameStartEvent) {
      this.displayMsg('player', msg.from, `started a new game`);
    }
  };
}

function displayMsg(cls, from, msg) {
  const chatText = document.querySelector('#player-messages');
  chatText.innerHTML =
    `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}

function broadcastEvent(from, forum, message) {
  const event = {
    from: from,
    forum: forum,
    message: message,
  };
  this.socket.send(JSON.stringify(event));
}
