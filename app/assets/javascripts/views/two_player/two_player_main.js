MinesweeperLeague.Views.TwoPlayerMain = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;
    this.pusher = new Pusher(window.pusherKey);
    this.channel = this.pusher.subscribe('presence-' + this.gameId);

    this.twoPlayerDirectionsView =
      new MinesweeperLeague.Views.TwoPlayerDirections();

    this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame({
      gameId: this.gameId,
      pusher: this.pusher, channel: this.channel,
      dimX: 9, dimY: 9, numMines: 10
    });

    this.listenToOnce(this.twoPlayerGameView, 'bothRematchReady', function () {
      // Unlisten to stuff. Unbind stuff.
      this.twoPlayerGameView.twoPlayerGameBoardsView.stopListening();
      this.twoPlayerGameView.off();

      this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame({
        gameId: this.gameId,
        pusher: this.pusher, channel: this.channel,
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
