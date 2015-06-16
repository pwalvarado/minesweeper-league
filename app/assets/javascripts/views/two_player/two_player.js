MinesweeperLeague.Views.TwoPlayer = Backbone.View.extend({

  initialize: function () {
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
