MinesweeperLeague.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'main'
  },

  main: function () {
    var mainView = new MinesweeperLeague.Views.Main();

    this._swapView(mainView);

    // var cells = new MinesweeperLeague.Collections.Cells(
    //   MinesweeperLeague.generateCells()
    // );
    // var boardView = new MinesweeperLeague.Views.Board({
    //   collection: cells
    // });
    //
    // this._swapBoardView(boardView);
    //
    // var leaders = new MinesweeperLeague.Collections.Leaders();
    // leaders.fetch();
    // var leaderboardView = new MinesweeperLeague.Views.Leaderboard({
    //   collection: leaders
    // });
    //
    // this._swapLeaderboardView(leaderboardView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  // _swapLeaderboardView: function (view) {
  //   this._currentLeaderboardView && this._currentLeaderboardView.remove();
  //   this._currentLeaderboardView = view;
  //   $('.leaderboard').html(view.render().$el);
  // },
  //
  // _swapBoardView: function (view) {
  //   this._currentBoardView && this._currentBoardView.remove();
  //   this._currentBoardView = view;
  //   $('.board').html(view.render().$el);
  // },

});
