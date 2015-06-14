MinesweeperLeague.Views.ExpertLeaderboard = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  className: 'expert-leaderboard col-md-4',

  template: JST['leaderboards/expert_leaderboard'],

  render: function () {
    this.$el.html(this.template({ expertLeaders: this.collection }));

    return this;
  },

});
