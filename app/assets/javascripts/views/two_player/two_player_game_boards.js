MinesweeperLeague.Views.TwoPlayerGameBoards = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;
    this.pusher = new Pusher(window.pusherKey);
    this.channel = this.pusher.subscribe('presence-' + this.gameId);
    this.bindChannelEvents();

    this.myGameView = new MinesweeperLeague.Views.Game({
      dimX: options.dimX, dimY: options.dimY, numMines: options.numMines
    });

    this.theirGameView = new MinesweeperLeague.Views.Game({
      dimX: options.dimX, dimY: options.dimY, numMines: options.numMines
    });

  },

  className: 'two-player-game-boards-row row',

  template: JST['two_player/two_player_game_boards'],

  render: function () {
    this.$el.html(this.template());
    this.$el.find('.my-board').append(this.myGameView.render().$el);
    this.$el.find('.their-board').append(this.theirGameView.render().$el);

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
    });
  },

});
