(function() {

  define([], function() {
    var _parseInt, _rules;
    console.log("rule");
    _rules = {
      assimilation: "4567/345/",
      conway: "23/3/",
      flakes: "012345678/3/",
      logic: "/2/",
      maze: "12345/3/",
      replicator: "1357/1357/",
      twoxtwo: "125/36/",
      banners: "2367/3457/5",
      belzhab: "23/23/8",
      brainbrain: "/2/3",
      ebbflow: "012478/36/16",
      fireworks: "2/13/19",
      flaming_starbow: "347/23/6",
      frozen_spirals: "356/23/6",
      rake: "3467/2678/4",
      soft_freeze: "13458/38/6",
      spirals: "2/234/3",
      star_wars: "345/2/4"
    };
    _parseInt = window.parseInt;
    return (function(_rules) {
      var i, j, result, rule_i, rule_ij, tmp;
      result = {};
      for (i in _rules) {
        rule_i = _rules[i];
        rule_i = rule_i.split("/");
        tmp = [];
        for (j = 0; j < 3; j++) {
          rule_ij = rule_i[j];
          if (!rule_ij.length) {
            tmp.push(-1);
            continue;
          }
          switch (j) {
            case 0.:
            case 1.:
              tmp.push((function(rule_ij) {
                rule_ij = rule_ij.split("");
                return rule_ij.map(function(val) {
                  return _parseInt(val);
                });
              })(rule_ij));
              break;
            case 2.:
              tmp.push(_parseInt(rule_ij));
          }
        }
        result[i] = tmp;
      }
      return result;
    })(_rules);
  });

}).call(this);
