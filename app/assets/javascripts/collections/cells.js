MinesweeperLeague.Collections.Cells = Backbone.Collection.extend({

  initialize: function () {
    this.gameOver = false;
  },

  model: MinesweeperLeague.Models.Cell,

  endGame: function () {
    this.gameOver = true;
    this.revealAllMines();
  },

  revealAllMines: function () {
    this.each(function (cell) {
      if (cell.get('mined')) { cell.reveal(); }
    });
  },

});

MinesweeperLeague.generateCells = function (options) {
  var cells = [];

  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      var cell = new MinesweeperLeague.Models.Cell({ x: i, y: j });

      cells.push(cell);
    }
  }

  return cells;
};
