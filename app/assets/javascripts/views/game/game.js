MinesweeperLeague.Views.Game = Backbone.View.extend({

  initialize: function () {
    this.gameHeaderView = new MinesweeperLeague.Views.GameHeader();

    var cells = new MinesweeperLeague.Collections.Cells(
      MinesweeperLeague.generateCells()
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
    this.gameBoardView.collection.reset(MinesweeperLeague.generateCells());
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

});
