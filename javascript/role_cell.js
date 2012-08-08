(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(["basic_cell", "rule"], function(BASIC_CELL, RULE) {
    var ROLE, chkbyNei, _Math, _baseFn;
    console.log("role_cell");
    _Math = Math;
    chkbyNei = function(thisCell, current, cells, c_size) {
      var bedead, chk_row, delta, position, this_row;
      position = thisCell.position;
      thisCell.lifecycle++;
      this_row = _Math.floor(position / c_size);
      delta = [1, -1, -c_size, -c_size + 1, -c_size - 1, c_size, c_size + 1, c_size - 1];
      bedead = 0;
      chk_row = [0, -1, 1];
      delta.map(function(delta_i, idx) {
        var cell_nei, nei_pos, row;
        nei_pos = position + delta_i;
        row = _Math.floor(nei_pos / c_size);
        if (!(row - this_row - chk_row[_Math.floor((idx + 1) / 3)])) {
          cell_nei = current[nei_pos];
          if (!!cell_nei && cell_nei.type === "role") return bedead++;
        }
      });
      return bedead;
    };
    _baseFn = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, chk, i, position, rule_desc, rule_nei, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.c_size);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      rule_desc = opts.desc;
      rule_nei = rule_desc[0];
      i = rule_nei.length;
      chk = false;
      if (thisCell.type !== "ghost") {
        while (i) {
          bedead === rule_nei[--i] && (chk = true, i = 0);
        }
        !chk && rule_desc[2] > 0 && (cells[position].type = "ghost");
      }
      (thisCell.type === "ghost") && (cells[position].ghost++, _stable = false);
      ((!chk && rule_desc[2] < 0) || (rule_desc[2] > 0 && cells[position].ghost >= rule_desc[2])) && (cells[position] = new EMPTY({
        position: position
      }), _stable = false);
      return {
        cells: cells,
        stable: _stable
      };
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
        var is_delay, result, _rule;
        opts = opts ? opts : {};
        opts.num = cells.length;
        _rule = RULE;
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
          if (!!_rule[mode]) {
            opts.desc = _rule[mode];
            result = _baseFn(this, current, cells, opts);
          }
        }
        return result;
      };

      return ROLE;

    })(BASIC_CELL);
    return ROLE;
  });

}).call(this);
