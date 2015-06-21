MinesweeperLeague.Views.GameHeader = Backbone.View.extend({

  initialize: function (options) {
    this.cells = options.cells;
    this.numMines = options.numMines;
    this.timer = new MinesweeperLeague.Timer();
    setInterval(function () {
      this.$el.find('.timer-wrapper').html(this.timer.currentTime());
    }.bind(this), 1000);
  },

  className: 'game-header row',

  template: JST['game/game_header'],

  render: function () {
    this.$el.html(this.template());
    this.$el.find('.mines-remaining-wrapper').html(this.numMines);
    this.$el.find('.timer-wrapper').html(this.timer.currentTime());

    return this;
  },

  reset: function (newCellCollection) {
    this.cells = newCellCollection;
    this.timer.stop();
    this.minesRemaining = this.numMines;
    this.render();
  },

});
