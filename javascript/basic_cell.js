(function() {

  define(["rule"], function(RULE) {
    var MODEL, chkbyNei, _Math, _baseFn;
    _Math = Math;
    chkbyNei = function(thisCell, current, cells, num) {
      var bedead, c_size, delta, position, this_row;
      position = thisCell.position;
      thisCell.lifecycle++;
      c_size = _Math.sqrt(num);
      this_row = _Math.floor(position / c_size);
      delta = [1, -1, -c_size, -c_size + 1, -c_size - 1, c_size, c_size + 1, c_size - 1];
      bedead = 0;
      delta.map(function(delta_i) {
        var abs_delta_i, cell_nei, chk_row, nei_pos, row;
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
        if (!(row - this_row - chk_row)) {
          cell_nei = current[nei_pos];
          if (!!cell_nei && cell_nei.type === "role") return bedead++;
        }
      });
      return bedead;
    };
    _baseFn = function(thisCell, current, cells, opts) {
      var ROLE, bedead, chk, i, position, rule_desc, rule_nei, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      rule_desc = opts.desc;
      rule_nei = rule_desc[1];
      i = rule_nei.length;
      chk = false;
      while (i) {
        bedead === rule_nei[--i] && (chk = true, i = 0);
      }
      chk && (cells[position] = new ROLE({
        position: position
      }), _stable = _origin_type === "role");
      return {
        cells: cells,
        stable: _stable
      };
    };
    console.log("basic_cell");
    MODEL = Backbone.Model.extend({
      initialize: function(params) {
        this.type = "empty";
        this.visited = false;
        this.delay = 0;
        this.lifecycle = 0;
        this.position = params.position;
        this.ghost = 0;
        return this;
      },
      constructor: function(params) {
        this.type = "empty";
        this.visited = false;
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
        if (!this.visited && !!_rule[mode]) {
          opts.desc = RULE[mode];
          result = _baseFn(this, current, cells, opts);
        }
        return result;
      }
    });
    return MODEL;
  });

}).call(this);
