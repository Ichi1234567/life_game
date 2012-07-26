(function() {

  define(["basic_cell", "role_cell", "food_cell", "enemy_cell", "display"], function(BASIC, ROLE, FOOD, ENEMY, DISPLAY) {
    var SCENE, cell_model, _Math;
    console.log("cells_view");
    _Math = Math;
    cell_model = {
      empty: BASIC,
      role: ROLE,
      food: FOOD,
      enemy: ENEMY
    };
    SCENE = Backbone.View.extend({
      initialize: function(params) {
        var _base, _cells, _h, _num, _saveWorker, _this, _w;
        params = params ? params : {};
        this.num = params.num ? params.num : 64.;
        this.cellSet = (function(_num) {
          var _cluster, _empties;
          _cluster = [
            {
              name: "role",
              num: 18
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
        _num = this.num;
        _cells = this.cells;
        this.w = params.w ? params.w : 300.;
        this.h = params.h ? params.h : 300.;
        _w = this.w;
        _h = this.h;
        this.current = 0;
        $(".plant").each(function(idx) {
          $(this).showD3({
            w: _w,
            h: _h,
            num: _Math.ceil(_Math.sqrt(_num)),
            data: _cells
          });
          return idx && $(this).css("top", -(_h + 5));
        });
        _saveWorker = new Worker("javascript/saveCurrent.js");
        this.saveWorker = _saveWorker;
        _this = this;
        _saveWorker.onmessage = function(e) {
          return _this.state = e.data;
        };
        _saveWorker.postMessage(this.cells);
        return this;
      },
      "events": {
        "click #reset": "reset",
        "click #next": "next",
        "change #rnd_ghost": "chk_rnd_ghost",
        "change #mode": "reset"
      },
      render: function() {
        return this;
      },
      remove: function() {
        return this;
      },
      chk_rnd_ghost: function() {
        var _rule;
        _rule = $("#mode option:selected").html().split("/");
        if (_rule[2].length && _rule[2] !== " ") this.reset();
        return this;
      },
      reset: function() {
        var _cells, _current, _h, _num, _w;
        this.cells = this.set(this.cellSet);
        _num = this.num;
        _cells = this.cells;
        _w = this.w;
        _h = this.h;
        _current = this.current;
        this.saveWorker.postMessage(_cells);
        $(".plant").each(function(idx, elm) {
          var _chk;
          _chk = idx - _current;
          _chk && $(elm).html("").showD3({
            w: _w,
            h: _h,
            num: _Math.ceil(_Math.sqrt(_num)),
            data: _cells
          }).css("visibility", "visible");
          (!_chk) && $(elm).css("visibility", "hidden");
          return true;
        });
        this.current = (_current + 1) % 2;
        return this;
      },
      next: function() {
        var cells, i, mode, result, _cells, _current, _h, _num, _stable, _state, _w;
        _current = this.current;
        _cells = this.cells;
        _num = this.num;
        _state = this.state;
        _stable = true;
        mode = $("#mode option:selected").val();
        for (i = 0; 0 <= _num ? i < _num : i > _num; 0 <= _num ? i++ : i--) {
          result = (function(i, cells) {
            return cells[i].move(_state, cells, mode, {
              EMPTY: BASIC,
              ROLE: ROLE,
              FOOD: FOOD,
              ENEMY: ENEMY
            });
          })(i, _cells);
          !result.stable && (_stable = false);
          cells = result.cells;
        }
        this.cells = _cells;
        _w = this.w;
        _h = this.h;
        this.saveWorker.postMessage(this.cells);
        _state = this.state;
        if (!_stable) {
          $(".plant").each(function(idx, elm) {
            var _chk;
            _chk = idx - _current;
            _chk && $(elm).updateD3(_cells).css("visibility", "visible");
            (!_chk) && $(elm).css("visibility", "hidden");
            return true;
          });
        }
        return this.current = (_current + 1) % 2;
      },
      set: function(cellset) {
        var cell_i, cells, i, _dying_const, _num, _rnd, _rnd_ghost, _rule;
        _num = this.num;
        _Math = Math;
        cells = [];
        _rnd_ghost = !!$("#rnd_ghost").attr("checked");
        _rule = $("#mode option:selected").html().split("/");
        _dying_const = 0;
        if (_rnd_ghost && _rule[2].length && _rule[2] !== " ") {
          _dying_const = parseInt(_rule[2]);
        }
        for (i = 0; 0 <= _num ? i < _num : i > _num; 0 <= _num ? i++ : i--) {
          _rnd = _Math.random();
          cell_i = null;
          cellset.map(function(set_i, idx) {
            var _high, _low;
            _low = 0;
            idx && (_low = cellset[idx - 1].rate);
            _high = set_i.rate;
            return ((_rnd - _low) * (_rnd - _high) <= 0) && (cell_i = new cell_model[set_i.name]({
              position: i,
              dying: _dying_const
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
