window.MinesweeperLeague = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new MinesweeperLeague.Routers.Router({
      $rootEl: $('#root')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  MinesweeperLeague.initialize();
});
