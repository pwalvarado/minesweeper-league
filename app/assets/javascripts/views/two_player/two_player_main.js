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

  bindChannelEvents: function () {
    this.channel.bind('client-rematchRequested', function () {
      this.opponentWantsRematch = true;
    }.bind(this));

    this.channel.bind('client-bothWantRematch', function () {
      this.createRematch();
    }.bind(this));
  },

  activateListeners: function () {
    this.listenTo(this.twoPlayerGameView, 'gameConcluded', function () {
      this.$el.append($('<div>').addClass('rematch-row row').html(
        $('<button>').addClass('rematch-btn btn btn-primary')
          .addClass('col-md-2 col-md-offset-5').html('Rematch?')
      ));
    });

    // if I add a listenTo below this check createRematch to make
    // sure I'm not doubling the listener.
  },

  events: {
    'click .rematch-btn': 'rematchClicked'
  },

  rematchClicked: function () {
    this.iWantRematch = true;

    if (!this.opponentWantsRematch) {
      this.channel.trigger('client-rematchRequested', {});
      this.$el.find('.rematch-btn').addClass('disabled')
        .html('Waiting for opponent...');
    } else {
      this.channel.trigger('client-bothWantRematch', {});
      this.createRematch();
    }
  },

  createRematch: function () {
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

    this.opponentWantsRematch = false;
    this.iWantRematch = false;
  },

});
