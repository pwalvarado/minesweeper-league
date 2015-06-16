MinesweeperLeague.Views.TwoPlayer = Backbone.View.extend({

  initialize: function () {
    // debugger;
    // var pusher = new Pusher(ENV["pusher_app_id"]);
    // var channel = pusher.subscribe(gameId);
    // // var triggered = channel.trigger('client-eventName', {some: JSONData});
    // channel.bind('opponentMove', updateOpponentBoard);

    this.twoPlayerDirectionsView =
      new MinesweeperLeague.Views.TwoPlayerDirections();
    this.twoPlayerGameView = new MinesweeperLeague.Views.TwoPlayerGame();
  },

  className: 'two-player-main container',

  render: function () {
    this.$el.empty();
    this.$el.append(this.twoPlayerDirectionsView.render().$el);
    this.$el.append(this.twoPlayerGameView.render().$el);

    return this;
  },

});
