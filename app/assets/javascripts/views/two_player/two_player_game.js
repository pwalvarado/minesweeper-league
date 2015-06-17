MinesweeperLeague.Views.TwoPlayerGame = Backbone.View.extend({

  initialize: function (options) {
    this.gameId = options.gameId;
    this.pusher = new Pusher(window.pusherKey);
    this.channel = this.pusher.subscribe('presence-' + this.gameId);
    this.bindChannelEvents();

    this.myGameView = new MinesweeperLeague.Views.Game({
      dimX: 30, dimY: 16, numMines: 99
    });

    this.theirGameView = new MinesweeperLeague.Views.Game({
      dimX: 30, dimY: 16, numMines: 99
    });

  },

  className: 'two-player-game-row row',

  render: function () {
    this.$el.empty();
    this.$el.append(this.myGameView.render().$el);
    this.$el.append(this.theirGameView.render().$el);

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
