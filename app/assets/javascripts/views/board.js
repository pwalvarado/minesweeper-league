MinesweeperLeague.Views.Board = Backbone.CompositeView.extend({

  attributes: {
    "class": "board"
  },

  initialize: function () {
    var that = this;

    this.collection.each(function (cell) {
      var cellView = new MinesweeperLeague.Views.Cell({ model: cell });
      that.addSubview('.cells', cellView);
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  template: JST['board'],

});
