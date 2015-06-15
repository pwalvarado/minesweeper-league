MinesweeperLeague.Views.BestTimeModal = Backbone.View.extend({

  initialize: function (options) {
    this.bestTime = options.bestTime;
    this.level = options.level;
    this.mainView = options.mainView;
  },

  template: JST['best_time_modal'],

  render: function () {
    this.$el.html(this.template({ bestTime: this.bestTime }));

    return this;
  },

  events: {
    'click .close': 'remove',
    'submit form': 'submitBestTime'
  },

  submitBestTime: function (e) {
    e.preventDefault();
    var serializedData = $(e.currentTarget).serializeJSON();
    switch (this.level) {
      case 'beginner':
        this.mainView.leaderboardsView.beginnerLeaders.create(
          serializedData, { wait: true });
        break;
      case 'intermediate':
        this.mainView.leaderboardsView.intermediateLeaders.create(
          serializedData, { wait: true });
        break;
      case 'expert':
        this.mainView.leaderboardsView.expertLeaders.create(
          serializedData, { wait: true });
        break;
    }

    this.$el.remove();
  },

  remove: function () { this.$el.remove(); }

});
