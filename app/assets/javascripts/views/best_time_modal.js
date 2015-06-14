MinesweeperLeague.Views.BestTimeModal = Backbone.View.extend({

  initialize: function (options) {
    this.bestTime = options.bestTime;
  },

  template: JST['best_time_modal'],

  render: function () {
    this.$el.html(this.template({ bestTime: this.bestTime }));

    return this;
  },

  events: {
    'click .m-backdrop': 'remove',
    'click .close': 'remove',
    'submit form': 'submitBestTime'
  },

  submitBestTime: function (e) {
    e.preventDefault();
    console.log(e);
  },

});
