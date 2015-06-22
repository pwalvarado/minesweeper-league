MinesweeperLeague.Views.TwoPlayerGame = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;
    this.pusher = options.pusher;
    this.channel = options.channel;

    this.twoPlayerPreGameHeaderView =
      new MinesweeperLeague.Views.TwoPlayerPreGameHeader({
        pusher: this.pusher, channel: this.channel
      });

    this.twoPlayerGameBoardsView =
      new MinesweeperLeague.Views.TwoPlayerGameBoards({
        gameId: this.gameId,
        pusher: this.pusher, channel: this.channel,
        twoPlayerGameView: this,
        dimX: options.dimX, dimY: options.dimY, numMines: options.numMines
      });

    // Turn off their board's functionality
    this.twoPlayerGameBoardsView.theirGameView.stopListening();
    this.twoPlayerGameBoardsView.theirGameView.undelegateEvents();
    this.twoPlayerGameBoardsView.theirGameView.boardView.stopListening();

    this.bindChannelEvents();
  },

  className: 'two-player-game-row row',

  template: JST['two_player/two_player_game'],

  render: function () {
    this.$el.html(this.template());
    this.$el.children().append(this.twoPlayerPreGameHeaderView.render().$el);
    this.$el.children().append(this.twoPlayerGameBoardsView.render().$el);

    return this;
  },

  events: {
    'click .start-btn': 'startClicked',
  },

  bindChannelEvents: function () {
    this.oppReady = function () {
      this.opponentReady = true;
      if (this.imReady) { this.start(); }
    }.bind(this);
    this.channel.bind('client-oppReady', this.oppReady);
  },

  unbindChannelEvents: function () {
    this.channel.unbind('client-oppReady', this.oppReady);
  },

  startClicked: function () {
    this.channel.trigger('client-oppReady', {});
    this.imReady = true;
    if (this.opponentReady) {
      this.start();
    } else {
      this.$el.find('.start-btn')
        .html('Waiting for opponent...').addClass('disabled');
    }
  },

  start: function () {
    this.$el.find('.two-player-pre-game-header-row').remove();
    var num = 3;

    var countDown = setInterval(function () {
      if (num === 0) {
        clearInterval(countDown);
        this.twoPlayerGameBoardsView.playing = true;
        this.twoPlayerGameBoardsView.render();
      }

      this.twoPlayerGameBoardsView.twoPlayerPreGameBoardsView.$el.html(
        'The game will begin in ' + num);
      num -= 1;

    }.bind(this), 1000);
  },

  forceQuit: function () {
    this.twoPlayerPreGameHeaderView.forceQuit();
    this.twoPlayerGameBoardsView.forceQuit();
    this.unbindChannelEvents();
    this.remove();
  },

  disableMyBoard: function () {
    this.twoPlayerGameBoardsView.disableMyBoard();
  },

});
