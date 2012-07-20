(function() {

  define(["rule"], function(RULE) {
    var MODEL;
    console.log("basic_cell");
    MODEL = Backbone.Model.extend({
      initialize: function(params) {
        this.type = "empty";
        this.speed = 0;
        this.lifecycle = 0;
        this.position = params.position;
        this.ghost = 0;
        return this;
      },
      constructor: function(params) {
        this.type = "empty";
        this.speed = 0;
        this.lifecycle = 0;
        this.position = params.position;
        this.ghost = 0;
        return this;
      },
      move: function(cells, mode) {
        return RULE[mode](this, cells);
      }
    });
    return MODEL;
  });

}).call(this);
