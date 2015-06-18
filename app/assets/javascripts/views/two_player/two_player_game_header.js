MinesweeperLeague.Views.TwoPlayerGameHeader = Backbone.View.extend({

  initialize: function () {
    this.timer = new MinesweeperLeague.Timer();
    setInterval(this.render.bind(this), 500);
  },

  className: 'two-player-game-header-row row',

  template: JST['two_player/two_player_game_header'],

  render: function () {
    this.$el.html(this.template({ timer: this.timer }));

    return this;
  },

});
