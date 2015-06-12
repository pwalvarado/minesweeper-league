MinesweeperLeague.Views.Game = Backbone.View.extend({

  template: JST['game/game'],

  className: 'game row',

  render: function () {
    this.$el.html(this.template());

    return this;
  },

});
