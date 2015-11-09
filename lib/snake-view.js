(function(){
  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(20);
    this.started = false;
    this.setupGrid();
    this.render();

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.prototype.handleKeyEvent = function(e){
    e.preventDefault();
    if(!this.started && View.DIRS[e.keyCode]){
      this.interval = setInterval(
        this.step.bind(this),
        View.SPEED
      );
      this.started = true;
    } else if (View.DIRS[e.keyCode]){
      this.board.snake.turn(View.DIRS[e.keyCode]);
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
    html += ("<h2>" + "Score: " + this.board.snake.points + "</h2>");

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.render = function () {
    this.updateScore();
    this.updateClasses(this.board.snake.snakeCoords, "snake");
    this.updateClasses([this.board.apple.position], "apple");
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
    var $h2 = this.$el.find("h2");
    $h2.replaceWith("<h2>" + "Score: " + this.board.snake.points + "</h2>");
  };

  View.prototype.step = function(){
    if(this.board.snake.alive){
      this.board.snake.move();
      this.render();
    } else {
      this.endGame();
    }
  };

  View.prototype.endGame = function(){
    window.clearInterval(this.interval);
    alert("No dice, grandma");
  };
})();
