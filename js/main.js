

var Game = function(){

  //Game Data
  this.players = [1, 2];
  this.ties = this.getScore("ties");
  this.player1Score = this.getScore(this.players[0]);
  this.player2Score = this.getScore(this.players[1]);
  this.gamesPlayed = (this.player1Score + this.player2Score + this.ties);
  this.turn = this.players[this.gamesPlayed % 2] //Used to alternate who goes first
  this.turns = 0;
  this.board = //ToDo update to support dynamic board size
  [[0, 0, 0],
   [0, 0, 0],
   [0, 0, 0]];

  //HTML elements
  this.player1ScoreDiv = document.getElementById("p1-score");
  this.player2ScoreDiv = document.getElementById("p2-score");
  this.tiesScoreDiv = document.getElementById("ties-score");
  this.boardDiv = document.getElementById("board");
  this.squares = Array.prototype.slice.call(this.boardDiv.querySelectorAll(".square"));

  this.start();
}

Game.prototype = {

  start: function() {
    this.setScoreboard();
    this.initEvents();
  },

  initEvents: function() {
    var _this = this;

    this.squares.forEach(function (el, i) {
        el.addEventListener("click", function (ev) {
          _this.checkSelection(this);
        });
    });
  },

  checkSelection: function(square){
    if (!square.classList.contains("active")){
      square.className += " active player" + this.turn;
      this.turns++;
      this.board[square.dataset.row][square.dataset.col] = this.turn;
      this.checkForWinner();
      this.turn = this.players[(this.gamesPlayed + this.turns) % 2]
    }
  },

  setScoreboard: function() {
    this.player1ScoreDiv.innerHTML = this.player1Score
    this.player2ScoreDiv.innerHTML = this.player2Score
    this.tiesScoreDiv.innerHTML = this.ties
  },

  addWin: function(player) {
    this.updateScore(player, (this.getScore(player) + 1))
  },

  checkForWinner: function () {

      if (this.turns < 5){
          return; //No possible for winner yet
      }

      //Check for Horizonal winner
      for (var i = 0; i < 3; i++){
        if (this.board[i][0] === this.turn &&
            this.board[i][1] === this.turn &&
            this.board[i][2] === this.turn){
              this.gameOver(this.turn);
              return;
            }
      }

      //Check for Vertical winner
      for (var i = 0; i < 3; i++){
        if (this.board[0][i] === this.turn &&
            this.board[1][i] === this.turn &&
            this.board[2][i] === this.turn){
              this.gameOver(this.turn);
              return;
            }
      }

      //Check for Diagonal Winner
      for (var i = 0; i < 3; i++){
        if (this.board[0][0] === this.turn &&
            this.board[1][1] === this.turn &&
            this.board[2][2] === this.turn){
              this.gameOver(this.turn);
              return;
            }
      }

      //Check for Reverse Diagonal Winner
      for (var i = 0; i < 3; i++){
        if (this.board[2][0] === this.turn &&
            this.board[1][1] === this.turn &&
            this.board[0][2] === this.turn){
              this.gameOver(this.turn);
              return;
            }
      }

      if (this.turns === 9){
        this.gameOver("ties");
      }
  },
  reset: function () {
    this.setScoreboard();

    this.squares.forEach(function (el, i) {
      removeClasses(el, ["active", "player1", "player2"]);
    });

    this.board = //ToDo update to support dynamic board size
    [[0, 0, 0],
     [0, 0, 0],
     [0, 0, 0]];

     console.log(this.board);
  },

  gameOver: function(player) {
    alert("Game Over");
    this.addWin(player)
    this.reset();
  },

  getScore: function(player){
    player = "player" + player;//update for readable localStorage value
    if (localStorage.getItem(player) === null){
        localStorage.setItem(player, 0);
    }
    return parseInt(localStorage.getItem(player));
  },

  updateScore: function(player, score){
    player = "player" + player; //update for readable localStorage value
    localStorage.setItem(player, score);
    this.syncScores();
  },

  syncScores: function() {
    this.player1Score = this.getScore(this.players[0]);
    this.player2Score = this.getScore(this.players[1]);
    this.ties = this.getScore("ties");
  },
}

new Game();
