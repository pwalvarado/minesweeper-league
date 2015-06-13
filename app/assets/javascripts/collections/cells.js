MinesweeperLeague.Collections.Cells = Backbone.Collection.extend({

  initialize: function () {
    this.gameOver = false;
  },

  model: MinesweeperLeague.Models.Cell,

  endGame: function () {
    this.gameOver = true;
    this.revealAllMines();
    this.trigger('gameOver');
  },

  revealAllMines: function () {
    this.each(function (cell) {
      if (cell.get('mined')) { cell.reveal(); }
    });
  },

});

MinesweeperLeague.generateCells = function (options) {
  var cells = [];
  var remainingMinesToSeed = options.numMines;

  for (var i = 0; i < options.dimX; i++) {
    for (var j = 0; j < options.dimY; j++) {
      var cell = new MinesweeperLeague.Models.Cell({ x: i, y: j });

      cells.push(cell);
    }
  }

  var numOfCells = cells.length;

  while (remainingMinesToSeed !== 0) {
    var randomCell = cells[Math.floor(Math.random() * numOfCells)];
    if (!randomCell.get('mined')) {
      randomCell.set('mined', true);
      remainingMinesToSeed -= 1;
    }
  }

  return cells;
};
