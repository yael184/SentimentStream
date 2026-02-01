const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { getNextHeadline } = require("./services/newsService");
const { analyzeSentiment } = require("./services/sentimentClient");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Client connected");

  const interval = setInterval(async () => {
    try {
      const headline = getNextHeadline();
      const sentiment = await analyzeSentiment(headline);

      socket.emit("sentiment_update", sentiment);
    } catch (err) {
      console.error("Error processing sentiment", err.message);
    }
  }, 3000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

server.listen(3001, () => {
  console.log("Node.js server running on http://localhost:3001");
});
