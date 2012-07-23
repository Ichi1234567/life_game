(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(["basic_cell"], function(BASIC_CELL) {
    var ENEMY;
    ENEMY = (function(_super) {

      __extends(ENEMY, _super);

      function ENEMY(params) {
        ENEMY.__super__.constructor.apply(this, arguments);
        this.type = "enemy";
        this.speed = "2";
      }

      return ENEMY;

    })(BASIC_CELL);
    return ENEMY;
  });

}).call(this);
