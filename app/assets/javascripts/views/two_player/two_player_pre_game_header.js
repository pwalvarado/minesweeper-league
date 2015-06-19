MinesweeperLeague.Views.TwoPlayerPreGameHeader = Backbone.View.extend({

  className: 'two-player-pre-game-header-row row',

  template: JST['two_player/pre_game_header'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },
});
