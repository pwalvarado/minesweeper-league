MinesweeperLeague.Views.TwoPlayerGame = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;
    this.pusher = new Pusher(window.pusherKey);
    this.channel = this.pusher.subscribe('presence-' + this.gameId);
    bindChannelEvents();

    this.myGameView = new MinesweeperLeague.Views.Game({
      dimX: 30, dimY: 16, numMines: 99
    });

    this.theirGameView = new MinesweeperLeague.Views.Game({
      dimX: 30, dimY: 16, numMines: 99
    });

  },

  className: 'two-player-game-row row',

  render: function () {
    this.$el.empty();
    this.$el.append(this.myGameView.render().$el);
    this.$el.append(this.theirGameView.render().$el);

    return this;
  },

  events: {
    'click .cell': 'cellClicked'
  },

  cellClicked: function () {
    this.channel.trigger('test');
  },

  bindChannelEvents: function () {
    this.channel.bind('opponentClicked', function (data) {
      console.log("I'm in the test function");
    });
  },

});
