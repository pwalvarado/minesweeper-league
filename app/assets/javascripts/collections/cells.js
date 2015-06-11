MinesweeperLeague.Collections.Cells = Backbone.Collection.extend({

  model: MinesweeperLeague.Models.Cell

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
