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
      this.theirGameView.gameHeaderView.$el
        .find('.reset').addClass('disabled');
    }

    return this;
  },

  events: {
    'click .cell': 'cellClicked'
  },

  cellClicked: function (e) {
    this.channel.trigger('client-opponentClicked', {
      cellLikeArray: this.myGameView.cells,
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

    this.channel.bind('client-opponentClicked', function (data) {
      var cells = [];

      data.cellLikeArray.forEach(function (cellLikeObj) {
        var cell = new MinesweeperLeague.Models.Cell(cellLikeObj);

        cells.push(cell);
      });

      that.theirGameView.gameBoardView =
        new MinesweeperLeague.Views.GameBoard({
          collection:
            new MinesweeperLeague.Collections.Cells(cells, {
              numMines: 99, numCells: 480
            })
        });
      that.theirGameView.render();
      that.theirGameView.gameBoardView.stopListening();
      that.theirGameView.gameHeaderView.$el.find('.reset').addClass('disabled');
    });

    this.channel.bind('client-oneReady', function () {
      this.twoPlayerGameView.opponentReady = true;
    }.bind(this));

    this.channel.bind('client-bothReady', function () {
      this.twoPlayerGameView.opponentReady = true;
      this.twoPlayerGameView.waitOrStart();
    }.bind(this));

    this.channel.bind('client-uLost', function () {
      this.loseTwoPlayerGame();
    }.bind(this));
  },

  winTwoPlayerGame: function () {
    this.$el.find('.my-board.well').addClass('two-player-winner');
    this.$el.find('.opponent-board.well').addClass('two-player-loser');
  },

  loseTwoPlayerGame: function() {
    this.$el.find('.my-board.well').addClass('two-player-loser');
    this.$el.find('.opponent-board.well').addClass('two-player-winner');
  },

});
