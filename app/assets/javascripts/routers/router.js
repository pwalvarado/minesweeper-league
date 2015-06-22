MinesweeperLeague.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'main',
    'two_player/:difficulty/new': 'twoPlayerNew',
    'two_player/:difficulty/:gameId': 'twoPlayerGame'
  },

  main: function () {
    var mainView = new MinesweeperLeague.Views.Main();

    if ($(".main div:contains('Log In')").length) {
      $('.navbar-nav').children().removeClass('active');
      $(".nav > li").has(":contains('Log In')").addClass('active');
    } else if ($(".main div:contains('Sign Up')").length) {
      $('.navbar-nav').children().removeClass('active');
      $(".nav > li").has(":contains('Sign Up')").addClass('active');
    } else {
      $('.navbar-nav').children().removeClass('active');
      $(".nav > li").has("a[href='/#']").addClass('active');
    }

    this._swapView(mainView);
  },

  twoPlayerNew: function (difficulty) {
    var that = this;

    $.ajax('/api/two_player_games/new', {
      success: function (responseObject) {
        that.navigate('/two_player/' + difficulty + '/'+ responseObject.game_id,
        { trigger: true });
      }
    });
  },

  twoPlayerGame: function (difficulty, gameId) {
    var twoPlayerView = new MinesweeperLeague.Views.TwoPlayerMain({
      gameId: gameId, difficulty: difficulty
    });

    $('.navbar-nav').children().removeClass('active');
    $(".nav > li.dropdown").addClass('active');
    this._swapView(twoPlayerView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

});
