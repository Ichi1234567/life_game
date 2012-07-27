(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(["basic_cell"], function(BASIC_CELL) {
    var ROLE, RULE, chkbyNei, _Math, _banners, _brainbrain, _conway, _ebbflow, _fireworks, _flakes, _logic, _maze, _rake, _replicator, _spirals, _twoxtwo;
    console.log("role_cell");
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
    _twoxtwo = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 1.:
        case 2.:
        case 5.:
          break;
        default:
          _stable = _origin_type === "empty";
          cells[position] = new EMPTY({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _conway = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
        case 3.:
          break;
        default:
          _stable = _origin_type === "empty";
          cells[position] = new EMPTY({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _flakes = function(thisCell, current, cells, opts) {
      return {
        cells: cells,
        stable: true
      };
    };
    _maze = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 1.:
        case 2.:
        case 3.:
        case 4.:
        case 5.:
          break;
        default:
          _stable = _origin_type === "empty";
          cells[position] = new EMPTY({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _replicator = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 1.:
        case 3.:
        case 5.:
        case 7.:
          break;
        default:
          _stable = _origin_type === "empty";
          cells[position] = new EMPTY({
            position: position
          });
      }
      return {
        cells: cells,
        stable: _stable
      };
    };
    _logic = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = _origin_type === "empty";
      cells[position] = new EMPTY({
        position: position
      });
      return {
        cells: cells,
        stable: _stable
      };
    };
    _brainbrain = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = _origin_type === "ghost";
      cells[position].type = "ghost";
      cells[position].ghost++;
      cells[position].ghost === 2 && (_stable = _origin_type === "empty", cells[position] = new EMPTY({
        position: position
      }));
      return {
        cells: cells,
        stable: _stable
      };
    };
    _banners = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
        case 3.:
        case 6.:
        case 7.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && (cells[position].ghost++, _stable = _origin_type === "ghost");
      cells[position].ghost === 6 && (cells[position] = new EMPTY({
        position: position
      }), _stable = _origin_type === "empty");
      return {
        cells: cells,
        stable: _stable
      };
    };
    _ebbflow = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 0.:
        case 1.:
        case 2.:
        case 4.:
        case 7.:
        case 8.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && (cells[position].ghost++, _stable = _origin_type === "ghost");
      cells[position].ghost === 17 && (cells[position] = new EMPTY({
        position: position
      }), _stable = _origin_type === "empty");
      return {
        cells: cells,
        stable: _stable
      };
    };
    _fireworks = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && (cells[position].ghost++, _stable = _origin_type === "ghost");
      cells[position].ghost === 20 && (cells[position] = new EMPTY({
        position: position
      }), _stable = _origin_type === "empty");
      return {
        cells: cells,
        stable: _stable
      };
    };
    _rake = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 3.:
        case 4.:
        case 6.:
        case 7.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && (cells[position].ghost++, _stable = _origin_type === "ghost");
      cells[position].ghost === 5 && (cells[position] = new EMPTY({
        position: position
      }), _stable = _origin_type === "empty");
      return {
        cells: cells,
        stable: _stable
      };
    };
    _spirals = function(thisCell, current, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, current, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      _stable = true;
      switch (bedead) {
        case 2.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && (cells[position].ghost++, _stable = _origin_type === "ghost");
      cells[position].ghost === 4 && (cells[position] = new EMPTY({
        position: position
      }), _stable = _origin_type === "empty");
      return {
        cells: cells,
        stable: _stable
      };
    };
    RULE = {
      twoxtwo: _twoxtwo,
      conway: _conway,
      flakes: _flakes,
      maze: _maze,
      replicator: _replicator,
      logic: _logic,
      brainbrain: _brainbrain,
      banners: _banners,
      ebbflow: _ebbflow,
      fireworks: _fireworks,
      rake: _rake,
      spirals: _spirals
    };
    ROLE = (function(_super) {

      __extends(ROLE, _super);

      function ROLE(params) {
        var base_measure, _const, _dying, _measure_num;
        ROLE.__super__.constructor.call(this, params);
        this.type = "role";
        this.speed = "2";
        if (!!params.dying) {
          _dying = params.dying;
          _measure_num = _Math.random();
          _const = _dying < 10 ? (100 - _dying * _dying) / 1000 : -_dying * _dying / 10000;
          base_measure = 0.70 * (1 - _dying / 20 - _const);
          _measure_num > base_measure && (_measure_num = _Math.round(_Math.random() * (_dying - 1) + 1), _measure_num && (this.type = "ghost", this.ghost = _measure_num));
        }
        this;
      }

      ROLE.prototype.move = function(current, cells, mode, opts) {
        opts.rule = RULE;
        return ROLE.__super__.move.call(this, current, cells, mode, opts);
      };

      return ROLE;

    })(BASIC_CELL);
    return ROLE;
  });

}).call(this);
