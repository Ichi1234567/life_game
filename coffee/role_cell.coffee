define([
    "basic_cell"
    "rule"
], (BASIC_CELL, RULE) ->
    console.log("role_cell")
    console.log(RULE)
    _Math = Math
    chkbyNei = (thisCell, current, cells, num) ->
        position = thisCell.position
        thisCell.lifecycle++
        c_size = _Math.sqrt(num)
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
        bedead = 0
        delta.map((delta_i, idx)->
            abs_delta_i = _Math.abs(delta_i)
            switch true
                when (abs_delta_i < 2)
                    chk_row = 0
                when (delta_i > 0)
                    chk_row = 1
                when (delta_i < 0)
                    chk_row = -1

            nei_pos = position + delta_i
            row = _Math.floor(nei_pos / c_size)
            if ((row - this_row) == chk_row)
                cell_nei = current[nei_pos]
                if (!!cell_nei && cell_nei.type == "role")
                    ghost_i = cell_nei.ghost
                    ((typeof ghost_i == "number" && !ghost_i) && (bedead++))
        )
        ((thisCell.type == "role") && (bedead--))

        bedead

    _baseFn = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true

        rule_desc = opts.desc
        rule_nei = rule_desc[0]
        i = rule_nei.length
        chk = false
        while(i)
            (bedead == rule_nei[--i] && (
                chk = true
                i = 0
            ))
        (!chk && rule_desc[2] > 0 && (
            cells[position].type = "ghost"
        ))

        ((cells[position].type == "ghost") && (
            cells[position].ghost++
            _stable = false
        ))

        (((!chk && rule_desc[2] < 0) ||
        (rule_desc[2] > 0 && cells[position].ghost >= rule_desc[2])) && (
            cells[position] = new EMPTY({ position: position })
            _stable = (_origin_type == "empty")
        ))
        
        {
            cells: cells
            stable: _stable
        }

    ####################################################
    class ROLE extends BASIC_CELL
        constructor: (params) ->
            super(params)
            @type = "role"
            @delay = "2"

            if (!!params.dying)
                _dying = params.dying
                _measure_num = _Math.random()
                #_const = if (_dying < 10) then ((100 - _dying * _dying) / 1000) else (-_dying * _dying / 10000)
                #base_measure = 0.70 * (1 - _dying / 20 - _const)
                _const = _Math.sin((_dying / 21) * _Math.PI)
                base_measure = 0.70 - _const
                base_measure = _Math.max(_const, base_measure)

                (_measure_num > base_measure && (
                    _measure_num = _Math.round(_Math.random() * (_dying - 2) + 1)
                    @type = "ghost"
                    @ghost = _measure_num
                ))
            @

        move: (current, cells, mode, opts) ->
            opts = if (opts) then (opts) else ({})
            opts.num = cells.length
            opts.rule = RULE
            is_delay = if (opts.delay) then (true) else (false)
            delete opts.delay
            result = {
                cells: cells,
                stable: true
            }

            if (is_delay && @lifecycle < @delay)
                @lifecycle++
            else
                @lifecycle = 0
                #result = super(current, cells, mode, opts)
                if (!!RULE[mode])
                    opts.desc = RULE[mode]
                    result = _baseFn(@, current, cells, opts)

            result

    ROLE
)
