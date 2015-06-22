MinesweeperLeague.Views.Game = Backbone.View.extend({

  initialize: function (options) {
    this.dimX = options.dimX;
    this.dimY = options.dimY;
    this.numMines = options.numMines;

    this.determineLevel();

    this.cellModels = MinesweeperLeague.generateCells({
      dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
    });
    this.collection = new MinesweeperLeague.Collections.Cells(
      this.cellModels, { numMines: this.numMines }
    );

    this.headerView = new MinesweeperLeague.Views.GameHeader({
      collection: this.collection,
      gameView: this,
      numMines: this.numMines
    });
    this.boardView = new MinesweeperLeague.Views.GameBoard({
      collection: this.collection,
      dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
    });

    this.activateListeners();
  },

  className: 'game row center-block',

  render: function () {
    this.$el.empty();
    this.$el.append(this.headerView.render().$el);
    this.$el.append(this.boardView.render().$el);

    return this;
  },

  events: {
    'click .reset-btn': 'reset',
    // mousedown prevents conflicts with the 'gameOver' listener.
    'mousedown .cell': 'startTimer'
  },

  reset: function () {
    this.cellModels = MinesweeperLeague.generateCells({
      dimX: this.dimX, dimY: this.dimY, numMines: this.numMines
    });
    this.collection.reset(this.cellModels);
    this.collection.constantsReset();
    this.constantsReset();

    // Since I'm not changing the collection, I do not need to pass in
    // this.collection. They will be pointing to the new one already
    // since they were initialized pointing at it.
    this.boardView.reset();
    this.headerView.reset();
  },

  startTimer: function () {
    // Don't start timer if game ended or is currently in play.
    if (this.playing || this.collection.gameOver) { return; }

    this.playing = true;
    this.headerView.startTimer();
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
  },

  activateListeners: function () {
    this.listenTo(this.collection, 'gameOver', function () {
      this.headerView.timer.stop();
      this.playing = false;
    });

    this.listenTo(this.collection, 'gameWon', function () {
      this.headerView.timer.stop();
      // Single Player Main View catches this trigger
      this.trigger('bestTime', this.headerView.timer.currentTime(),
        this.determineLevel());

      // Two Player Main View catches this trigger
      this.trigger('iWon');
    });
  },

  constantsReset: function () {
    this.playing = false;
  },

  forceQuit: function () {
    this.headerView.forceQuit();
    this.boardView.forceQuit();
    this.remove();
  },

  disable: function () {
    this.headerView.timer.stop();
    this.playing = false;
    this.collection.gameOver = true;
    this.$el.find('.reset-btn').addClass('disabled');
  },

});
