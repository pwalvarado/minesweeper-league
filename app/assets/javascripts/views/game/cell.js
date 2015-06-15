MinesweeperLeague.Views.Cell = Backbone.View.extend({

  className: "cell",

  template: JST['game/cell'],

  render: function () {
    this.$el.attr('x', this.model.get('x')).attr('y', this.model.get('y'));

    if (this.model.get('flagged')) {
      this.$el.addClass('flagged').html('&#x2691');
    } else {
      this.$el.empty().removeClass('flagged');
    }

    if (this.model.get('revealed')) {
      this.$el.addClass('revealed');

      if (this.model.get('mined')) {
        this.$el.addClass('mined').html('&#x1f4a3');
      } else {
        var num = this.model.getNumber();
        this.$el.empty();
        if (num !== 0) { this.$el.html(num); }
      }
    }

    return this;
  },


  events: {
    'click': 'clickReveal',
    'contextmenu': 'flag',
  },

  flag: function (e) {
    e.preventDefault();

    this.model.flag();
  },

  clickReveal: function (e) {
    this.model.reveal();
  },

});
