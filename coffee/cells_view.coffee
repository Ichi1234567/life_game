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

    ROUTINES = {
        evalSet: (num, ghost_num, opts) ->
            ghost_num = if (ghost_num) then (ghost_num) else (0)
            _base = 0.27
            switch ghost_num
                when (0) then
                else
                    _base *= (1 + ghost_num / 40)

            _Math.round(num * _base)

        sortSets: (sets, opts) ->
            _num = opts.num
            _empty = _num
            sets.forEach((elm, idx) ->
                _empty -= elm.num
            )
            sets.push({
                name: "empty",
                num: _empty
            })
            sets = sets.sort((a, b) ->
                a.num - b.num
            )

            count = 0
            sets = sets.map((set_i) ->
                count += set_i.num
                set_i.rate = count / _num
                set_i
            )
            sets
        generateSets: (totalNum, opts) ->
            opts = if (opts) then (opts) else ({})
            _types = if (opts.types) then (opts.types) else (["role"])
            _ghost = if (opts.ghost) then (opts.ghost) else (0)
            tmp_sets = _types.map((type_i) ->
                num = ROUTINES.evalSet(totalNum, _ghost)
                {
                    name: type_i
                    num: num
                }
            )
            sets = ROUTINES.sortSets(tmp_sets, {
                num: totalNum
            })
            sets
    }

    SCENE = Backbone.View.extend({
        initialize: (params) ->
            params = if (params) then (params) else ({})
            @num = if (params.num) then (params.num) else (64)
            @cellSet = ROUTINES.generateSets(@num)
            @cells = @set(@cellSet)
            _num = @num
            _cells = @cells
            @w = if (params.w) then (params.w) else (300)
            @h = if (params.h) then (params.h) else (300)
            _w = @w
            _h = @h
            @current = 0
            $(".plant").each((idx) ->
                $(this).showD3({
                    w: _w,
                    h: _h,
                    num: _Math.ceil(_Math.sqrt(_num)),
                    data: _cells
                })
                (idx && $(this).css("top", -(_h + 5)))
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
            "change #rnd_ghost": "chk_rnd_ghost"
            "change #mode": "chg_mode"
        }
        render: () ->
            @
        remove: () ->
            @


        chk_rnd_ghost: () ->
            _rule = $("#mode option:selected").html().split("/")
            if (_rule[2].length && _rule[2] != " ")
                @cellSet = ROUTINES.generateSets(@num, {
                    ghost: parseInt(_rule[2])
                })
                @reset()
            @
        chg_mode: () ->
            _rule = $("#mode option:selected").html().split("/")
            _chk_ghost = !!$("#rnd_ghost").attr("checked")
            _ghost = if (_chk_ghost && _rule[2].length && _rule[2] != " ") then (parseInt(_rule[2])) else (0)
            @cellSet = ROUTINES.generateSets(@num, {
                ghost: _ghost
            })
            @reset()
            @

        reset: () ->
            #console.log("click")
            @cells = @set(@cellSet)
            _num = @num
            _cells = @cells
            _w = @w
            _h = @h
            _current = @current
            @saveWorker.postMessage(_cells)
            $(".plant").each((idx, elm) ->
                _chk = idx - _current
                ((_chk) && $(elm).html("").showD3({
                    w: _w,
                    h: _h,
                    num: _Math.ceil(_Math.sqrt(_num)),
                    data: _cells
                }).css("visibility", "visible"))
                ((!_chk) && $(elm).css("visibility", "hidden"))
                true
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
                    ((_chk) && $(elm).updateD3(_cells).css("visibility", "visible"))
                    ((!_chk) && $(elm).css("visibility", "hidden"))
                    true
                )
            @current = (_current + 1) % 2


        set: (cellset) ->
            _num = @num
            _Math = Math
            cells = []
            _rnd_ghost = !!$("#rnd_ghost").attr("checked")
            _rule = $("#mode option:selected").html().split("/")
            _dying_const = 0
            if (_rnd_ghost && _rule[2].length and _rule[2] != " ")
                _dying_const = parseInt(_rule[2])
            for i in [0..._num]
                _rnd = _Math.random()
                cell_i = null
                cellset.map((set_i, idx) ->
                    _low = 0
                    (idx && (_low = cellset[idx - 1].rate))
                    _high = set_i.rate
                    (((_rnd - _low) * (_rnd - _high) <= 0) && (
                        cell_i = new cell_model[set_i.name]({
                            position: i,
                            dying: _dying_const
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

