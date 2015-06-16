MinesweeperLeague.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'main',
    'two_player_games/new': 'twoPlayerNew',
    // 'two_player_game/:gameId': 'twoPlayerGame'
  },

  main: function () {
    var mainView = new MinesweeperLeague.Views.Main();

    $('.navbar-nav').not('.navbar-right').children().removeClass('active');
    $(".nav > li").has("a[href='#']").addClass('active');
    this._swapView(mainView);
  },

  twoPlayerNew: function () {
    console.log('hi mom');
    $.ajax('/api/two_player_games/new', {
      success: function (responseObject) {
        
      }
    });
  },

  twoPlayerGame: function (gameId) {
    var twoPlayerView = new MinesweeperLeague.Views.TwoPlayer();

    $('.navbar-nav').not('.navbar-right').children().removeClass('active');
    $(".nav > li").has("a[href='#two-player']").addClass('active');
    this._swapView(twoPlayerView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

});
