MinesweeperLeague.Models.Cell = Backbone.Model.extend({

  initialize: function () {
    this.set({
      mined: this._seedMine(0.2),
      revealed: false
    });
  },

  getNeighborsArray: function () {
    var neighbors = [];

    var mainX = this.get('x');
    var mainY = this.get('y');

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if ( i === 0 && j === 0 ) { continue; }

        var neighborX = mainX + i;
        var neighborY = mainY + j;
        var neighbor = this.collection.findWhere({
          x: neighborX,
          y: neighborY
        });

        if (neighbor) { neighbors.push(neighbor); }
      }
    }

    return neighbors;
  },

  getNumber: function () {
    var number = 0;
    var neighbors = this.getNeighborsArray();

    neighbors.forEach(function (neighbor) {
      if (neighbor.get('mined')) { number += 1; }
    });

    return number;
  },

  // if this function gets called, the cell value must be 0
  revealSurroundings: function () {

  },

  _seedMine: function (fraction) {
    return Math.random() <= fraction ? true : false;
  },

});
