MinesweeperLeague.Views.Cell = Backbone.View.extend({

  initialize: function () {
    this.mined = this._seedMine(0.2);
  },

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

  events: {
    'click': 'reveal'
  },

  reveal: function (event) {
    this.revealed = true;
    this.$el.addClass('revealed');
    if (this.mined) {
      this.$el.addClass('mined');
    }
  },

  _seedMine: function (fraction) {
    return Math.random() <= fraction ? true : false;
  },

});
