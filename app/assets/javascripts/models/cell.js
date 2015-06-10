MinesweeperLeague.Models.Cell = Backbone.Model.extend({

  initialize: function () {
    this.mined = this._seedMine(0.2);
  },

  _seedMine: function (fraction) {
    return Math.random() <= fraction ? true : false;
  },

});
