MinesweeperLeague.Views.TwoPlayerGame = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;

    this.twoPlayerGamePreGameView =
      new MinesweeperLeague.Views.TwoPlayerPreGame();

    this.twoPlayerGameHeaderView =
      new MinesweeperLeague.Views.TwoPlayerGameHeader();

    this.twoPlayerGameBoardsView =
      new MinesweeperLeague.Views.TwoPlayerGameBoards({
        gameId: this.gameId,
        dimX: options.dimX, dimY: options.dimY, numMines: options.numMines
      });

    // Turn off their board's functionality
    this.twoPlayerGameBoardsView.theirGameView.stopListening();
    this.twoPlayerGameBoardsView.theirGameView.undelegateEvents();
    this.twoPlayerGameBoardsView.theirGameView.gameBoardView.stopListening();

    this.activateListeners();
  },

  className: 'two-player-game-row row',

  template: JST['two_player/two_player_game'],

  render: function () {
    this.$el.html(this.template());
    this.$el.children().append(this.twoPlayerGamePreGameView.render().$el);
    this.$el.children().append(this.twoPlayerGameBoardsView.render().$el);

    return this;
  },

  events: {
    'click .start-btn': 'startGame',
  },

  startGame: function () {
    this.twoPlayerGamePreGameView.$el.replaceWith(
      this.twoPlayerGameHeaderView.render().$el);

    this.startCountdownAndGame();
  },

  activateListeners: function () {
    this.listenTo(this.twoPlayerGameBoardsView.myGameView, 'iWon', function () {
      this.twoPlayerGameBoardsView.channel.trigger('client-uLost', {});
    });

    this.listenTo(this, 'countdownFinished', function () {
      this.twoPlayerGameHeaderView.timer.start();
      this.enableYourBoard();
    });
  },

  startCountdownAndGame: function () {
    var num = 3;

    var countDown = setInterval(function () {
      if (num === 0) {
        clearInterval(countDown);
        this.twoPlayerGameBoardsView.playing = true;
        this.twoPlayerGameBoardsView.render();
      }

      this.twoPlayerGameBoardsView.twoPlayerPreStartView.$el.html(
        'The game will begin in ' + num);
      num -= 1;

    }.bind(this), 1000);

  },

});
