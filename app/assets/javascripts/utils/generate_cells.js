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
