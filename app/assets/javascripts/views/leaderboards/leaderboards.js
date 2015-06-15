MinesweeperLeague.Views.Leaderboards = Backbone.View.extend({

  className: 'leaderboards row col-md-8 col-md-offset-2',

  initialize: function () {
    this.beginnerLeaders = new MinesweeperLeague.Collections.BeginnerLeaders();
    this.beginnerLeaders.fetch();
    this.beginnerLeaderboardView =
      new MinesweeperLeague.Views.BeginnerLeaderboard({
        collection: this.beginnerLeaders
      });

    this.intermediateLeaders =
      new MinesweeperLeague.Collections.IntermediateLeaders();
    this.intermediateLeaders.fetch();
    this.intermediateLeaderboardView =
      new MinesweeperLeague.Views.IntermediateLeaderboard({
        collection: this.intermediateLeaders
      });

    this.expertLeaders = new MinesweeperLeague.Collections.ExpertLeaders();
    this.expertLeaders.fetch();
    this.expertLeaderboardView = new MinesweeperLeague.Views.ExpertLeaderboard({
      collection: this.expertLeaders
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
