MinesweeperLeague.Views.Game = Backbone.View.extend({

  initialize: function (options) {
    this.dimX = options.dimX;
    this.dimY = options.dimY;
    this.numMines = options.numMines;

    this.determineLevel();

    this.gameHeaderView = new MinesweeperLeague.Views.GameHeader();

    var cells = new MinesweeperLeague.Collections.Cells(
      MinesweeperLeague.generateCells({
        dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
      })
    );
    this.gameBoardView = new MinesweeperLeague.Views.GameBoard({
      collection: cells
    });

    this.listenTo(cells, 'gameOver', function () {
      this.gameHeaderView.timerView.timer.stop();
      this.started = false;
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

    // mousedown to prevent conflict with 'gameOver' listener, immediate reset.
    'mousedown .cell': 'startTimer'
  },

  reset: function () {
    this.gameBoardView.removeSubviews();
    this.gameBoardView.collection.reset(MinesweeperLeague.generateCells({
      dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
    }));
    this.gameBoardView.collection.gameOver = false;
    this.gameHeaderView.timerView.timer.stop();
    this.gameBoardView.collateSubviewGrid();
    this.gameBoardView.render();
  },

  startTimer: function () {
    if (!this.started) {
      this.started = true;
      this.gameHeaderView.timerView.timer.start();
    }
  },

  determineLevel: function () {
    if (this.dimX === 9 && this.dimY === 9 && this.numMines === 10) {
      this.$el.addClass('beginner');
      return;
    }

    if (this.dimX === 16 && this.dimY === 16 && this.numMines === 40) {
      this.$el.addClass('intermediate');
      return;
    }

    if (this.dimX === 30 && this.dimY === 16 && this.numMines === 99) {
      this.$el.addClass('expert');
      return;
    }

    this.$el.addClass('custom');
  }

});
