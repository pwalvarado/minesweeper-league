MinesweeperLeague.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home'
  },

  home: function () {
    var cells = new MinesweeperLeague.Collections.Cells();
    var boardView = new MinesweeperLeague.Views.Board({
      collection: cells
    });

    this._swapView(boardView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

});
