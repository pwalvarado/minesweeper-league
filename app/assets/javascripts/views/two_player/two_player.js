MinesweeperLeague.Views.TwoPlayer = Backbone.View.extend({

  className: 'two-player-main container',

  template: JST['two_player/two_player_main'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

});
