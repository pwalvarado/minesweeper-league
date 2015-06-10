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
    this.model.revealed = true;
    this.$el.addClass('revealed');

    if (this.model.mined) {
      this.$el.addClass('mined');
    } else {
      var num = this.model.getNumber();
      // if (num === 0) { this.model.revealSurroundings(); }
      this.$el.text(num);
    }
  },

});
