MinesweeperLeague.Views.Cell = Backbone.View.extend({

  className: "cell",

  render: function () {
    this.$el
      .attr('x', this.model.get('x'))
      .attr('y', this.model.get('y'));

    if (this.model.get('flagged')) {
      this.$el.addClass('flagged');
      this.$el.text('F');
    }

    if (this.model.get('revealed')) {
      this.$el.addClass('revealed');
      this.$el.removeClass('flagged');

      if (this.model.get('mined')) {
        this.$el.addClass('mined');
        this.$el.text('M');
      } else {
        var num = this.model.getNumber();
        if (num !== 0) { this.$el.text(num); }
      }
    }

    return this;
  },

  template: JST['cell'],

  events: {
    'click': 'reveal',

    // contextmenu is right-click
    'contextmenu': 'flag'
  },

  flag: function (event) {
    event.preventDefault();
    this.model.set('flagged', true);
  },

  reveal: function () {
    if (this.model.get('mined') && !this.model.collection.ended) {
      this.model.collection.endGame();
    }

    this.model.reveal();
  },

});
