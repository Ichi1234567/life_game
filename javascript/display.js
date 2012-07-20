(function() {

  require([], function() {
    var dotSet, height, line, lineSet, margin, width;
    console.log("display");
    lineSet = "line1";
    dotSet = "dot1";
    margin = {
      top: 15,
      right: 15,
      bottom: 25,
      left: 40
    };
    width = 400 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;
    line = d3.svg.line().interpolate("basis").x(function(d) {
      return ex(d.x);
    }).y(function(d) {
      return ey(d.y);
    });
    return $.fn.showD3 = function(parmas) {
      var $svg, data, domainX, domainY;
      if (!parmas) return;
      data = parmas.data;
      margin = parmas.margin ? parmas.margin : {};
      margin.top = margin.top ? margin.top : 10.;
      margin.right = margin.right ? margin.right : 15.;
      margin.bottom = margin.bottom ? margin.bottom : 25.;
      margin.left = margin.left ? margin.left : 40.;
      width = parmas.w ? parmas.w : 400.;
      width = width - margin.left - margin.right;
      height = parmas.h ? parmas.h : 400.;
      height = height - margin.top - margin.bottom;
      domainX = parmas.domainX ? parmas.domainX : [0, 1];
      domainY = parmas.domainY ? parmas.domainY : [0, 1];
      $svg = d3.selectAll(this).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      return $svg.append("svg:rect").attr("class", "box").attr("width", width).attr("height", height);
    };
  });

}).call(this);
