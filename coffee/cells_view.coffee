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
    global_timmer = null
    global_count = 0
    prev_status = null
    Frames = 0
    UpdateTime = 1000
    LastTime = new Date()
    Fps = 0

    window.requestAnimationFrame = (() ->
        (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            #function FrameRequestCallback, DOMElement Element 
            (callback, element) ->
                window.setTimeout( callback, 1000 / 60 )
        )
    )()

    window.cancelRequestAnimFrame = (() ->
        (
            window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout
        )
    )()


    ROUTINES = {
        evalSet: (num, ghost_num, opts) ->
            ghost_num = if (ghost_num) then (ghost_num) else (0)
            _base = if (opts.base) then (opts.base) else (0.27)
            _type = if (opts.type) then (opts.type) else ("role")
            _avgSB = if (opts.avgSB) then (opts.avgSB) else (0)
            # 先算base
            _base *= _Math.cos(_avgSB / 9)
            # 用ghost調整
            switch ghost_num
                when (0) then
                else
                    _base *= (1 + ghost_num / 40)
            #console.log("ori-base：" + _base)
            #console.log("_avg：" + _avgSB)
            #console.log("base：" + _base)

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
            _base = if (opts.base) then (opts.base) else (0.27)
            _avgSB = if (opts.avgSB) then (opts.avgSB) else (0)
            tmp_sets = _types.map((type_i) ->
                num = ROUTINES.evalSet(totalNum, _ghost, {
                    base: _base,
                    type: type_i
                    avgSB: _avgSB
                })
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
            @w = if (params.w) then (params.w) else (300)
            @h = if (params.h) then (params.h) else (300)
            _w = @w
            _h = @h
            @current = 0
            _saveWorker = new Worker("javascript/saveCurrent.js")
            @saveWorker = _saveWorker
            _this = @
            _saveWorker.onmessage = (e) ->
                _this.state = e.data

            $(".plant").eq(1).css("top", -(_h + 5))
            @chk_opts()
            @reset("init")
            @
        "events": {
            "click #reset": "click_reset"
            "click #next": "next"
            "click #auto-run": "auto_run"
            "change #mode": "chg_opts"
            "change #rnd_ghost": "chg_opts"
            "change #chk-delay": "chg_opts"
        }
        render: () ->
            @
        remove: () ->
            @


        auto_run: (e, status) ->
            _$target = $(e.target)
            if (!status)
                _running = !!(_$target.attr("class"))
                _$target.toggleClass("running")
            _view = @

            if (_running && !status)
                _stable = true
            else
                _$target.html("stop")
                _stable = false
                (global_timmer && cancelRequestAnimFrame(global_timmer))
                global_timmer = requestAnimationFrame(() ->
                    _view.auto_run(e, true)
                    _stable =_view.next()
                )

            if (_stable)
                _$target.html("auto-run")
                cancelRequestAnimFrame(global_timmer)
                global_timmer = null
            else
                curr_time = new Date()
                Frames++
                dt = curr_time.getTime() - LastTime.getTime()
                if (dt > UpdateTime)
                    _fps = _Math.round((Frames/dt) * UpdateTime)
                    Frames = 0
                    LastTime = curr_time
                    $("#fps").html(_fps)
            @
        chg_opts: (e) ->
            _$target = $(e.target)
            _rule = $("#mode option:selected").html().split("/")
            _is_auto_run = $("#auto-run").attr("class") == "running"
            switch (true)
                when (_$target.is("#mode"))
                    (_is_auto_run && $("#auto-run").trigger("click"))
                    @chk_opts()
                    @reset()
                when (_$target.is("#chk-delay"))
                    @chk_opts()
                when (_rule[2].length && _rule[2] != " ")
                    @chk_opts()
                    (!_is_auto_run && @reset())
            @
        click_reset: () ->
            _is_auto_run = $("#auto-run").attr("class") == "running"
            (_is_auto_run && $("#auto-run").trigger("click"))
            @reset()

        chk_opts: () ->
            _chk_delay = !!$("#chk-delay").attr("checked")
            _rule = $("#mode option:selected").html().split("/")
            sum = 0
            _len = 0
            for i in [0...2]
                ((i) ->
                    _rule[i].split("").forEach((val) ->
                        _val = parseInt(val)
                        (!isNaN(_val) && (sum += _val))
                    )
                    _len += _rule[i].length
                )(i)
            @cellSet = ROUTINES.generateSets(@num, {
                ghost: parseInt(_rule[2]),
                base: if (_chk_delay) then (0.2) else (0.27)
                #avgSB: _Math.round(sum / _len)
                avgSB: (_rule[0].length + _rule[1].length) / 2
            })
            @
        reset: (init) ->
            #console.log("click")
            global_count = 0
            @cells = @set(@cellSet)
            _num = @num
            _cells = @cells
            _w = @w
            _h = @h
            _current = @current
            @saveWorker.postMessage(_cells)
            $(".plant").each((idx, elm) ->
                _chk = idx - _current
                ((init || _chk) && $(elm).html("").showD3({
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
            _stable = true
            mode = $("#mode option:selected").val()
            _chk_delay = !!$("#chk-delay").attr("checked")

            cells_update = (total_cells, thisCell, state, mode, opts) ->
                position = thisCell.position
                c_size = _Math.sqrt(total_cells.length)
                this_row = _Math.floor(position / c_size)
                delta = [
                    1,
                    -1,
                    -c_size,
                    (-c_size + 1),
                    (-c_size - 1),
                    c_size,
                    (c_size + 1),
                    (c_size - 1)
                ]
                chk_row = [0, -1, 1]
                result = { stable: true }
                up_cells = [thisCell]
                delta.forEach((delta_i, idx)->
                    nei_pos = position + delta_i
                    row = _Math.floor(nei_pos / c_size)
                    if (!(row - this_row - chk_row[_Math.floor((idx + 1) / 3)]))
                        cell_nei = total_cells[nei_pos]
                        (cell_nei && !cell_nei.visited && up_cells.push(cell_nei))
                )
                #console.log(up_cells)

                up_cells.forEach((cell) ->
                    position = cell.position
                    tmp = cell.move(state, total_cells, mode, opts)
                    total_cells = tmp.cells
                    (!tmp.stable && (result.stable = false))
                    total_cells[position].visited = true
                )
                result.cells = total_cells
                result
            _args = {
                EMPTY: BASIC,
                ROLE: ROLE,
                FOOD: FOOD,
                ENEMY: ENEMY,
                delay: _chk_delay
            }

            for i in [0..._num]
                cell_i = _cells[i]
                if (!cell_i.visited && cell_i.type != "empty")
                    result = cells_update(_cells, cell_i, _state, mode, _args)
                    (!result.stable && (_stable = false))
                    _cells = result.cells
            @cells = _cells
            _w = @w
            _h = @h
            @saveWorker.postMessage(_cells)
            _state = @state
            if (!_stable)
                $(".plant").each((idx, elm) ->
                    _chk = idx - _current
                    ((_chk) && $(elm).updateD3(_cells).css("visibility", "visible"))
                    ((!_chk) && $(elm).css("visibility", "hidden"))
                    true
                )
            @current = (_current + 1) % 2
            (_stable && !prev_status && (prev_status = _stable))
            if (_stable && _stable == prev_status)
                global_count++
            else
                global_count = 0
                prev_status = null

            ((global_count == 10) && (
                global_count = 0
                prev_status = null
                _is_auto_reset = !!$("#auto-reset").attr("checked")
                _view = @
                (_is_auto_reset && _view.reset())
                _localTime = null
                (!_is_auto_reset && $("#auto-run").trigger("click"))
            ))
                        
            _stable


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
    })

    SCENE
)

