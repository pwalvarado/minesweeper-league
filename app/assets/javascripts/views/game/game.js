MinesweeperLeague.Views.Game = Backbone.View.extend({

  initialize: function (options) {
    this.dimX = options.dimX;
    this.dimY = options.dimY;
    this.numMines = options.numMines;

    this.determineLevel();

    this.cellModels = MinesweeperLeague.generateCells({
      dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
    });
    this.cellsCollection = new MinesweeperLeague.Collections.Cells(
      this.cellModels, { numMines: this.numMines }
    );

    this.gameHeaderView = new MinesweeperLeague.Views.GameHeader({
      collection: this.cellsCollection,
      numMines: this.numMines
    });
    this.gameBoardView = new MinesweeperLeague.Views.GameBoard({
      collection: this.cellsCollection,
      dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
    });

    this.listenTo(this.cellsCollection, 'gameOver', function () {
      this.gameHeaderView.timer.stop();
      this.started = false;
    });

    this.listenTo(this.cellsCollection, 'change:flagged', function (model, value) {
      if (value) {
        this.gameHeaderView.minesRemaining -= 1;
      } else {
        this.gameHeaderView.minesRemaining += 1;
      }


    });

    this.listenTo(this.cellsCollection, 'gameWon', function () {
      this.gameHeaderView.timer.stop();
      // Single Player Main View catches this trigger
      this.trigger('bestTime', this.gameHeaderView.timer.previousRun,
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
    this.cellModels = MinesweeperLeague.generateCells({
      dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
    });

    this.gameBoardView.reset(this.cellsCollection);
    this.gameHeaderView.reset(this.cellsCollection);
  },

  startTimer: function () {
    if (!this.started && !this.gameBoardView.collection.allMinesRevealed) {
      this.started = true;
      this.gameHeaderView.timer.start();
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
