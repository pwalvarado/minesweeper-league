MinesweeperLeague.Views.GameBoard = Backbone.View.extend({

  initialize: function () {
    this.collateSubviewGrid();

    this.listenTo( this.collection, 'change:revealed change:flagged',
      function (model) {
        if (this.collection.allMinesRevealed) { this.stopListening(); return; }

        this.subviewGrid[model.get('x')][model.get('y')].render();
    });
  },

  className: "game-board row",

  render: function () {
    this.$el.empty();

    this.eachSubview(function (subview) {
      this.$el.append(subview.render().$el);
    }.bind(this));

    return this;
  },

  addSubview: function (x, y, subView) {
    if (!this.subviewGrid[y]) {
      this.subviewGrid[y] = [];
    }

    this.subviewGrid[y][x] = subView;
  },

  eachSubview: function (callback) {
    for (var row in this.subviewGrid) {
      for (var cell in this.subviewGrid[row]) {
        callback(this.subviewGrid[row][cell]);
      }
    }
  },

  removeSubviews: function () {
    this.eachSubview(function (subview) {
      subview.remove();
    });
  },

  collateSubviewGrid: function () {
    var that = this;
    this.subviewGrid = [];

    this.collection.each(function (cell) {
      var cellView = new MinesweeperLeague.Views.Cell({ model: cell });
      that.addSubview(cell.get('x'), cell.get('y'), cellView);
    });
  },

});