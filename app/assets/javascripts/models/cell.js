MinesweeperLeague.Models.Cell = Backbone.Model.extend({

  initialize: function (options) {
    this.set('mined', Math.random() <= 0.2);
  },

  getNumber: function () {
    var number = 0, neighbors = this._getNeighbors();

    neighbors.forEach(function (neighbor) {
      if (neighbor.get('mined')) { number += 1; }
    });

    return number;
  },

  reveal: function () {
    if (this.get('mined') && !this.collection.gameOver) {
      this.collection.endGame();
    } else if (this.get('flagged') || this.get("revealed")) {
      // don't reveal flagged or already revealed cells.
    } else {
      this.set({ revealed: true });
      if (this.getNumber() === 0) { this._revealSurroundings(); }
    }
  },

  _getNeighbors: function () {
    var neighbors = [], thisX = this.get('x'), thisY = this.get('y');

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if ( i === 0 && j === 0 ) { continue; }

        var neighborX = thisX + i, neighborY = thisY + j;
        var neighbor = this.collection.findWhere({
          x: neighborX, y: neighborY
        });

        if (neighbor) { neighbors.push(neighbor); }
      }
    }

    return neighbors;
  },

  _revealSurroundings: function () {
    this._getNeighbors().forEach(function (neighbor) { neighbor.reveal(); });
  },

});
