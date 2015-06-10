MinesweeperLeague.Collections.Cells = Backbone.Collection.extend({

  initialize: function (options) {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        var cell = new MinesweeperLeague.Models.Cell({ x: i, y: j });
        this.add(cell);
      }
    }
  },

  model: MinesweeperLeague.Models.Cell

});
