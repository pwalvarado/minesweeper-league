MinesweeperLeague.Views.GameHeader = Backbone.View.extend({

  initialize: function () {
    this.mineCountView = new MinesweeperLeague.Views.GameMineCount();
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

});
