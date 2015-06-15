MinesweeperLeague.Collections.ExpertLeaders = Backbone.Collection.extend({

  url: '/api/leaders/expert_leaders',

  model: MinesweeperLeague.Models.ExpertLeader,

  comparator: 'time',

});
