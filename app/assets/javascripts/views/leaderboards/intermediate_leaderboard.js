MinesweeperLeague.Views.IntermediateLeaderboard = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, 'add', this.render);
  },

  className: 'intermediate-leaderboard col-md-4',

  template: JST['leaderboards/intermediate_leaderboard'],

  render: function () {
    this.$el.html(this.template({ intermediateLeaders: this.collection }));

    return this;
  },

});
