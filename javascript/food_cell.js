(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(["basic_cell"], function(BASIC_CELL) {
    var FOOD;
    FOOD = (function(_super) {

      __extends(FOOD, _super);

      function FOOD(params) {
        FOOD.__super__.constructor.apply(this, arguments);
        this.type = "food";
        this.speed = "1.5";
      }

      return FOOD;

    })(BASIC_CELL);
    return FOOD;
  });

}).call(this);
