(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(["basic_cell"], function(BASIC_CELL) {
    var ROLE, RULE, chkbyNei, _Math, _banners, _brainbrain, _conway, _ebbflow, _fireworks, _flakes, _logic, _maze, _rake, _replicator, _spirals, _twoxtwo;
    console.log("role_cell");
    _Math = Math;
    chkbyNei = function(thisCell, cells, num) {
      var bedead, c_size, delta, position;
      position = thisCell.position;
      thisCell.lifecycle++;
      c_size = _Math.sqrt(num);
      delta = [1, -1, -c_size, -c_size + 1, -c_size - 1, c_size, c_size + 1, c_size - 1];
      bedead = 0;
      delta.map(function(delta_i) {
        var cell_nei, ghost_i, nei_pos;
        nei_pos = position + delta_i;
        cell_nei = cells[nei_pos];
        if (!!cell_nei && cell_nei.type === "role") {
          ghost_i = cell_nei.ghost;
          return (typeof ghost_i === "number" && !ghost_i) && (bedead++);
        }
      });
      (thisCell.type === "role") && (bedead--);
      return bedead;
    };
    _twoxtwo = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      switch (bedead) {
        case 1.:
        case 2.:
        case 5.:
          _stable = true;
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
    _conway = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      switch (bedead) {
        case 2.:
        case 3.:
          _stable = true;
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
    _flakes = function(thisCell, cells, opts) {
      return {
        cells: cells,
        stable: true
      };
    };
    _maze = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      switch (bedead) {
        case 1.:
        case 2.:
        case 3.:
        case 4.:
        case 5.:
          _stable = true;
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
    _replicator = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      switch (bedead) {
        case 1.:
        case 3.:
        case 5.:
        case 7.:
          _stable = true;
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
    _logic = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type, _stable;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
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
    _brainbrain = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      cells[position].type = "ghost";
      cells[position].ghost++;
      cells[position].ghost === 2 && (cells[position] = new EMPTY({
        position: position
      }));
      return {
        cells: cells,
        stable: false
      };
    };
    _banners = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      switch (bedead) {
        case 2.:
        case 3.:
        case 6.:
        case 7.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && cells[position].ghost++;
      cells[position].ghost === 6 && (cells[position] = new EMPTY({
        position: position
      }));
      return {
        cells: cells,
        stable: false
      };
    };
    _ebbflow = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
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
      cells[position].type === "ghost" && cells[position].ghost++;
      cells[position].ghost === 17 && (cells[position] = new EMPTY({
        position: position
      }));
      return {
        cells: cells,
        stable: false
      };
    };
    _fireworks = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      switch (bedead) {
        case 2.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && cells[position].ghost++;
      cells[position].ghost === 20 && (cells[position] = new EMPTY({
        position: position
      }));
      return {
        cells: cells,
        stable: false
      };
    };
    _rake = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      switch (bedead) {
        case 3.:
        case 4.:
        case 6.:
        case 7.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && cells[position].ghost++;
      cells[position].ghost === 5 && (cells[position] = new EMPTY({
        position: position
      }));
      return {
        cells: cells,
        stable: false
      };
    };
    _spirals = function(thisCell, cells, opts) {
      var EMPTY, bedead, position, _origin_type;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells, opts.num);
      EMPTY = opts.EMPTY;
      _origin_type = thisCell.type;
      switch (bedead) {
        case 2.:
          break;
        default:
          cells[position].type = "ghost";
      }
      cells[position].type === "ghost" && cells[position].ghost++;
      cells[position].ghost === 4 && (cells[position] = new EMPTY({
        position: position
      }));
      return {
        cells: cells,
        stable: false
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
        ROLE.__super__.constructor.apply(this, arguments);
        this.type = "role";
        this.speed = "2";
      }

      ROLE.prototype.move = function(cells, mode, opts) {
        opts.rule = RULE;
        return ROLE.__super__.move.call(this, cells, mode, opts);
      };

      return ROLE;

    })(BASIC_CELL);
    return ROLE;
  });

}).call(this);