MinesweeperLeague.Views.GameMineCount = Backbone.View.extend({

  initialize: function (options) {
    this.minesRemaining = options.minesRemaining;
  },

  className: 'game-mine-count col-md-4',

  render: function () {
    this.$el.html(this.minesRemaining);

    return this;
  },

});
