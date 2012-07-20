(function() {

  define(["basic_cell"], function(EMPTY) {
    var chkbyNei, _twotwo;
    console.log("rule");
    chkbyNei = function(thisCell, cells) {
      var bedead, delta, position;
      position = thisCell.position;
      thisCell.lifecycle++;
      delta = [1, 3, 2, 23, 21, 63, 42, 43];
      bedead = 0;
      delta.map(function(delta_i) {
        var cell_nei, ghost_i, position_i;
        position_i = position_i + delta_i;
        cell_nei = cells[position_i];
        if (!!cell_nei && cell_nei.cell.type === "role") {
          ghost_i = cell_nei.cell.ghost;
          return (typeof ghost_i === "number" && !ghost_i) && (bedead++);
        }
      });
      (thisCell.cell.type === "role") && (bedead--);
      return bedead;
    };
    _twotwo = function(thisCell, cells, result) {
      var bedead, position;
      position = thisCell.position;
      bedead = chkbyNei(thisCell, cells);
      switch (bedead) {
        case 1.:
        case 2.:
        case 3.:
          console.log("do nothing");
          break;
        default:
          result[position].cell = new EMPTY(position);
      }
      return result;
    };
    return {
      "towtow": _twotwo
    };
  });

}).call(this);
