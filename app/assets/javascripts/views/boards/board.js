MinesweeperLeague.Views.Board = Backbone.CompositeView.extend({

  attributes: {
    "class": "board"
  },

  initialize: function () {
    var that = this;

    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        var cell = new MinesweeperLeague.Models.Cell({ pos: [i, j] });
        var cellView = new MinesweeperLeague.Views.Cell({ model: cell });
        that.addSubview('.cells', cellView);
      }
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  template: JST['boards/board'],

});
