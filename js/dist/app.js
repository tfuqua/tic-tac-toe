"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    //Game Data
    this.players = [1, 2];
    this.ties = this.getScore("ties");
    this.player1Score = this.getScore(this.players[0]);
    this.player2Score = this.getScore(this.players[1]);
    this.gamesPlayed = this.player1Score + this.player2Score + this.ties;
    this.turn = this.players[this.gamesPlayed % 2]; //Used to alternate who goes first
    this.turns = 0;
    this.board = //ToDo update to support dynamic board size
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    //HTML elements
    this.player1ScoreDiv = document.getElementById("p1-score");
    this.player2ScoreDiv = document.getElementById("p2-score");
    this.tiesScoreDiv = document.getElementById("ties-score");
    this.boardDiv = document.getElementById("board");
    this.squares = Array.prototype.slice.call(this.boardDiv.querySelectorAll(".square"));

    this.start();
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.setScoreboard();
      this.initEvents();
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      this.squares.forEach(function (el, i) {
        el.addEventListener("click", function (ev) {
          _this.checkSelection(this);
        });
      });
    }
  }, {
    key: "checkSelection",
    value: function checkSelection(square) {
      if (!square.classList.contains("active")) {
        square.className += " active player" + this.turn;
        this.turns++;
        this.board[square.dataset.row][square.dataset.col] = this.turn;

        this.checkForWinner();
        this.turn = this.players[(this.gamesPlayed + this.turns) % 2];
      }
    }
  }, {
    key: "setScoreboard",
    value: function setScoreboard() {
      this.player1ScoreDiv.innerHTML = this.player1Score;
      this.player2ScoreDiv.innerHTML = this.player2Score;
      this.tiesScoreDiv.innerHTML = this.ties;
    }
  }, {
    key: "addWin",
    value: function addWin(player) {
      this.updateScore(player, this.getScore(player) + 1);
    }
  }, {
    key: "checkForWinner",
    value: function checkForWinner() {

      if (this.turns < 5) {
        return; //No possible for winner yet
      }

      //Check for Horizonal winner
      for (var i = 0; i < 3; i++) {
        if (this.board[i][0] === this.turn && this.board[i][1] === this.turn && this.board[i][2] === this.turn) {
          this.gameOver(this.turn);
          return;
        }
      }

      //Check for Vertical winner
      for (var i = 0; i < 3; i++) {
        if (this.board[0][i] === this.turn && this.board[1][i] === this.turn && this.board[2][i] === this.turn) {
          this.gameOver(this.turn);
          return;
        }
      }

      //Check for Diagonal Winner
      if (this.board[0][0] === this.turn && this.board[1][1] === this.turn && this.board[2][2] === this.turn) {
        this.gameOver(this.turn);
        return;
      }

      //Check for Reverse Diagonal Winner
      if (this.board[2][0] === this.turn && this.board[1][1] === this.turn && this.board[0][2] === this.turn) {
        this.gameOver(this.turn);
        return;
      }

      if (this.turns === 9) {
        this.gameOver("ties");
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this2 = this;

      this.setScoreboard();

      this.squares.forEach(function (el, i) {
        _this2.removeClasses(el, ["active", "player1", "player2"]);
      });

      this.turns = 0;
      this.board = //ToDo update to support dynamic board size
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

      console.log(this.board);
    }
  }, {
    key: "gameOver",
    value: function gameOver(player) {
      alert("Game Over");
      this.addWin(player);
      this.reset();
    }
  }, {
    key: "getScore",
    value: function getScore(player) {
      player = "player" + player; //update for readable localStorage value
      if (localStorage.getItem(player) === null) {
        localStorage.setItem(player, 0);
      }
      return parseInt(localStorage.getItem(player));
    }
  }, {
    key: "updateScore",
    value: function updateScore(player, score) {
      player = "player" + player; //update for readable localStorage value
      localStorage.setItem(player, score);
      this.syncScores();
    }
  }, {
    key: "syncScores",
    value: function syncScores() {
      this.player1Score = this.getScore(this.players[0]);
      this.player2Score = this.getScore(this.players[1]);
      this.ties = this.getScore("ties");
    }
  }, {
    key: "removeClasses",
    value: function removeClasses(el, classes) {
      for (var i = classes.length; i--;) {
        el.classList.remove(classes[i]);
      }
    }
  }]);

  return Game;
}();

new Game();
//# sourceMappingURL=app.js.map
