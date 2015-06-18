MinesweeperLeague.Views.TwoPlayerPreGame = Backbone.View.extend({

  className: 'two-player-pre-game-row row',

  template: JST['two_player/pre_game'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

});
