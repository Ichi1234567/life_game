(function() {

  define(["rule"], function(RULE) {
    var MODEL, chkbyNei, _Math, _assimilation, _banners, _belzhab, _brainbrain, _conway, _ebbflow, _fireworks, _flakes, _flaming_starbow, _frozen_spirals, _logic, _maze, _rake, _replicator, _soft_freeze, _spirals, _star_wars, _twoxtwo;
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
    _twoxtwo = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 3.:
        case 6.:
          cells[position] = new ROLE({
            position: position
          });
          _stable = _origin_type === "role";
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _conway = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 3.:
          _stable = _origin_type === "role";
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _flakes = _conway;
    _maze = _conway;
    _replicator = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 1.:
        case 3.:
        case 5.:
        case 7.:
          _stable = _origin_type === "role";
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _logic = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
          _stable = _origin_type === "role";
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _assimilation = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 3.:
        case 4.:
        case 5.:
          _stable = _origin_type === "role";
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _brainbrain = _logic;
    _banners = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 3.:
        case 4.:
        case 5.:
        case 7.:
          _stable = (_origin_type === "role") && (!thisCell.ghost);
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _ebbflow = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 3.:
        case 6.:
          _stable = (_origin_type === "role") && (!thisCell.ghost);
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _fireworks = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 1.:
        case 3.:
          _stable = (_origin_type === "role") && (!thisCell.ghost);
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _rake = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
        case 6.:
        case 7.:
        case 8.:
          _stable = (_origin_type === "role") && (!thisCell.ghost);
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _spirals = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
        case 3.:
        case 4.:
          _stable = (_origin_type === "role") && (!thisCell.ghost);
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _star_wars = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
          _stable = (_origin_type === "role") && (!thisCell.ghost);
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _soft_freeze = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 3.:
        case 8.:
          _stable = (_origin_type === "role") && (!thisCell.ghost);
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _frozen_spirals = function(thisCell, current, cells, opts) {
      var ROLE, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      ROLE = opts.ROLE;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
        case 3.:
          _stable = (_origin_type === "role") && (!thisCell.ghost);
          cells[position] = new ROLE({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _belzhab = _frozen_spirals;
    _flaming_starbow = _frozen_spirals;
    RULE = {
      twoxtwo: _twoxtwo,
      conway: _conway,
      flakes: _flakes,
      maze: _maze,
      replicator: _replicator,
      logic: _logic,
      assimilation: _assimilation,
      brainbrain: _brainbrain,
      banners: _banners,
      ebbflow: _ebbflow,
      fireworks: _fireworks,
      rake: _rake,
      spirals: _spirals,
      star_wars: _star_wars,
      soft_freeze: _soft_freeze,
      frozen_spirals: _frozen_spirals,
      belzhab: _belzhab,
      flaming_starbow: _flaming_starbow
    };
    console.log("basic_cell");
    MODEL = Backbone.Model.extend({
      initialize: function(params) {
        this.type = "empty";
        this.delay = 0;
        this.lifecycle = 0;
        this.position = params.position;
        this.ghost = 0;
        return this;
      },
      constructor: function(params) {
        this.type = "empty";
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
        opts.rule && (_rule = opts.rule, delete opts.rule);
        if (typeof _rule[mode] !== "function") {
          return {
            cells: cells,
            stable: true
          };
        }
        result = _rule[mode](this, current, cells, opts);
        return result;
      }
    });
    return MODEL;
  });

}).call(this);
