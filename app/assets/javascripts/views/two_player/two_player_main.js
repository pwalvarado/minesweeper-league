MinesweeperLeague.Views.TwoPlayerMain = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;
    this.pusher = new Pusher(window.pusherKey);
    this.channel = this.pusher.subscribe('presence-' + this.gameId);

    this.twoPlayerDirectionsView =
      new MinesweeperLeague.Views.TwoPlayerDirections();

    switch (options.difficulty) {
      case "intermediate":
        this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame({
          gameId: this.gameId,
          pusher: this.pusher, channel: this.channel,
          dimX: 16, dimY: 16, numMines: 40
        });
        break;
      case "expert":
        this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame({
          gameId: this.gameId,
          pusher: this.pusher, channel: this.channel,
          dimX: 30, dimY: 16, numMines: 99
        });
        break;
      default:
        this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame({
          gameId: this.gameId,
          pusher: this.pusher, channel: this.channel,
          dimX: 9, dimY: 9, numMines: 10
        });
    }

    this.bindChannelEvents();
    this.activateListeners();
  },

  className: 'two-player-main container',

  render: function () {
    this.$el.empty();
    this.$el.append(this.twoPlayerDirectionsView.render().$el);
    this.$el.append(this.twoPlayerGameView.render().$el);

    return this;
  },


  activateListeners: function () {
    this.listenTo(this.twoPlayerGameView, 'gameConcluded', function () {
      this.disableMyBoard();
      this.$el.append($('<div>').addClass('rematch-row row').html(
        $('<button>').addClass('rematch-btn btn btn-primary')
          .addClass('col-md-2 col-md-offset-5').html('Rematch?')
      ));
    });

    // if I add a listenTo below this check rematch to make
    // sure I'm not doubling the listener.
  },

  events: {
    'click .rematch-btn': 'rematchClicked'
  },

  bindChannelEvents: function () {
    this.channel.bind('client-rematchRequested', function () {
      this.oppWantsRematch = true;
      if (this.iWantRematch) { this.rematch(); }
    }.bind(this));
  },

  rematchClicked: function () {
    this.channel.trigger('client-rematchRequested', {});
    this.iWantRematch = true;
    if (this.oppWantsRematch) {
      this.rematch();
    } else {
      this.$el.find('.rematch-btn')
        .html('Waiting for opponent...').addClass('disabled');
    }
  },

  rematch: function () {
    this.twoPlayerGameView.forceQuit();
    this.stopListening(this.twoPlayerGameView);
    this.$el.find('.rematch-btn').remove();
    this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame({
        gameId: this.gameId,
        pusher: this.pusher, channel:this.channel,
        dimX: 9, dimY: 9, numMines: 10
    });

    this.$el.append(this.twoPlayerGameView.render().$el);
    this.activateListeners();

    this.oppWantsRematch = false;
    this.iWantRematch = false;
  },

  disableMyBoard: function () {
    this.twoPlayerGameView.disableMyBoard();
  },

});
