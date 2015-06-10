MinesweeperLeague.Views.Cell = Backbone.View.extend({

  attributes: {
    "class": "cell",
  },

  render: function () {
    this.$el
      .html(this.template({ cell: this.model }))
      .attr('pos', this.model.get('pos'));

    return this;
  },

  template: JST['cells/cell'],

});
