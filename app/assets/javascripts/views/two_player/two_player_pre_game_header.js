MinesweeperLeague.Views.TwoPlayerPreGameHeader = Backbone.View.extend({

  initialize: function (options) {
    this.pusher = options.pusher;
    this.channel = options.channel;

    this.channel.bind('pusher:member_added', function () {
      if (this.channel.members.count < 2) {
        this.$el.find('.start-btn').addClass('btn-warning').addClass('disable')
          .removeClass('.btn-success').html('Waiting for an opponent...');
      }
    });

    this.channel.bind('pusher:subscription_successful', function () {
      if (this.channel.members.count < 2) {
        this.$el.find('.start-btn').addClass('btn-warning').addClass('disable')
          .removeClass('.btn-success').html('Waiting for an opponent...');
      }
    });
  },

  className: 'two-player-pre-game-header-row row',

  template: JST['two_player/pre_game_header'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },
});
