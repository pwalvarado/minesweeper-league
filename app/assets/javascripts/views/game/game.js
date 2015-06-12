MinesweeperLeague.Views.Game = Backbone.View.extend({

  initialize: function () {
    this.gameHeaderView = new MinesweeperLeague.Views.GameHeader();

    // var cells = new MinesweeperLeague.Collections.Cells();
    // cells.fetch();
    this.gameBoardView = new MinesweeperLeague.Views.GameBoard({
      // collection: cells
    });
  },

  className: 'game row',

  render: function () {
    this.$el.empty();
    this.$el.append(this.gameHeaderView.render().$el);
    this.$el.append(this.gameBoardView.render().$el);

    return this;
  },

});
