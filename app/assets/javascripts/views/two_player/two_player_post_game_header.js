MinesweeperLeague.Views.TwoPlayerPostGameHeader = Backbone.View.extend({

  className: 'two-player-post-game-header-row row',

  template: JST['two_player/two_player_post_game_header'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

});
