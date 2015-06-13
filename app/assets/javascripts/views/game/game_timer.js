MinesweeperLeague.Views.GameTimer = Backbone.View.extend({

  initialize: function () {
    this.timer = new MinesweeperLeague.Timer();

    setInterval(function () { this.render(); }.bind(this), 500);
  },

  className: 'timer col-md-4',

  render: function () {
    this.$el.html(this.timer.currentTimeInSeconds());

    return this;
  },

});
