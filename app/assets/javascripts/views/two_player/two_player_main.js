MinesweeperLeague.Views.TwoPlayerMain = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;

    this.twoPlayerDirectionsView =
      new MinesweeperLeague.Views.TwoPlayerDirections();

    this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame({
      gameId: this.gameId,
      dimX: 9, dimY: 9, numMines: 10
    });

    this.listenTo(this.twoPlayerGameView, 'bothRematchReady', function () {
      this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame({
        gameId: this.gameId,
        dimX: 9, dimY: 9, numMines: 10
      });

      this.render();
    }.bind(this));
  },

  className: 'two-player-main container',

  render: function () {
    this.$el.empty();
    this.$el.append(this.twoPlayerDirectionsView.render().$el);
    this.$el.append(this.twoPlayerGameView.render().$el);

    return this;
  },

  rematch: function () {
  }

});
