(function(){
  if (typeof SnakeGame === 'undefined'){
    window.SnakeGame = {}
  }

  var Apple = SnakeGame.Apple = function(board){
    this.board = board;
    this.newApple();
  };

  Apple.prototype.randCoord = function(){
    return new SnakeGame.Coord(
      Math.floor(Math.random() * this.board.dimension),
      Math.floor(Math.random() * this.board.dimension)
    )
  };

  Apple.prototype.newApple = function(){
    var randCoord = this.randCoord();

    while(this.board.snake.isOccupying(randCoord)){
      randCoord = this.randCoord();
    }

    this.position = randCoord;
  };
})();
