MinesweeperLeague.Views.TwoPlayerDirections = Backbone.View.extend({

  className: 'two-player-directions-row row',

  template: JST['two_player/directions'],

  render: function () {
    this.$el.html(this.template());

    return this;
  }

});
