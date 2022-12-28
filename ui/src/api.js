// Adjust the webSocket protocol to what is being used for HTTP
const _protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
let _socket = new WebSocket(`${_protocol}://${window.location.host}/api/ws`);

let _onmessageCallbacks = [];
let _onconnectedCallbacks = [];

// Display that we have opened the webSocket
_socket.onopen = (event) => {
  console.log('connected');
  _onconnectedCallbacks.forEach((cb) => cb(true));
};

// Display messages we receive from our friends
_socket.onmessage = async (event) => {
  const text = await event.data.text();
  const msg = JSON.parse(text);

  _onmessageCallbacks.forEach((cb) => cb(msg));
};

_socket.onclose = (event) => {
  console.log('disconnected');
  _onconnectedCallbacks.forEach((cb) => cb(false));
};

function sendMessage(msg) {
  const data = JSON.stringify(msg);
  _socket.send(data);
}

export default {
  sendMessage,
  onmessage(callback) {
    _onmessageCallbacks.push(callback);
  },
  onconnected(callback) {
    _onconnectedCallbacks.push(callback);
  },
};
