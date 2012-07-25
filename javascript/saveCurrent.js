(function() {

  self.onmessage = function(e) {
    return self.postMessage(e.data);
  };

}).call(this);
