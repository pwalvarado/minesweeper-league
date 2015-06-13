MinesweeperLeague.Views.Main = Backbone.View.extend({

  className: 'main container',

  initialize: function () {
    this.gameOptionsView = new MinesweeperLeague.Views.GameOptions();

    // initializes to expert difficulty.
    this.gameView = new MinesweeperLeague.Views.Game({
      dimX: 30, dimY: 16, numMines: 99
    });

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

  events: {
    "click .game-options-btn:contains('Beginner')": 'beginner',
    "click .game-options-btn:contains('Intermediate')": 'intermediate',
    "click .game-options-btn:contains('Expert')": 'expert'
  },

  beginner: function () {
    this.gameView = new MinesweeperLeague.Views.Game({
      dimX: 9, dimY: 9, numMines: 10
    });

    $('.game').replaceWith(this.gameView.render().$el);
  },

  intermediate: function () {
    this.gameView = new MinesweeperLeague.Views.Game({
      dimX: 16, dimY: 16, numMines: 40
    });

    $('.game').replaceWith(this.gameView.render().$el);
  },

  expert: function () {
    this.gameView = new MinesweeperLeague.Views.Game({
      dimX: 16, dimY: 30, numMines: 99
    });

    $('.game').replaceWith(this.gameView.render().$el);
  },

});
