define([], () ->
    console.log("rule")
    _rules = {
        assimilation: "4567/345/",
        conway:       "23/3/",
        flakes:       "012345678/3/",
        logic:        "/2/",
        maze:         "12345/3/",
        replicator:   "1357/1357/",
        twoxtwo:      "125/36/",

        ########################################################

        banners:         "2367/3457/5",
        belzhab:         "23/23/8",
        brainbrain:      "/2/3",
        ebbflow:         "012478/36/16",
        fireworks:       "2/13/19",
        flaming_starbow: "347/23/6",
        frozen_spirals:  "356/23/6",
        rake:            "3467/2678/4",
        soft_freeze:     "13458/38/6",
        spirals:         "2/234/3",
        star_wars:       "345/2/4"
    }

    _parseInt = window.parseInt
    ((_rules) ->
        result = {}
        for i, rule_i of _rules
            rule_i = rule_i.split("/")
            tmp = []
            for j in [0...3]
                rule_ij = rule_i[j]
                if !rule_ij.length
                    tmp.push(-1)
                    continue
                switch j
                    when (0), (1)
                        tmp.push(((rule_ij) ->
                            rule_ij = rule_ij.split("")
                            rule_ij.map((val) ->
                                _parseInt(val)
                            )
                        )(rule_ij))
                    when (2)
                        tmp.push(_parseInt(rule_ij))
            result[i] = tmp
        result
    )(_rules)
)
