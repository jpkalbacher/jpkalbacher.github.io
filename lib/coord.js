(function(){
  if(typeof SnakeGame === 'undefined'){
    window.SnakeGame = {};
  }

  var Coord = SnakeGame.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function(newCoord){
    return new Coord(this.x + newCoord.x, this.y + newCoord.y);
  };

  Coord.prototype.nextCoord = function(){
    return this.Snake.MOVES[this.Snake.dir];
  };

  Coord.prototype.isEqual = function(otherCoord){
    if ((this.x == otherCoord.x) && (this.y == otherCoord.y)){
      return true;
    }
  };
})();
