MinesweeperLeague.Views.TwoPlayerGameBoards = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;
    this.pusher = options.pusher;
    this.channel = options.channel;
    this.twoPlayerGameView = options.twoPlayerGameView;
    this.bindChannelEvents();

    this.myGameView = new MinesweeperLeague.Views.Game({
      dimX: options.dimX, dimY: options.dimY, numMines: options.numMines
    });

    this.theirGameView = new MinesweeperLeague.Views.Game({
      dimX: options.dimX, dimY: options.dimY, numMines: options.numMines
    });

    this.twoPlayerPreGameBoardsView =
      new MinesweeperLeague.Views.TwoPlayerPreGameBoards();

    this.activateListeners();
  },

  className: 'two-player-game-boards-row row',

  template: JST['two_player/two_player_game_boards'],

  render: function () {
    if (!this.playing) {
      this.$el.html(this.template());
      this.$el.find('.boards-wrapper-row').empty();
      this.$el.find('.boards-wrapper-row')
        .append(this.twoPlayerPreGameBoardsView.render().$el);
    } else {
      this.$el.html(this.template());
      this.$el.find('.my-board').append(this.myGameView.render().$el);
      this.$el.find('.opponent-board').append(this.theirGameView.render().$el);
      this.theirGameView.headerView.$el
        .find('.reset').addClass('disabled');
    }

    return this;
  },

  events: {
    'click .cell': 'cellClicked'
  },

  cellClicked: function (e) {
    this.channel.trigger('client-opponentClicked', {
      cellLikeArray: this.myGameView.collection,
    });
  },

  activateListeners: function () {
    this.listenTo(this.myGameView, 'iWon', function () {
      this.channel.trigger('client-uLost', {});

      this.winTwoPlayerGame();
    });
  },

  bindChannelEvents: function () {
    var that = this;

    this.bce1 = function (data) {
      var cells = [];

      data.cellLikeArray.forEach(function (cellLikeObj) {
        var cell = new MinesweeperLeague.Models.Cell(cellLikeObj);

        cells.push(cell);
      });

      that.theirGameView.boardView =
        new MinesweeperLeague.Views.GameBoard({
          collection:
            new MinesweeperLeague.Collections.Cells(cells, {
              numMines: 99, numCells: 480
            })
        });
      that.theirGameView.render();
      that.theirGameView.boardView.stopListening();
      that.theirGameView.headerView.$el.find('.reset').addClass('disabled');
    }
    this.channel.bind('client-opponentClicked', this.bce1);

    this.bce2 = function () { that.loseTwoPlayerGame(); }
    this.channel.bind('client-uLost', this.bce2);
  },

  unbindChannelEvents: function () {
    this.channel.unbind('client-opponentClicked', this.bce1);
    this.channel.unbind('client-uLost', this.bce2);
  },

  winTwoPlayerGame: function () {
    this.$el.find('.my-board.well').addClass('two-player-winner');
    this.$el.find('.opponent-board.well').addClass('two-player-loser');

    this.twoPlayerGameView.trigger('gameConcluded');
  },

  loseTwoPlayerGame: function() {
    this.$el.find('.my-board.well').addClass('two-player-loser');
    this.$el.find('.opponent-board.well').addClass('two-player-winner');

    this.twoPlayerGameView.trigger('gameConcluded');
  },

  forceQuit: function () {
    this.myGameView.forceQuit();
    this.theirGameView.forceQuit();
    this.unbindChannelEvents();
    this.remove();
  },

});
