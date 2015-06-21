MinesweeperLeague.Views.GameHeader = Backbone.View.extend({

  initialize: function (options) {
    this.gameView = options.gameView;
    this.numMines = options.numMines;
    this.timer = new MinesweeperLeague.Timer();

    setInterval(function () {
      this.$el.find('.timer-wrapper').html(this.timer.currentTime());
    }.bind(this), 1000);

    this.activateListeners();
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

  startTimer: function () {
    if (!this.gameView.playing && !this.collection.allMinesRevealed) {
      this.gameView.playing = true;
      this.timer.start();
    }
  },

  activateListeners: function () {
    this.listenTo(this.collection, 'change:flagged', function (model, value) {
      if (value) { this.minesRemaining -= 1; }
      else { this.minesRemaining += 1; }

      this.$el.find('.mines-remaining-wrapper').html(this.minesRemaining);
    });
  },

});
