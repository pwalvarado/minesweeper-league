MinesweeperLeague.Views.TwoPlayerGame = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;

    this.twoPlayerGameHeaderView =
      new MinesweeperLeague.Views.TwoPlayerGameHeader();

    this.twoPlayerGameBoardsView =
      new MinesweeperLeague.Views.TwoPlayerGameBoards({
        gameId: this.gameId,
        dimX: options.dimX, dimY: options.dimY, numMines: options.numMines
      });

    this.activateListener();
  },

  className: 'two-player-game-row row',

  template: JST['two_player/two_player_game'],

  render: function () {
    this.$el.html(this.template());
    // this.$el.children().append(this.twoPlayerGameHeaderView.render().$el);
    this.$el.children().append(this.twoPlayerGameBoardsView.render().$el);

    return this;
  },

  activateListener: function () {
    this.listenTo(this.twoPlayerGameBoardsView.myGameView, 'iWon', function () {
      this.twoPlayerGameBoardsView.channel.trigger('client-uLost', {});
    });
  },

});
