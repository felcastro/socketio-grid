const { Arena, Player, Game } = require("./game");
const game = new Game(new Arena(10, 10));

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res, next) => {
  res.sendFile("./pages/index.html", { root: __dirname });
});

io.on("connection", (socket) => {
  const newPlayer = new Player(Date.now().toString(), "blue", 0, 0);
  game.addPlayer(newPlayer);
  console.log("connected: " + newPlayer.name);

  socket.emit("you", newPlayer);

  io.emit("updateArena", game.generateArena());

  socket.on("moveUp", function (playerName) {
    if (playerName) {
      if (game.playerMoveUp(playerName)) {
        io.emit("updateArena", game.generateArena());
      }
    }
  });

  socket.on("moveDown", function (playerName) {
    if (playerName) {
      if (game.playerMoveDown(playerName)) {
        io.emit("updateArena", game.generateArena());
      }
    }
  });

  socket.on("moveLeft", function (playerName) {
    if (playerName) {
      if (game.playerMoveLeft(playerName)) {
        io.emit("updateArena", game.generateArena());
      }
    }
  });

  socket.on("moveRight", function (playerName) {
    if (playerName) {
      if (game.playerMoveRight(playerName)) {
        io.emit("updateArena", game.generateArena());
      }
    }
  });

  socket.on("disconnect", () => {
    game.removePlayer(newPlayer);
    io.emit("updateArena", game.generateArena());
    console.log("disconnected: " + newPlayer.name);
  });
});

http.listen(3001, () => {
  console.log("server started at port " + 3001);
});
