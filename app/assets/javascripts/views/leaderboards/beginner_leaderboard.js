MinesweeperLeague.Views.BeginnerLeaderboard = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  className: 'beginner-leaderboard col-md-4',

  template: JST['leaderboards/beginner_leaderboard'],

  render: function () {
    this.$el.html(this.template({ beginnerLeaders: this.collection }));

    return this;
  },

});
