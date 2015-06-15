MinesweeperLeague.Views.Leaderboards = Backbone.View.extend({

  className: 'leaderboards-row row',

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

  template: JST['leaderboards/leaderboards'],

  render: function () {
    this.$el.html(this.template());
    var $leaderboards = this.$el.find('.leaderboards');
    $leaderboards.append(this.beginnerLeaderboardView.render().$el);
    $leaderboards.append(this.intermediateLeaderboardView.render().$el);
    $leaderboards.append(this.expertLeaderboardView.render().$el);

    return this;
  },

});
