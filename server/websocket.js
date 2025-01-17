const ws = require('ws');

const wss = new ws.Server({
  port: 5000
}, () => console.log('Server started successfully on port: 5000'));

wss.on('connection', function connection(ws) {
  ws.on('message', function(message) {
    message = JSON.parse(message);
    switch(message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
    ws.on('close', function() {
      broadcastDisconnect(message.username);
    })
  });
});

function broadcastMessage(message) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  });
}

function broadcastDisconnect(username) {
  const message = {
    id: Date.now(),
    username,
    event: "disconnection"
  };
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  }); 
}