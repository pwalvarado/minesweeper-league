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

  template: JST['cell'],

  events: {
    'click': 'reveal'
  },

  reveal: function (event) {
    this.model.revealed = true;
    this.$el.addClass('revealed');
    if (this.model.mined) {
      this.$el.addClass('mined');
    }
    console.log(this.model.collection);
  },

});
