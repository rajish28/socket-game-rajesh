// Import packages
const express = require('express');
const app = express();
const port = 3000;
const socketIO = require("socket.io");
const path = require("path");
var util = require("util");
var i =0;
// Configuration
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

// Start server
app.use(express.static(__dirname+'/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})
const server  = app.listen(port, () => console.log('The server running on Port '+port));
// Initiatlize SocketIO
const io = socketIO(server);

// Register "connection" events to the WebSocket
io.on("connection", function(socket) {

  //console.log(i)
  // Register "join" events, requested by a connected client
  //console.log('socket: ' + util.inspect(socket));
  //console.log(JSON.stringify(socket, null, 2))
  socket.on("join", function (room) {
    console.log('i: '+ i);
    //console.log("room : " + room);
    // join channel provided by client
    //console.log(socket);
    if(i<2){
      i++;
      socket.join(room);
      console.log('room');
   /* var roster = io.sockets.clients('test');
        
    roster.forEach(function(test) {
        console.log('Username: ' + client);
    });*/
    // Register "image" events, sent by the client
    socket.on("image", function(msg) {
      console.log('msg : ' +msg);
      // Broadcast the "image" event to all other clients in the room
      //console.log(util.inspect(socket));
      socket.to(room).emit("image", msg);
    });
    
    socket.on("disconnecting", (reason) => {
    i--;
  });
    }
    else{
      socket.emit('message','Hello, my name is Server');      
    }
    socket.on("message", function(msg) {
        io.to(socketid).emit('message', 'for your eyes only');
      });
    
  });
});