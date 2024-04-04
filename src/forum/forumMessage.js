
class EventMessage {
    constructor(from, message, forum) {
        this.from = from;
        this.message = message;
        this.forum = forum;
    }}


class messageNotifier {
events = [];
handlers = [];

constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onmessage = async (msg) => {
        try{
            const event = JSON.parse(await msg.data.text());
            this.receiveEvent(event);
        } catch {}};}


        addHandler(handler) {
            this.handlers.push(handler);
          }
        
          removeHandler(handler) {
            this.handlers.filter((h) => h !== handler);
          }
        

broadcastEvent(from, message, forum) {
    const event = new EventMessage(from, message, forum)
    this.socket.send(JSON.stringify(event));

}

receiveEvent(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }}


const Notifier = new messageNotifier();
export {Notifier};