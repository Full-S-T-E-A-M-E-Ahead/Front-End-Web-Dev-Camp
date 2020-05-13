class Board {
  constructor() {
    this.emptyItem = "";
    this.grid = ["", "", "", "", "", "", "", "", ""];
  }

  resetBoard = () => {
    for (let i = 0; i < this.grid.length; i++) {
      this.setItem(i, this.emptyItem);
    }
  };

  update = (index, value) => {
    if (index < 0 || index > this.grid.length || !this.isEmpty(index)) {
      return false;
    }
    this.setItem(index, value);
    return true;
  };
  setItem = (index, item) => {
    this.grid[index] = item;
  };
  getItem = (index) => {
    return this.grid[index];
  };
  isEmpty = (index) => {
    return this.getItem(index) === this.emptyItem;
  };
  checkRows = (value) => {
    for (let i = 0; i < 9; i += 3) {
      if (this.checkLine(i, i + 1, i + 2, value)) {
        return true;
      }
    }
    return false;
  };
  checkColumns = (value) => {
    for (let i = 0; i < 3; i++) {
      if (this.checkLine(i, i + 3, i + 6, value)) {
        return true;
      }
    }
    return false;
  };
  checkDiagnol = (value) => {
    return this.checkLine(0, 4, 8, value) || this.checkLine(2, 4, 6, value);
  };
  checkLine = (i, j, k, value) => {
    if (
      this.getItem(i) === value &&
      this.getItem(j) === value &&
      this.getItem(k) === value
    ) {
      return true;
    }
    return false;
  };
  isWinner = (value) => {
    if (
      this.checkRows(value) ||
      this.checkColumns(value) ||
      this.checkDiagnol(value)
    ) {
      return true;
    }
    return false;
  };
}

class Game {
  constructor() {
    this.turn = 0;
    this.play = true;
  }
  resetTurn = () => {
    this.turn = 0;
  };
  getGamePeice = () => {
    return this.turn % 2 == 0 ? "X" : "O";
  };
  incrementTurn = () => {
    this.turn++;
  };
  stopGame = () => {
    this.play = false;
  };
  startGame = () => {
    this.play = true;
  };
  isPlaying = () => {
    return this.play;
  };
}

class UI {
  constructor() {
    this.board = new Board();
    this.game = new Game();
    this.blockElements = [];
  }
  initialize = () => {
    this.initializeBlockElements();
    this.initializeResetButton();
  };
  initializeBlockElements = () => {
    // for every block element - could be document.queryElements
    for (let i = 0; i < 9; i++) {
      const blockDiv = document.querySelector(`#block_${i}`);
      blockDiv.addEventListener("click", () => {
        this.selectBlock(i);
      });
      this.blockElements.push(blockDiv);
    }
  };
  initializeResetButton = () => {
    document
      .querySelector("#reset-button")
      .addEventListener("click", this.resetBoard);
  };
  resetBoard = () => {
    this.game.resetTurn();
    this.board.resetBoard();
    document.getElementById("winner").textContent = "";
    this.renderBoard();
    this.game.startGame();
  };
  selectBlock = (index) => {
    if (!this.game.isPlaying()) return;
    const gamePeice = this.game.getGamePeice();
    if (this.board.update(index, gamePeice)) {
      this.renderBoard();
      if (this.board.isWinner(gamePeice)) {
        document.getElementById(
          "winner"
        ).textContent = `${gamePeice} Has Won the Game!!`;
        this.game.stopGame();
      }
      this.game.incrementTurn();
    }
  };
  renderBoard = () => {
    // for every #block_i div
    for (let i = 0; i < this.blockElements.length; i++) {
      this.blockElements[i].textContent = this.board.getItem(i);
      if (!this.board.isEmpty(i)) {
        this.blockElements[i].classList.remove("notoccupied");
        this.blockElements[i].classList.add("occupied");
      } else {
        this.blockElements[i].classList.add("notoccupied");
      }
    }
  };
}

const playGame = () => {
  const ui = new UI();
  ui.initialize();
  ui.renderBoard();
};

document.addEventListener("DOMContentLoaded", playGame);
