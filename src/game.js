class Arena {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Player {
  constructor(name, color, posX, posY) {
    this.name = name;
    this.color = color;
    this.posX = posX;
    this.posY = posY;
  }
}

class Game {
  constructor(arena) {
    this.arena = arena;
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter((p) => p.name != player.name);
  }

  generateArena() {
    let newArena = [];
    for (let i = 0; i < this.arena.height; i++) {
      newArena.push([]);
      for (let j = 0; j < this.arena.width; j++) {
        newArena[i].push(
          this.players.find((p) => p.posX === j && p.posY === i)
        );
      }
    }

    return newArena;
  }

  playerMoveLeft(name) {
    const player = this.players.find((p) => p.name === name);
    if (
      player.posX - 1 >= 0 &&
      !this.players.some(
        (p) => p.posX === player.posX - 1 && p.posY === player.posY
      )
    ) {
      player.posX -= 1;
      return this.generateArena();
    }
    return false;
  }

  playerMoveRight(name) {
    const player = this.players.find((p) => p.name === name);
    if (
      player.posX + 1 < this.arena.width &&
      !this.players.some(
        (p) => p.posX === player.posX + 1 && p.posY === player.posY
      )
    ) {
      player.posX += 1;
      return this.generateArena();
    }
    return false;
  }

  playerMoveDown(name) {
    const player = this.players.find((p) => p.name === name);
    if (
      player.posY + 1 < this.arena.height &&
      !this.players.some(
        (p) => p.posY === player.posY + 1 && p.posX === player.posX
      )
    ) {
      player.posY += 1;
      return this.generateArena();
    }
    return false;
  }

  playerMoveUp(name) {
    const player = this.players.find((p) => p.name === name);
    if (
      player.posY - 1 >= 0 &&
      !this.players.some(
        (p) => p.posY === player.posY - 1 && p.posX === player.posX
      )
    ) {
      player.posY -= 1;
      return this.generateArena();
    }
    return false;
  }
}

module.exports = {
  Arena,
  Player,
  Game,
};
