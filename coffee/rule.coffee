define([], () ->
    console.log("rule")
    _rules = {
        amoeba:       "1358/357/",
        assimilation: "4567/345/",
        coagulations: "235678/378/",
        conway:       "23/3/",
        coral:        "45678/3/",
        dayNnight:    "34678/3678/",
        diamoeba:     "5678/35678/",
        flakes:       "012345678/3/",
        gnarl:        "1/1/",
        highlife:     "23/36/",
        longlife:     "5/345/",
        logic:        "/2/",
        maze:         "12345/3/",
        mazectric:    "1234/3/",
        move:         "245/368/",
        pseudo_life:  "238/357/",
        replicator:   "1357/1357/",
        serviettes:   "/234/",
        stains:       "235678/3678/",
        twoxtwo:      "125/36/",
        threefour:    "34/34/",
        walledcities: "2345/45678/",

        ########################################################

        banners:         "2367/3457/5",
        belzhab:         "23/23/8",
        brainbrain:      "/2/3",
        ebbflow:         "012478/36/16",
        fireworks:       "2/13/19",
        flaming_starbow: "347/23/6",
        frozen_spirals:  "356/23/6",
        inverselife:     "34678/0123478/2",
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
                    tmp.push(false)
                    continue
                switch j
                    when (0), (1)
                        tmp.push(((rule_ij) ->
                            rule_ij = new RegExp("[" + rule_ij + "]+")
                        )(rule_ij))
                    when (2)
                        tmp.push(_parseInt(rule_ij))
            result[i] = tmp
        result
    )(_rules)
)
