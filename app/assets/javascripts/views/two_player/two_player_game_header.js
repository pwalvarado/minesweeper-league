MinesweeperLeague.Views.TwoPlayerGameHeader = Backbone.View.extend({

  className: 'two-player-game-header-row row',

  template: JST['two_player/two_player_game_header'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

});
