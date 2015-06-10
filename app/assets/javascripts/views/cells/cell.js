MinesweeperLeague.Views.Cell = Backbone.View.extend({

  attributes: {
    "class": "cell"
  },

  render: function () {
    this.$el.html(this.template({ cell: this.model }));

    return this;
  },

  template: JST['cells/cell'],

});
