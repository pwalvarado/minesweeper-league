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
    this.twoPlayerGameBoardsView.theirGameView.gameBoardView.stopListening();

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
    'click .start-btn': 'waitOrStart',
  },

  bindChannelEvents: function () {
    this.bce1 = function () { this.opponentReady = true; }.bind(this);
    this.channel.bind('client-oneReady', this.bce1);

    this.bce2 = function () {
      this.opponentReady = true;
      this.waitOrStart();
    }.bind(this);
    this.channel.bind('client-bothReady', this.bce2);
  },

  unbindChannelEvents: function () {
    this.channel.unbind('client-oneReady', this.bce1);
    this.channel.unbind('client-bothReady', this.bce2);
  },

  waitOrStart: function () {
    if (this.opponentReady) {
      if (!this.waiting) {
        this.channel.trigger('client-bothReady', {});
      }

      this.twoPlayerPreGameHeaderView.$el.remove();

      this.countdownThenPlay();
    } else {
      this.twoPlayerPreGameHeaderView.$el.find('.start-btn')
        .text('Waiting for opponent...').addClass('disabled');

      this.channel.trigger('client-oneReady', {});
      this.waiting = true;
    }
  },

  countdownThenPlay: function () {
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
  }

});
