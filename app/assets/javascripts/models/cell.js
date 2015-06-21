MinesweeperLeague.Models.Cell = Backbone.Model.extend({

  getNumber: function () {
    var number = 0, neighbors = this._getNeighbors();

    neighbors.forEach(function (neighbor) {
      if (neighbor.get('mined')) { number += 1; }
    });

    return number;
  },

  reveal: function () {
    if (this.get('flagged') || this.get("revealed")) {
      // don't reveal flagged or already revealed cells.
    } else if (this.get('mined') && !this.collection.gameOver) {
      this.collection.endGame();
    } else {
      this.set({ revealed: true });
      this.collection.incrementRevealedCells();
      if (this.getNumber() === 0 && !this.collection.gameOver) {
        this._revealSurroundings();
      }
    }
  },

  hardReveal: function () {
    this.set({ revealed: true });
  },

  flag: function () {
    if (this.get('revealed') || this.collection.gameOver) { return; }

    if (this.get('flagged')) {
      this.set('flagged', false);
    } else {
      this.set('flagged', true);
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
