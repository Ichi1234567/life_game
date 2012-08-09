(function() {

  define(["rule"], function(RULE) {
    var MODEL, chkbyNei, _Math, _baseFn;
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
          return !!cell_nei && cell_nei.type === "role" && (bedead++);
        }
      });
      return bedead;
    };
    _baseFn = function(thisCell, current, cells, opts) {
      var ROLE, bedead, chk, cond, position, rule_desc, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.c_size);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      rule_desc = opts.desc;
      cond = rule_desc[1];
      chk = cond ? cond.test(bedead) : false;
      chk && (cells[position] = new ROLE({
        position: position
      }), _stable = false);
      return {
        cells: cells,
        stable: _stable
      };
    };
    console.log("basic_cell");
    MODEL = Backbone.Model.extend({
      initialize: function(params) {
        this.type = "empty";
        this.visited = params.visited ? true : false;
        this.delay = 0;
        this.lifecycle = 0;
        this.position = params.position;
        this.ghost = 0;
        return this;
      },
      constructor: function(params) {
        this.type = "empty";
        this.visited = params.visited ? true : false;
        this.delay = 0;
        this.lifecycle = 0;
        this.position = params.position;
        this.ghost = 0;
        return this;
      },
      getData: function() {
        return {
          type: this.type,
          delay: this.delay,
          position: this.position,
          ghost: this.ghost,
          lifecycle: this.lifecycle
        };
      },
      move: function(current, cells, mode, opts) {
        var result, _rule;
        opts = opts ? opts : {};
        opts.num = cells.length;
        _rule = RULE;
        result = {
          cells: cells,
          stable: true
        };
        !!_rule[mode] && (opts.desc = RULE[mode], result = _baseFn(this, current, cells, opts));
        return result;
      }
    });
    return MODEL;
  });

}).call(this);
