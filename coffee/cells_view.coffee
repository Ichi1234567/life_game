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
            @num = if (params.num) then (params.num) else (64)
            @cellSet = ((_num) ->
                _cluster = [{ # 以後換成適當的分類rule
                    name: "role",
                    num : 15
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
            @w = if (params.w) then (params.w) else (300)
            @h = if (params.h) then (params.h) else (300)
            #$("#plant").showD3({
            #    w: @w,
            #    h: @h,
            #    num: _Math.ceil(_Math.sqrt(_num)),
            #    data: _cells
            #})
            _w = @w
            _h = @h
            @current = 0
            $(".plant").each(() ->
                $(this).showD3({
                    w: _w,
                    h: _h,
                    num: _Math.ceil(_Math.sqrt(_num)),
                    data: _cells
                })
            )
            _saveWorker = new Worker("javascript/saveCurrent.js")
            @saveWorker = _saveWorker
            _this = @
            _saveWorker.onmessage = (e) ->
                _this.state = e.data

            _saveWorker.postMessage(@cells)
            @
        "events": {
            "click #reset": "reset"
            "click #next": "next"
        }
        render: () ->
            @
        remove: () ->
            @


        reset: () ->
            #console.log("click")
            @cells = @set(@cellSet)
            _num = @num
            _cells = @cells
            _w = @w
            _h = @h
            _current = @current
            $(".plant").each((idx, elm) ->
                _chk = idx - _current
                ((_chk) && $(elm).html("").showD3({
                    w: _w,
                    h: _h,
                    num: _Math.ceil(_Math.sqrt(_num)),
                    data: _cells
                }).css("display", "block"))
                ((!_chk) && $(elm).css("display", "none"))
            )
            @current = (_current + 1) % 2
            @

        next: () ->
            #console.log("click next")
            _current = @current
            _cells = @cells
            _num = @num
            _state = @state
            #_cells = _cells[0].move(_cells, "twotwo")
            _stable = true
            mode = $("#mode option:selected").val()
            for i in [0..._num]
                result = ((i, cells)->
                    #cells[i].move(cells, "twotwo")
                    cells[i].move(_state, cells, mode, {
                        EMPTY: BASIC,
                        ROLE: ROLE,
                        FOOD: FOOD,
                        ENEMY: ENEMY
                    })
                )(i, _cells)
                (!result.stable && (_stable = false))
                cells = result.cells
            @cells = _cells
            _w = @w
            _h = @h
            #console.log(_stable)
            @saveWorker.postMessage(@cells)
            _state = @state
            if (!_stable)
                $(".plant").each((idx, elm) ->
                    _chk = idx - _current
                    ((_chk) && $(elm).updateD3(_cells).css("display", "block"))
                    ((!_chk) && $(elm).css("display", "none"))
                    )
            @current = (_current + 1) % 2


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

