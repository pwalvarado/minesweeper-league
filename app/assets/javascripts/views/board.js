MinesweeperLeague.Views.Board = Backbone.View.extend({

  initialize: function () {
    this.populateOrResetSubviewGrid();

    this.listenTo(this.collection, 'change:revealed', function (model) {
      this.subviewGrid[model.get('x')][model.get('y')].render();
    });
  },

  className: "board",

  events: {
    'click .reset': 'reset'
  },


  addSubview: function (x, y, subView) {
    if (!this.subviewGrid[x]) {
      this.subviewGrid[x] = [];
    }

    this.subviewGrid[x][y] = subView;
  },

  eachSubview: function (callback) {
    for (var rowName in this.subviewGrid) {
      for (var cellName in this.subviewGrid[rowName]) {
        callback(this.subviewGrid[rowName][cellName]);
      }
    }
  },

  removeSubviews: function () {
    this.eachSubview(function (subview) {
      subview.remove();
    });

    this.remove();
  },

  reset: function () {
    this.collection.reset(MinesweeperLeague.generateCells());
    this.collection.ended = false;
    this.removeSubviews();
    this.populateOrResetSubviewGrid();
    $('#main').html(this.render().$el);
  },

  populateOrResetSubviewGrid: function () {
    this.subviewGrid = [];
    var that = this;

    this.collection.each(function (cell) {
      var cellView = new MinesweeperLeague.Views.Cell({ model: cell });
      that.addSubview(cell.get('x'), cell.get('y'), cellView);
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.eachSubview(function (subview) {
      this.$el.find('.cells').append(subview.render().$el);
    }.bind(this));
    this.delegateEvents();

    return this;
  },

  template: JST['board'],

});
