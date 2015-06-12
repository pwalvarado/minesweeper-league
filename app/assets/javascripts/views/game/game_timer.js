MinesweeperLeague.Views.GameTimer = Backbone.View.extend({

  initialize: function () {
    this.timer = new MinesweeperLeague.Timer();
  },

  className: 'timer col-md-4',

  render: function () {
    this.$el.html(this.timer.currentTimeInSeconds());

    return this;
  },

});
