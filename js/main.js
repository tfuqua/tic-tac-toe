

var Game = function(){

  //Game Data
  this.players = ["player1", "player2"];
  this.player1Score = this.getScore(this.players[0]);
  this.player2Score = this.getScore(this.players[1]);
  this.ties = this.getScore("ties");
  this.gamesPlayed = (this.player1Score + this.player2Score + this.ties);
  this.turn = this.players[this.gamesPlayed % 2]
  this.turns = 0;

  //HTML elements
  this.player1ScoreDiv = document.getElementById("p1-score");
  this.player2ScoreDiv = document.getElementById("p2-score");
  this.tiesScoreDiv = document.getElementById("ties-score");
  this.board = document.getElementById("board");
  this.squares = Array.prototype.slice.call(this.board.querySelectorAll(".square"));

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
      square.className += " active " + this.turn;
      this.turns++;
      this.turn = this.players[(this.gamesPlayed + this.turns) % 2]
    }
  },

  setScoreboard: function() {
    this.player1ScoreDiv.innerHTML = this.player1Score
    this.player2ScoreDiv.innerHTML = this.player2Score
    this.tiesScoreDiv.innerHTML = this.ties
  },

  getScore: function(player){
    if (localStorage.getItem(player) === null){
        localStorage.setItem(player, 0);
    }
    return parseInt(localStorage.getItem(player));
  },

  updateScore: function(player, score){
    localStorage.setItem(player, score);
  },

  addWin: function(player) {
    this.updateScore(player, (parseInt(this.getScore(player)) + 1))
  }
}

new Game();
