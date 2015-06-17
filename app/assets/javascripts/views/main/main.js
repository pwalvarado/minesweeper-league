MinesweeperLeague.Views.Main = Backbone.View.extend({

  className: 'main container',

  initialize: function () {
    this.gameOptionsView = new MinesweeperLeague.Views.GameOptions();

    // initializes to expert difficulty.
    this.gameView = new MinesweeperLeague.Views.Game({
      dimX: 30, dimY: 16, numMines: 99
    });

    this.leaderboardsView = new MinesweeperLeague.Views.Leaderboards();

    this.activateListener();
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.gameOptionsView.render().$el);
    this.$el.append(this.gameView.render().$el);
    this.$el.append(this.leaderboardsView.render().$el);

    return this;
  },

  activateListener: function () {
    // the 'bestTime' and 'level' function arguments are passed in on trigger()
    this.listenTo(this.gameView, 'bestTime', function (bestTime, level) {
      this.bestTimeModalForm = new MinesweeperLeague.Views.BestTimeModal({
        bestTime: bestTime,
        level: level,
        mainView: this
      });

      $('body').prepend(this.bestTimeModalForm.render().$el);
    });
  },

  events: {
    "click .btn:contains('Beginner')": 'beginner',
    "click .btn:contains('Intermediate')": 'intermediate',
    "click .btn:contains('Expert')": 'expert'
  },

  beginner: function () {
    this.gameView = new MinesweeperLeague.Views.Game({
      dimX: 9, dimY: 9, numMines: 10
    });

    $('.game').replaceWith(this.gameView.render().$el);

    this.activateListener();
  },

  intermediate: function () {
    this.gameView = new MinesweeperLeague.Views.Game({
      dimX: 16, dimY: 16, numMines: 40
    });

    $('.game').replaceWith(this.gameView.render().$el);

    this.activateListener();
  },

  expert: function () {
    this.gameView = new MinesweeperLeague.Views.Game({
      dimX: 30, dimY: 16, numMines: 99
    });

    $('.game').replaceWith(this.gameView.render().$el);

    this.activateListener();
  },

});
