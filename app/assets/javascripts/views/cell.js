MinesweeperLeague.Views.Cell = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, 'change:revealed', this.render);
  },

  className: "cell",

  render: function () {
    this.$el
      .attr('x', this.model.get('x'))
      .attr('y', this.model.get('y'));

    if (this.model.get('revealed')) {
      this.$el.addClass('revealed');

      if (this.model.get('mined')) {
        this.$el.addClass('mined');
        this.$el.text('M');
      } else {
        this.$el.text(this.model.getNumber());
      }
    }

    return this;
  },

  template: JST['cell'],

  events: {
    'click': 'reveal'
  },

  reveal: function () {
    this.model.reveal();
  },

});
