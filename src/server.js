const Path = require("path");
const fs = require("fs");
const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const srcPath = Path.join(__dirname, "../src");

const watcherAPIKey = process.env.API_KEY;

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

const interval = setInterval(() => {
  webSocketServer.clients.forEach((webSocket) => {
    if (webSocket.isAlive === false) return webSocket.terminate();
    webSocket.isAlive = false;
    console.log(`clients: ${webSocketServer.clients.size} `);
    webSocket.ping(() => {});
  });
}, 30000);

webSocketServer.on("close", (webSocket) => {
  console.log(`clients: ${webSocketServer.clients.size} `);
  clearInterval(interval);
});

webSocketServer.on("connection", (webSocket) => {
  console.log(`clients: ${webSocketServer.clients.size} `);
  webSocket.isAlive = true;
  webSocket.on("pong", () => {
    webSocket.isAlive = true;
  });
  webSocket.on("message", (message) => {
    const data = JSON.parse(message);
    // If message is from the watcher
    if (data.apiKey === watcherAPIKey) {
      // Broadcast to everyone else
      const broadcastableData = {
        ...data,
        apiKey: undefined, // DO NOT LEAK API KEY
      };
      webSocketServer.clients.forEach((client) => {
        if (client !== webSocket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(broadcastableData));
        }
      });
      fs.writeFileSync(Path.join(srcPath, data.fileName), data.fileSerialized, {
        flag: "w",
      });
    }
  });
});

//start our server
server.listen(80, () => {
  console.log(`server started on port ${server.address().port}`);
});
