MinesweeperLeague.Views.Main = Backbone.View.extend({

  className: 'main container',

  initialize: function () {
    this.gameOptionsView = new MinesweeperLeague.Views.GameOptions();

    this.gameView = new MinesweeperLeague.Views.Game();

    var leaders = new MinesweeperLeague.Collections.Leaders();
    leaders.fetch();
    this.leaderboardView = new MinesweeperLeague.Views.Leaderboard({
      collection: leaders
    });
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.gameOptionsView.render().$el);
    this.$el.append(this.gameView.render().$el);
    this.$el.append(this.leaderboardView.render().$el);

    return this;
  },

});
