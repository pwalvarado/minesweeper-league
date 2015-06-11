MinesweeperLeague.Views.Leaderboard = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST['leaderboard'],

  render: function () {
    this.$el.html(this.template({ leaders: this.collection }));

    return this;
  },

});
