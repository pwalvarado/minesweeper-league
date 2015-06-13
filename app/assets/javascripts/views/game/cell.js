MinesweeperLeague.Views.Cell = Backbone.View.extend({

  className: "cell",

  template: JST['game/cell'],

  render: function () {
    this.$el.attr('x', this.model.get('x')).attr('y', this.model.get('y'));

    if (this.model.get('flagged')) {
      this.$el.addClass('flagged');
      this.$el.html('F');
    } else {
      this.$el.empty();
    }

    if (this.model.get('revealed')) {
      this.$el.addClass('revealed');
      this.$el.removeClass('flagged');

      if (this.model.get('mined')) {
        this.$el.addClass('mined');
        this.$el.html('M');
      } else {
        var num = this.model.getNumber();
        this.$el.empty();
        if (num !== 0) { this.$el.html(num); }
      }
    }

    return this;
  },


  events: {
    'click': 'reveal',
    'contextmenu': 'flag',
  },

  flag: function (e) {
    e.preventDefault();
    if (this.model.get('flagged')) {
      this.model.set('flagged', false);
    } else {
      this.model.set('flagged', true);
    }
  },

  reveal: function () {
    if (this.model.get('flagged')) { return; }

    if (this.model.get('mined') && !this.model.collection.ended) {
      this.model.collection.endGame();
    }

    this.model.reveal();
  },

});
