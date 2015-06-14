MinesweeperLeague.Collections.Cells = Backbone.Collection.extend({

  initialize: function (modelArray, options) {
    this.gameOver = false;
    this.safeCells = options.numCells - options.numMines;
    this.revealedCells = 0;
  },

  model: MinesweeperLeague.Models.Cell,

  endGame: function () {
    this.gameOver = true;
    this.revealAllMines();
    this.trigger('gameOver');
  },

  incrementRevealedCells: function () {
    this.revealedCells += 1;
    if (this.revealedCells === this.safeCells && !this.gameOver) {
      this.trigger('gameWon');
    }
  },

  revealAllMines: function () {
    this.each(function (cell) {
      if (cell.get('mined')) { cell.reveal(); }
    });

    this.allMinesRevealed = true;
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
