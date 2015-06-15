MinesweeperLeague.Collections.BeginnerLeaders = Backbone.Collection.extend({

  url: '/api/leaders/beginner_leaders',

  model: MinesweeperLeague.Models.BeginnerLeader,

  comparator: 'time',

});
