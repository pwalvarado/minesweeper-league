MinesweeperLeague.Collections.Cells = Backbone.Collection.extend({

  initialize: function () {
    this.gameOver = false;
    this.firstClick = true;
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

  firstClickReseed: function (clickedCell) {
    while (this.firstClick) {
      var randomCell = this.at(Math.floor(Math.random() * this.length));
      if (!randomCell.get('mined') && randomCell !== clickedCell) {
        randomCell.set('mined', true);
        this.firstClick = false;
      }
    }
  },

});

MinesweeperLeague.generateCells = function (options) {
  var cells = [];

  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      var cell = new MinesweeperLeague.Models.Cell({
        x: i,
        y: j,
        revealed: false,
        flagged: false,
        mined: MinesweeperLeague.seedMine(0.2)
      });

      cells.push(cell);
    }
  }

  return cells;
};
