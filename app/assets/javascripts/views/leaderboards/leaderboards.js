MinesweeperLeague.Views.Leaderboards = Backbone.View.extend({

  className: 'leaderboards row col-md-6 col-md-offset-3',

  initialize: function () {
    var beginnerLeaders = new MinesweeperLeague.Collections.BeginnerLeaders();
    beginnerLeaders.fetch();
    this.beginnerLeaderboardView =
      new MinesweeperLeague.Views.BeginnerLeaderboard({
        collection: beginnerLeaders
      });

    var intermediateLeaders =
      new MinesweeperLeague.Collections.IntermediateLeaders();
    intermediateLeaders.fetch();
    this.intermediateLeaderboardView =
      new MinesweeperLeague.Views.IntermediateLeaderboard({
        collection: intermediateLeaders
      });

    var expertLeaders = new MinesweeperLeague.Collections.ExpertLeaders();
    expertLeaders.fetch();
    this.expertLeaderboardView = new MinesweeperLeague.Views.ExpertLeaderboard({
      collection: expertLeaders
    });
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.beginnerLeaderboardView.render().$el);
    this.$el.append(this.intermediateLeaderboardView.render().$el);
    this.$el.append(this.expertLeaderboardView.render().$el);

    return this;
  },

});
