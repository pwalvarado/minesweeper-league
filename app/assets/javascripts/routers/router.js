MinesweeperLeague.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home'
  },

  home: function () {
    var cells = new MinesweeperLeague.Collections.Cells(
      MinesweeperLeague.generateCells()
    );
    var boardView = new MinesweeperLeague.Views.Board({
      collection: cells
    });

    this._swapBoardView(boardView);

    var leaders = new MinesweeperLeague.Collections.Leaders();
    var leaderboardView = new MinesweeperLeague.Views.Leaderboard({
      collection: leaders
    });

    this._swapLeaderboardView(leaderboardView);

    this._swapMainView();
  },

  _swapLeaderboardView: function (view) {
    this._currentLeaderboardView && this._currentLeaderboardView.remove();
    this._currentLeaderboardView = view;
    $('.leaderboard').html(view.render().$el);
  },

  _swapBoardView: function (view) {
    this._currentBoardView && this._currentBoardView.remove();
    this._currentBoardView = view;
    $('.board').html(view.render().$el);
  },

});
