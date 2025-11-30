const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Un utilisateur connecté :", socket.id);

  socket.on("mouseMove", (data) => {
    // Broadcast à tous sauf l'émetteur
    socket.broadcast.emit("mouseMove", {
      id: socket.id,
      x: data.x,
      y: data.y
    });
  });

  socket.on("disconnect", () => {
    io.emit("removeCursor", socket.id);
  });
});

http.listen(3000, () => console.log("Serveur ouvert"));
