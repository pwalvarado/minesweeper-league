MinesweeperLeague.Views.Leaderboard = Backbone.View.extend({

  template: JST['leaderboard'],

  render: function () {
    this.$el.html(this.template({ leaders: this.collection }));

    return this;
  },

});
