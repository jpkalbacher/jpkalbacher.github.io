(function(){
  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(20);
    this.started = false;
    this.highScore = 0;
    this.setupGrid();
    this.render();

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.prototype.handleKeyEvent = function(e){
    this.removeInstructions();
    e.preventDefault();
    if(!this.started && View.DIRS[e.keyCode]){
      this.interval = setInterval(
        this.step.bind(this),
        View.SPEED
      );
      this.started = true;
    } else if (View.DIRS[e.keyCode] && !this.board.snake.isOpposite(View.DIRS[e.keyCode])){
      this.board.snake.turn(View.DIRS[e.keyCode]);
    } else {
      return;
    }
  };

  View.SPEED = 100;
  View.DIRS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.prototype.setupGrid = function () {
    var html = "";
    html += "<div class='game-board'>";

    for (var i = 0; i < this.board.dimension; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.dimension; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }
    html += "</div>";
    html += ("<h2 class='instructions'>Press any key to start a new game!</h2>");
    html += ("<h2 class='score'> Score: 0" + 0 + "</h2>");
    html += ("<h2 class='high-score'> High Score: " + this.highScore + "</h2>");

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.render = function () {
    this.updateScore();
    this.updateClasses(this.board.snake.snakeCoords, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  };

  View.prototype.removeInstructions = function(){
    var $instructions = this.$el.find("h2.instructions");
    $instructions.replaceWith("<div></div>");
  };

  View.prototype.updateClasses = function(coords, className) {
    var $li = this.$el.find("li");
    this.$li.filter("." + className).removeClass();

    coords.forEach(function(coord){
      var flatCoord = (coord.x * this.board.dimension) + coord.y;
      $li.eq(flatCoord).addClass(className);
    }.bind(this));
  };

  View.prototype.updateScore = function(){
    var $h2 = this.$el.find("h2.score");
    $h2.replaceWith("<h2 class='score'>" + "Score: " + this.board.snake.points + "</h2>");
  };

  View.prototype.step = function(){
    if(this.board.snake.alive){
      this.board.snake.move();
      this.render();
    } else {
      this.endGame();
    }
  };

  View.prototype.updateHighScore = function(){
    if(this.board.snake.points > this.highScore){
      this.highScore = this.board.snake.points;
    }
    var $hs = this.$el.find("h2.high-score");
    $hs.replaceWith("<h2 class='high-score'> High Score: " + this.highScore + "</h2>");
  };

  View.prototype.endGame = function(){
    window.clearInterval(this.interval);
    this.updateHighScore();
    this.board = new SnakeGame.Board(20);
    this.started = false;
    this.setupGrid();
    this.render();
  };
})();
