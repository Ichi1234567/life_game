(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(["basic_cell"], function(BASIC_CELL) {
    var ROLE;
    console.log("role_cell");
    ROLE = (function(_super) {

      __extends(ROLE, _super);

      function ROLE(params) {
        ROLE.__super__.constructor.apply(this, arguments);
        this.type = "role";
        this.speed = "2";
      }

      return ROLE;

    })(BASIC_CELL);
    return ROLE;
  });

}).call(this);
