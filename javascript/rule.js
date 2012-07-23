(function() {

  define([], function() {
    var chkbyNei, _Math, _conway, _logic, _maze, _replicator, _twoxtwo;
    console.log("rule");
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
    return {
      "twoxtwo": _twoxtwo,
      "conway": _conway,
      "maze": _maze,
      "replicator": _replicator,
      "logic": _logic
    };
  });

}).call(this);
