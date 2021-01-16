import {LiveChat} from "youtube-chat";
const WebSocket = require('ws');

// Look for the stream
const Stream = new LiveChat({liveId: ""});

Stream.start();

var webSocketServer;
var sockets: any = [];
Stream.on("start", () => {
  console.log("Connected to the stream.");

  // Set up websockets
  webSocketServer = new WebSocket.Server({
    port: 8080
  });

  webSocketServer.on("connection", (socket: any) => {
    sockets.push(socket);
  });

  webSocketServer.on("error", (err: any) => {
    console.warn(err);
  });

});

// Set up comments
Stream.on("comment", (comment: any) => {

  for (var socket = 0; sockets.length > socket; socket++) {
    sockets[socket].send(JSON.stringify(comment));
  };

  console.log("Sent comment " + comment.id + " to the stream");

});

Stream.start();