MinesweeperLeague.Views.Cell = Backbone.View.extend({

  className: "cell",

  render: function () {
    this.$el
      .attr('x', this.model.get('x'))
      .attr('y', this.model.get('y'));

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

  template: JST['cell'],

  events: {
    'click': 'reveal',
    // contextmenu is right-click
    'contextmenu': 'flag',
    'mousedown': 'bothClickSetUp',
    'mouseup': 'bothClickTearDown'
  },

  bothClickSetUp: function (e) {
    e.preventDefault();

    if (e.which === 3) {
      this.model.set('rightClickDepressed', true);
    }

    if (e.which === 1) {
      this.model.set('leftClickDepressed', true);
    }


    if (this.model.get('rightClickDepressed') &&
        this.model.get('leftClickDepressed')) {
      this.model.sweep();
    }
  },

  bothClickTearDown: function (e) {
    e.preventDefault();

    if (e.which === 3) { this.model.set('rightClickDepressed', false); }
    if (e.which === 1) { this.model.set('leftClickDepressed', false); }
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
      if (this.model.collection.firstClick) {
        this.model.set('mined', false);
        this.model.collection.firstClickReseed(this.model);
      } else {
        this.model.collection.endGame();
      }
    }

    this.model.reveal();
  },

});
