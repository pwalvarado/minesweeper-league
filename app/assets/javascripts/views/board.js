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

    this.listenTo(this.collection, 'change:revealed', this.test);
  },

  test: function () {
    console.log('hi mom');
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  template: JST['board'],

});
