MinesweeperLeague.Views.Cell = Backbone.View.extend({

  attributes: {
    "class": "cell",
  },

  render: function () {
    this.$el
      .html(this.template({ cell: this.model }))
      .attr('x', this.model.get('x'))
      .attr('y', this.model.get('y'));

    return this;
  },

  template: JST['cell'],

  events: {
    'click': 'reveal'
  },

  reveal: function () {
    this.model.set({ revealed: true });
    this.$el.addClass('revealed');

    if (this.model.get('mined')) {
      this.$el.addClass('mined');
    } else {
      var num = this.model.getNumber();
      this.$el.text(num);
    }
  },

});
