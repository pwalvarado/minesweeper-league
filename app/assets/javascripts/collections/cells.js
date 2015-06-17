MinesweeperLeague.Collections.Cells = Backbone.Collection.extend({

  initialize: function (modelArray, options) {
    this.gameOver = false;
    this.numSafe = options.numCells - options.numMines;
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
    if (this.revealedCells === this.numSafe && !this.gameOver) {
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
