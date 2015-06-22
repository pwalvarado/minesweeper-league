MinesweeperLeague.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'main',
    'two_player_games/new': 'twoPlayerNew',
    'two_player_game/:gameId': 'twoPlayerGame'
  },

  main: function () {
    var mainView = new MinesweeperLeague.Views.Main();

    if ($(".main div:contains('Log In')").length) {
      $('.navbar-nav').children().removeClass('active');
      $(".nav > li").has(":contains('Log In')").addClass('active');
    } else if ($(".main div:contains('Sign Up')")) {
      $('.navbar-nav').children().removeClass('active');
      $(".nav > li").has(":contains('Sign Up')").addClass('active');
    } else {
      $('.navbar-nav').children().removeClass('active');
      $(".nav > li").has("a[href='#']").addClass('active');
    }

    this._swapView(mainView);
  },

  twoPlayerNew: function () {
    var that = this;

    $.ajax('/api/two_player_games/new', {
      success: function (responseObject) {
        that.navigate('/two_player_game/' + responseObject.game_id,
        { trigger: true });
      }
    });
  },

  twoPlayerGame: function (gameId) {
    var twoPlayerView = new MinesweeperLeague.Views.TwoPlayerMain({
      gameId: gameId
    });

    $('.navbar-nav').children().removeClass('active');
    $(".nav > li").has("a[href='#two_player_games/new']").addClass('active');
    this._swapView(twoPlayerView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

});
