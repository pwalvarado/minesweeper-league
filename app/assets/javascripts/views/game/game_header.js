MinesweeperLeague.Views.GameHeader = Backbone.View.extend({

  initialize: function (options) {
    this.numMines = options.numMines;
    this.mineCountView = new MinesweeperLeague.Views.GameMineCount({
      minesRemaining: this.numMines
    });
    this.timerView = new MinesweeperLeague.Views.GameTimer();
  },

  className: 'game-header row',

  template: JST['game/game_header'],

  render: function () {
    this.$el.html(this.template());
    this.$el.prepend(this.mineCountView.render().$el);
    this.$el.append(this.timerView.render().$el);

    return this;
  },

  reset: function () {
    this.timerView.timer.stop();
    this.mineCountView.minesRemaining = this.numMines;
    this.mineCountView.render();
  },

});
