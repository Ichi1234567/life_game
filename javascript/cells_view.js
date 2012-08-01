(function() {

  define(["basic_cell", "role_cell", "food_cell", "enemy_cell", "display"], function(BASIC, ROLE, FOOD, ENEMY, DISPLAY) {
    var Fps, Frames, LastTime, ROUTINES, SCENE, UpdateTime, cell_model, global_count, global_timmer, prev_status, _Math;
    console.log("cells_view");
    _Math = Math;
    cell_model = {
      empty: BASIC,
      role: ROLE,
      food: FOOD,
      enemy: ENEMY
    };
    global_timmer = null;
    global_count = 0;
    prev_status = null;
    Frames = 0;
    UpdateTime = 1000;
    LastTime = new Date();
    Fps = 0;
    window.requestAnimationFrame = (function() {
      return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();
    window.cancelRequestAnimFrame = (function() {
      return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
    })();
    ROUTINES = {
      evalSet: function(num, ghost_num, opts) {
        var _avgSB, _base, _type;
        ghost_num = ghost_num ? ghost_num : 0.;
        _base = opts.base ? opts.base : 0.27;
        _type = opts.type ? opts.type : "role";
        _avgSB = opts.avgSB ? opts.avgSB : 0.;
        switch (ghost_num) {
          case 0.:
            break;
          default:
            _base *= 1 + ghost_num / 40;
        }
        _base *= 1 - _avgSB / 10;
        return _Math.round(num * _base);
      },
      sortSets: function(sets, opts) {
        var count, _empty, _num;
        _num = opts.num;
        _empty = _num;
        sets.forEach(function(elm, idx) {
          return _empty -= elm.num;
        });
        sets.push({
          name: "empty",
          num: _empty
        });
        sets = sets.sort(function(a, b) {
          return a.num - b.num;
        });
        count = 0;
        sets = sets.map(function(set_i) {
          count += set_i.num;
          set_i.rate = count / _num;
          return set_i;
        });
        return sets;
      },
      generateSets: function(totalNum, opts) {
        var sets, tmp_sets, _avgSB, _base, _ghost, _types;
        opts = opts ? opts : {};
        _types = opts.types ? opts.types : ["role"];
        _ghost = opts.ghost ? opts.ghost : 0.;
        _base = opts.base ? opts.base : 0.27;
        _avgSB = opts.avgSB ? opts.avgSB : 0.;
        tmp_sets = _types.map(function(type_i) {
          var num;
          num = ROUTINES.evalSet(totalNum, _ghost, {
            base: _base,
            type: type_i,
            avgSB: _avgSB
          });
          return {
            name: type_i,
            num: num
          };
        });
        sets = ROUTINES.sortSets(tmp_sets, {
          num: totalNum
        });
        return sets;
      }
    };
    SCENE = Backbone.View.extend({
      initialize: function(params) {
        var _h, _saveWorker, _this, _w;
        params = params ? params : {};
        this.num = params.num ? params.num : 64.;
        this.w = params.w ? params.w : 300.;
        this.h = params.h ? params.h : 300.;
        _w = this.w;
        _h = this.h;
        this.current = 0;
        _saveWorker = new Worker("javascript/saveCurrent.js");
        this.saveWorker = _saveWorker;
        _this = this;
        _saveWorker.onmessage = function(e) {
          return _this.state = e.data;
        };
        $(".plant").eq(1).css("top", -(_h + 5));
        this.chk_opts();
        this.reset("init");
        return this;
      },
      "events": {
        "click #reset": "click_reset",
        "click #next": "next",
        "click #auto-run": "auto_run",
        "change #mode": "chg_opts",
        "change #rnd_ghost": "chg_opts",
        "change #chk-delay": "chg_opts"
      },
      render: function() {
        return this;
      },
      remove: function() {
        return this;
      },
      auto_run: function(e, status) {
        var curr_time, dt, _$target, _fps, _running, _stable, _view;
        _$target = $(e.target);
        if (!status) {
          _running = !!(_$target.attr("class"));
          _$target.toggleClass("running");
        }
        _view = this;
        if (_running && !status) {
          _stable = true;
        } else {
          _$target.html("stop");
          _stable = false;
          global_timmer && cancelRequestAnimFrame(global_timmer);
          global_timmer = requestAnimationFrame(function() {
            _view.auto_run(e, true);
            return _stable = _view.next();
          });
        }
        if (_stable) {
          _$target.html("auto-run");
          cancelRequestAnimFrame(global_timmer);
          global_timmer = null;
        } else {
          curr_time = new Date();
          Frames++;
          dt = curr_time.getTime() - LastTime.getTime();
          if (dt > UpdateTime) {
            _fps = _Math.round((Frames / dt) * UpdateTime);
            Frames = 0;
            LastTime = curr_time;
            $("#fps").html(_fps);
          }
        }
        return this;
      },
      chg_opts: function(e) {
        var _$target, _is_auto_run, _rule;
        _$target = $(e.target);
        _rule = $("#mode option:selected").html().split("/");
        _is_auto_run = $("#auto-run").attr("class") === "running";
        switch (true) {
          case _$target.is("#mode"):
            _is_auto_run && $("#auto-run").trigger("click");
            this.chk_opts();
            this.reset();
            break;
          case _$target.is("#chk-delay"):
            this.chk_opts();
            break;
          case _rule[2].length && _rule[2] !== " ":
            this.chk_opts();
            !_is_auto_run && this.reset();
        }
        return this;
      },
      click_reset: function() {
        var _is_auto_run;
        _is_auto_run = $("#auto-run").attr("class") === "running";
        _is_auto_run && $("#auto-run").trigger("click");
        return this.reset();
      },
      chk_opts: function() {
        var i, sum, _chk_delay, _fn, _rule;
        _chk_delay = !!$("#chk-delay").attr("checked");
        _rule = $("#mode option:selected").html().split("/");
        sum = 0;
        _fn = function(i) {
          return _rule[i].split("").forEach(function(val) {
            var _val;
            _val = parseInt(val);
            return !isNaN(_val) && (sum += _val);
          });
        };
        for (i = 0; i < 2; i++) {
          _fn(i);
        }
        this.cellSet = ROUTINES.generateSets(this.num, {
          ghost: parseInt(_rule[2]),
          base: _chk_delay ? 0.2 : 0.27,
          avgSB: _Math.round(sum / 9)
        });
        return this;
      },
      reset: function(init) {
        var _cells, _current, _h, _num, _w;
        global_count = 0;
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
          (init || _chk) && $(elm).html("").showD3({
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
        var cells, i, mode, result, _cells, _chk_delay, _current, _h, _is_auto_reset, _localTime, _num, _stable, _state, _view, _w;
        _current = this.current;
        _cells = this.cells;
        _num = this.num;
        _state = this.state;
        _stable = true;
        mode = $("#mode option:selected").val();
        _chk_delay = !!$("#chk-delay").attr("checked");
        for (i = 0; 0 <= _num ? i < _num : i > _num; 0 <= _num ? i++ : i--) {
          result = (function(i, cells) {
            return cells[i].move(_state, cells, mode, {
              EMPTY: BASIC,
              ROLE: ROLE,
              FOOD: FOOD,
              ENEMY: ENEMY,
              delay: _chk_delay
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
        this.current = (_current + 1) % 2;
        _stable && !prev_status && (prev_status = _stable);
        if (_stable && _stable === prev_status) {
          global_count++;
        } else {
          global_count = 0;
          prev_status = null;
        }
        (global_count === 10) && (global_count = 0, prev_status = null, _is_auto_reset = !!$("#auto-reset").attr("checked"), _view = this, _is_auto_reset && _view.reset(), _localTime = null, !_is_auto_reset && $("#auto-run").trigger("click"));
        return _stable;
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
      }
    });
    return SCENE;
  });

}).call(this);
