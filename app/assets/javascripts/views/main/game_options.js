MinesweeperLeague.Views.GameOptions = Backbone.View.extend({

  className: 'game-options row',

  template: JST['game_options'],

  render: function () {
    this.$el.html(this.template());

    return this;
  }

});
