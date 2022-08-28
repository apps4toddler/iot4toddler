const aedes = require("aedes")()
const server = require("net").createServer(aedes.handle)


const port = 1883
const wsPort = 443


aedes.on("clientError", function(client, err) {
  console.log("client error", client.id, err.message, err.stack)
})

aedes.on("connectionError", function(client,err) {
  console.log(" client error", client, err.message, err.stack)
})

aedes.on("publish", function(package,client) {
  if (client) {
    console.log("message from client", client.id)
  }
})

aedes.on("subscribe", function(subscriptions, client) {
  if(client) {
    console.log("subscribe from client", subscriptions, client.id)
  }
})

aedes.on("client2", function(client) {
  console.log("new client", client.id)
})

server.listen(port, function() {
  console.log("server listen on port", port)
})

const httpServer = require('http').createServer()
const ws = require('websocket-stream')
ws.createServer({ server: httpServer }, aedes.handle)


httpServer.listen(wsPort, function () {
  console.log('Aedes MQTT-WS listening on port: ' + wsPort)
  aedes.publish({ topic: 'aedes/hello', payload: "I'm broker " + aedes.id })
});

