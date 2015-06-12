MinesweeperLeague.Models.Cell = Backbone.Model.extend({

  getNumber: function () {
    var number = 0;
    var neighbors = this._getNeighbors();

    neighbors.forEach(function (neighbor) {
      if (neighbor.get('mined')) { number += 1; }
    });

    if (number === 0) { this._revealSurroundings(); }

    return number;
  },

  reveal: function () {
    if (this.get('mined') && !this.collection.gameOver) {
      this.collection.endGame();
    } else {
      this.set({ revealed: true });
    }
  },

  sweep: function () {
    var flagCount = 0;

    this._getNeighbors().forEach(function (neighbor) {
      if (neighbor.get('flagged')) { flagCount += 1; }
    });

    if (flagCount >= this.getNumber()) { this._revealSurroundings(); }
    console.log(flagCount);
    console.log(this.getNumber());
    console.log(flagCount >= this.getNumber());
  },

  _getNeighbors: function () {
    var neighbors = [];
    var thisX = this.get('x'), thisY = this.get('y');

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if ( i === 0 && j === 0 ) { continue; }

        var neighborX = thisX + i, neighborY = thisY + j;
        var neighbor = this.collection.findWhere({
          x: neighborX,
          y: neighborY
        });

        if (neighbor) { neighbors.push(neighbor); }
      }
    }

    return neighbors;
  },

  // this never reveals flagged cells.
  _revealSurroundings: function () {
    var neighbors = this._getNeighbors();

    neighbors.forEach(function (neighbor) {
      if (!neighbor.get('flagged')) {
        neighbor.reveal();
      }
    });
  },

});

MinesweeperLeague.seedMine = function (fraction) {
    return Math.random() <= fraction ? true : false;
};
