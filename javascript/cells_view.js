(function() {

  define(["basic_cell", "role_cell", "food_cell", "enemy_cell", "display"], function(BASIC, ROLE, FOOD, ENEMY, DISPLAY) {
    var SCENE, cell_model;
    console.log("cells_view");
    cell_model = {
      empty: BASIC,
      role: ROLE,
      food: FOOD,
      enemy: ENEMY
    };
    SCENE = Backbone.View.extend({
      initialize: function(params) {
        var _base;
        params = params ? params : {};
        this.num = params.num ? params.num : 25.;
        this.cellSet = (function(_num) {
          var _cluster, _empties;
          _cluster = [
            {
              name: "role",
              num: 7
            }
          ];
          _empties = _num;
          _cluster.map(function(set_i) {
            set_i.rate = set_i.num / _num;
            return _empties -= set_i.num;
          });
          _cluster.push({
            name: "empty",
            num: _empties,
            rate: _empties / _num
          });
          _cluster = _cluster.sort(function(a, b) {
            return a.num - b.num;
          });
          return _cluster;
        })(this.num);
        _base = 0;
        this.cellSet.map(function(set_i) {
          set_i.rate += _base;
          return _base = set_i.rate;
        });
        this.cells = this.set(this.cellSet);
        $("#plant").showD3({});
        return this;
      },
      events: {},
      render: function() {
        return this;
      },
      remove: function() {
        return this;
      },
      set: function(cellset) {
        var cell_i, cells, i, _Math, _num, _rnd;
        _num = this.num;
        _Math = Math;
        cells = [];
        for (i = 0; 0 <= _num ? i <= _num : i >= _num; 0 <= _num ? i++ : i--) {
          _rnd = _Math.random();
          cell_i = null;
          cellset.map(function(set_i, idx) {
            var _high, _low;
            _low = 0;
            idx && (_low = cellset[idx - 1].rate);
            _high = set_i.rate;
            return ((_rnd - _low) * (_rnd - _high) <= 0) && (cell_i = new cell_model[set_i.name]({
              position: i
            }));
          });
          cells.push(cell_i);
        }
        return cells;
      },
      clear: function() {
        this.cells = [];
        return this;
      },
      start: function() {
        return this;
      },
      stop: function() {
        return this;
      }
    });
    return SCENE;
  });

}).call(this);
