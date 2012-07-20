define([
    "basic_cell",
    "role_cell",
    "food_cell",
    "enemy_cell",
    "display"
], (BASIC, ROLE, FOOD, ENEMY, DISPLAY) ->
    console.log("cells_view")
    _Math = Math
    cell_model = {
        empty: BASIC,
        role: ROLE,
        food: FOOD,
        enemy: ENEMY
    }

    SCENE = Backbone.View.extend({
        initialize: (params) ->
            params = if (params) then (params) else ({})
            @num = if (params.num) then (params.num) else (25)
            @cellSet = ((_num) ->
                _cluster = [{ # 以後換成適當的分類rule
                    name: "role",
                    num : 7
                }]  # empty, role
                _empties = _num
                _cluster.map((set_i) ->
                    set_i.rate = set_i.num / _num
                    _empties -= set_i.num
                )
                _cluster.push({
                    name: "empty",
                    num: _empties,
                    rate: (_empties / _num)
                })
                _cluster = _cluster.sort((a, b) ->
                    a.num - b.num
                )
                _cluster
            )(@num)
            _base = 0
            @cellSet.map((set_i) ->
                set_i.rate += _base
                _base = set_i.rate
            )
            @cells = @set(@cellSet)
            _num = @num
            _cells = @cells
            $("#plant").showD3({
                w: 200,
                h: 200,
                num: _Math.ceil(_Math.sqrt(_num)),
                data: _cells
            })
            @
        "events": {
            "click #reset": "reset"
        }
        render: () ->
            @
        remove: () ->
            @


        reset: () ->
            console.log("click")
            @cells = @set(@cellSet)
            _num = @num
            _cells = @cells
            $("#plant").html("").showD3({
                w: 200,
                h: 200,
                num: _Math.ceil(_Math.sqrt(_num)),
                data: _cells
            })
        set: (cellset) ->
            _num = @num
            _Math = Math
            cells = []
            for i in [0..._num]
                _rnd = _Math.random()
                cell_i = null
                cellset.map((set_i, idx) ->
                    _low = 0
                    (idx && (_low = cellset[idx - 1].rate))
                    _high = set_i.rate
                    (((_rnd - _low) * (_rnd - _high) <= 0) && (
                        cell_i = new cell_model[set_i.name]({
                            position: i
                        })
                    ))
                )
                cells.push(cell_i)
            cells
        clear: () ->
            @cells = []
            @
        start: () ->
            @
        stop: () ->
            @
    })

    SCENE
)

