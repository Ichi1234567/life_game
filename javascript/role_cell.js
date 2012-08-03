(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(["basic_cell", "rule"], function(BASIC_CELL, RULE) {
    var ROLE, chkbyNei, _Math, _assimilation, _banners, _baseFn, _belzhab, _brainbrain, _conway, _ebbflow, _fireworks, _flakes, _flaming_starbow, _frozen_spirals, _logic, _maze, _rake, _replicator, _soft_freeze, _spirals, _star_wars, _twoxtwo;
    console.log("role_cell");
    console.log(RULE);
    _Math = Math;
    chkbyNei = function(thisCell, current, cells, num) {
      var bedead, c_size, delta, position, this_row;
      position = thisCell.position;
      thisCell.lifecycle++;
      c_size = _Math.sqrt(num);
      this_row = _Math.floor(position / c_size);
      delta = [1, -1, -c_size, -c_size + 1, -c_size - 1, c_size, c_size + 1, c_size - 1];
      bedead = 0;
      delta.map(function(delta_i, idx) {
        var abs_delta_i, cell_nei, chk_row, ghost_i, nei_pos, row;
        abs_delta_i = _Math.abs(delta_i);
        switch (true) {
          case abs_delta_i < 2:
            chk_row = 0;
            break;
          case delta_i > 0:
            chk_row = 1;
            break;
          case delta_i < 0:
            chk_row = -1;
        }
        nei_pos = position + delta_i;
        row = _Math.floor(nei_pos / c_size);
        if ((row - this_row) === chk_row) {
          cell_nei = current[nei_pos];
          if (!!cell_nei && cell_nei.type === "role") {
            ghost_i = cell_nei.ghost;
            return (typeof ghost_i === "number" && !ghost_i) && (bedead++);
          }
        }
      });
      (thisCell.type === "role") && (bedead--);
      return bedead;
    };
    _baseFn = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, chk, i, position, rule_desc, rule_nei, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      rule_desc = opts.desc;
      rule_nei = rule_desc[0];
      i = rule_nei.length;
      chk = false;
      while (i) {
        bedead === rule_nei[--i] && (chk = true, i = 0);
      }
      !chk && rule_desc[2] > 0 && (cells[position].type = "ghost");
      cells[position].type === "ghost" && (cells[position].ghost++, _stable = false);
      ((!chk && rule_desc[2] < 0) || (rule_desc[2] > 0 && cells[position].ghost >= rule_desc[2])) && (cells[position] = new EMPTY({
        position: position
      }), _stable = _origin_type === "empty");
      return {
        cells: cells,
        stable: _stable
      };
    };
    _twoxtwo = function(thisCell, current, cells, opts) {
      opts.desc = "125/36/";
      return _baseFn(thisCell, current, cells, opts);
    };
    _conway = function(thisCell, current, cells, opts) {
      opts.desc = "23/3/";
      return _baseFn(thisCell, current, cells, opts);
    };
    _flakes = function(thisCell, current, cells, opts) {
      return {
        cells: cells,
        stable: true
      };
    };
    _maze = function(thisCell, current, cells, opts) {
      opts.desc = "12345/3/";
      return _baseFn(thisCell, current, cells, opts);
    };
    _replicator = function(thisCell, current, cells, opts) {
      opts.desc = "1357/1357/";
      return _baseFn(thisCell, current, cells, opts);
    };
    _logic = function(thisCell, current, cells, opts) {
      var EMPTY, position;
      position = thisCell.position;
      EMPTY = opts.EMPTY;
      cells[position] = new EMPTY({
        position: position
      });
      return {
        cells: cells,
        stable: false
      };
    };
    _assimilation = function(thisCell, current, cells, opts) {
      opts.desc = "4567/345/";
      return _baseFn(thisCell, current, cells, opts);
    };
    _brainbrain = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      cells[position].type = "ghost";
      cells[position].ghost++;
      cells[position].ghost >= 3 && (_stable = _origin_type === "empty", cells[position] = new EMPTY({
        position: position
      }));
      return {
        cells: cells,
        stable: _stable
      };
    };
    _banners = function(thisCell, current, cells, opts) {
      opts.desc = "2367/3457/5";
      return _baseFn(thisCell, current, cells, opts);
    };
    _ebbflow = function(thisCell, current, cells, opts) {
      opts.desc = "012478/36/16";
      return _baseFn(thisCell, current, cells, opts);
    };
    _fireworks = function(thisCell, current, cells, opts) {
      opts.desc = "2/13/19";
      return _baseFn(thisCell, current, cells, opts);
    };
    _rake = function(thisCell, current, cells, opts) {
      opts.desc = "3467/2678/4";
      return _baseFn(thisCell, current, cells, opts);
    };
    _spirals = function(thisCell, current, cells, opts) {
      opts.desc = "2/234/3";
      return _baseFn(thisCell, current, cells, opts);
    };
    _star_wars = function(thisCell, current, cells, opts) {
      opts.desc = "345/2/4";
      return _baseFn(thisCell, current, cells, opts);
    };
    _soft_freeze = function(thisCell, current, cells, opts) {
      opts.desc = "13458/38/6";
      return _baseFn(thisCell, current, cells, opts);
    };
    _frozen_spirals = function(thisCell, current, cells, opts) {
      opts.desc = "356/23/6";
      return _baseFn(thisCell, current, cells, opts);
    };
    _belzhab = function(thisCell, current, cells, opts) {
      opts.desc = "23/23/8";
      return _baseFn(thisCell, current, cells, opts);
    };
    _flaming_starbow = function(thisCell, current, cells, opts) {
      opts.desc = "347/23/6";
      return _baseFn(thisCell, current, cells, opts);
    };
    ROLE = (function(_super) {

      __extends(ROLE, _super);

      function ROLE(params) {
        var base_measure, _const, _dying, _measure_num;
        ROLE.__super__.constructor.call(this, params);
        this.type = "role";
        this.delay = "2";
        if (!!params.dying) {
          _dying = params.dying;
          _measure_num = _Math.random();
          _const = _Math.sin((_dying / 21) * _Math.PI);
          base_measure = 0.70 - _const;
          base_measure = _Math.max(_const, base_measure);
          _measure_num > base_measure && (_measure_num = _Math.round(_Math.random() * (_dying - 2) + 1), this.type = "ghost", this.ghost = _measure_num);
        }
        this;
      }

      ROLE.prototype.move = function(current, cells, mode, opts) {
        var is_delay, result;
        opts = opts ? opts : {};
        opts.num = cells.length;
        opts.rule = RULE;
        is_delay = opts.delay ? true : false;
        delete opts.delay;
        result = {
          cells: cells,
          stable: true
        };
        if (is_delay && this.lifecycle < this.delay) {
          this.lifecycle++;
        } else {
          this.lifecycle = 0;
          if (!!RULE[mode]) {
            opts.desc = RULE[mode];
            _baseFn(this, current, cells, opts);
          }
        }
        return result;
      };

      return ROLE;

    })(BASIC_CELL);
    return ROLE;
  });

}).call(this);
