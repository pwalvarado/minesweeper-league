MinesweeperLeague.Views.TwoPlayerPreGameHeader = Backbone.View.extend({

  initialize: function (options) {
    this.pusher = options.pusher;
    this.channel = options.channel;

    this.channel.bind('pusher:member_added', this.render, this);
    this.channel.bind('pusher:subscription_succeeded', this.render, this);
  },

  className: 'two-player-pre-game-header-row row',

  template: JST['two_player/pre_game_header'],

  render: function () {
    this.$el.html(this.template());
    this.channel.members.count > 1 ? this.enableButton() : this.disableButton();

    return this;
  },

  disableButton: function () {
    this.$el.find('.start-btn').removeClass('.btn-success')
      .addClass('btn-warning').addClass('disabled')
      .html('Waiting for an opponent...');
  },

  enableButton: function () {
    this.$el.find('.start-btn').removeClass('btn-warning')
      .removeClass('disabled').addClass('btn-success')
      .html('Start');
  },
});
