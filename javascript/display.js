(function() {

  require([], function() {
    var dotSet, height, lineSet, margin, width, _Math;
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
    _Math = Math;
    return $.fn.showD3 = function(parmas) {
      var $svg, data, data_i, dh, domainX, domainY, dw, dx, dy, dy2, i, line, num, _fn, _len, _results;
      if (!parmas) return;
      data = parmas.data;
      num = parmas.num;
      margin = parmas.margin ? parmas.margin : {};
      margin.top = margin.top ? margin.top : 10.;
      margin.right = margin.right ? margin.right : 15.;
      margin.bottom = margin.bottom ? margin.bottom : 25.;
      margin.left = margin.left ? margin.left : 40.;
      width = parmas.w ? parmas.w : 400.;
      width = width - margin.left - margin.right;
      height = parmas.h ? parmas.h : 400.;
      height = height - margin.top - margin.bottom;
      domainX = parmas.domainX ? parmas.domainX : [0, num];
      domainY = parmas.domainY ? parmas.domainY : [0, num];
      dx = d3.scale.linear().domain(domainX).range([0, width]);
      dy = d3.scale.linear().domain(domainY).range([height, 0]);
      dy2 = d3.scale.linear().domain(domainY).range([0, height]);
      line = d3.svg.line().interpolate("basis").x(function(d) {
        return dx(d.x);
      }).y(function(d) {
        return dy(d.y);
      });
      $svg = d3.selectAll(this).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      $svg.append("svg:rect").attr("class", "box").attr("width", width).attr("height", height);
      _fn = function(i) {
        var c_data, r_data;
        r_data = d3.range(2).map(function(idx) {
          return {
            x: i,
            y: idx * num
          };
        });
        c_data = d3.range(2).map(function(idx) {
          return {
            x: idx * num,
            y: i
          };
        });
        $svg.append("path").datum(r_data).attr("class", "line").attr("d", line);
        return $svg.append("path").datum(c_data).attr("class", "line").attr("d", line);
      };
      for (i = 0; 0 <= num ? i < num : i > num; 0 <= num ? i++ : i--) {
        _fn(i);
      }
      dw = width / num;
      dh = height / num;
      _results = [];
      for (i = 0, _len = data.length; i < _len; i++) {
        data_i = data[i];
        _results.push((function(data_i, i) {
          var className, px, py, type;
          type = data_i.type;
          className = type;
          className === "ghost" && (className += data_i.ghost.toString());
          px = dx(i % num);
          py = dy2(_Math.floor(i / num));
          return $svg.append("svg:rect").attr("class", className).attr("x", px).attr("y", py).attr("width", dw).attr("height", dh);
        })(data_i, i));
      }
      return _results;
    };
  });

}).call(this);
