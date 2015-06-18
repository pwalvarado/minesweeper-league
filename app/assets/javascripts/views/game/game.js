MinesweeperLeague.Views.Game = Backbone.View.extend({

  initialize: function (options) {
    this.dimX = options.dimX;
    this.dimY = options.dimY;
    this.numMines = options.numMines;

    this.determineLevel();

    this.gameHeaderView = new MinesweeperLeague.Views.GameHeader({
      minesRemaining: this.numMines
    });

    this.cells = new MinesweeperLeague.Collections.Cells(
      MinesweeperLeague.generateCells({
        dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
      }), { numMines: this.numMines, numCells: this.dimX * this.dimY });
    this.gameBoardView = new MinesweeperLeague.Views.GameBoard({
      collection: this.cells
    });

    this.listenTo(this.cells, 'gameOver', function () {
      this.gameHeaderView.timerView.timer.stop();
      this.started = false;
    });

    this.listenTo(this.cells, 'change:flagged', function (model, value, options) {
      if (value) {
        this.gameHeaderView.mineCountView.minesRemaining -= 1;
        this.gameHeaderView.mineCountView.render();
      } else {
        this.gameHeaderView.mineCountView.minesRemaining += 1;
        this.gameHeaderView.mineCountView.render();
      }
    });

    this.listenTo(this.cells, 'gameWon', function () {
      this.gameHeaderView.timerView.timer.stop();
      // Single Player Main View catches this trigger
      this.trigger('bestTime', this.gameHeaderView.timerView.timer.previousRun,
        this.determineLevel());

      // Two Player Main View catches this trigger
      this.trigger('iWon');
    });
  },

  className: 'game row center-block',

  render: function () {
    this.$el.empty();
    this.$el.append(this.gameHeaderView.render().$el);
    this.$el.append(this.gameBoardView.render().$el);

    return this;
  },

  events: {
    'click .reset': 'reset',
    // mousedown prevents conflict with the 'gameOver' listener.
    'mousedown .cell': 'startTimer'
  },

  reset: function () {
    this.gameBoardView.removeSubviews();
    this.gameBoardView.collection.reset(MinesweeperLeague.generateCells({
      dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
    }));
    this.gameBoardView.collection.gameOver = false;
    this.gameBoardView.collection.allMinesRevealed = false;
    this.gameBoardView.collection.revealedCells = 0;
    this.gameBoardView.activateListeners();
    this.gameHeaderView.timerView.timer.stop();
    this.gameHeaderView.mineCountView.minesRemaining = this.numMines;
    this.gameHeaderView.mineCountView.render();
    this.gameBoardView.collateSubviewGrid();
    this.gameBoardView.render();
  },

  startTimer: function () {
    if (!this.started && !this.gameBoardView.collection.allMinesRevealed) {
      this.started = true;
      this.gameHeaderView.timerView.timer.start();
    }
  },

  determineLevel: function () {
    if (this.dimX === 9 && this.dimY === 9 && this.numMines === 10) {
      this.$el.addClass('beginner');
      return 'beginner';
    }

    if (this.dimX === 16 && this.dimY === 16 && this.numMines === 40) {
      this.$el.addClass('intermediate');
      return 'intermediate';
    }

    if (this.dimX === 30 && this.dimY === 16 && this.numMines === 99) {
      this.$el.addClass('expert');
      return 'expert';
    }

    this.$el.addClass('custom');
  }

});
