define([
    "basic_cell"
    "rule"
], (BASIC_CELL, RULE) ->
    console.log("role_cell")
    #console.log(RULE)
    _Math = Math
    chkbyNei = (thisCell, current, cells, c_size) ->
        position = thisCell.position
        thisCell.lifecycle++
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
        chk_row = [0, -1, 1]
        delta.map((delta_i, idx)->
            nei_pos = position + delta_i
            row = _Math.floor(nei_pos / c_size)
            if (!(row - this_row - chk_row[_Math.floor((idx + 1) / 3)]))
                cell_nei = current[nei_pos]
                (!!cell_nei && cell_nei.type == "role" && (
                    bedead++
                ))
        )

        bedead

    _baseFn = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.c_size)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true

        rule_desc = opts.desc
        cond = rule_desc[0]
        if (thisCell.type != "ghost")
            chk = if (cond) then (cond.test(bedead)) else (false)
            (!chk && rule_desc[2] > 0 && (
                cells[position].type = "ghost"
            ))

        ((thisCell.type == "ghost") && (
            cells[position].ghost++
            _stable = false
        ))

        (((!chk && !rule_desc[2]) ||
        (rule_desc[2] > 0 && cells[position].ghost >= rule_desc[2])) && (
            cells[position] = new EMPTY({
                position: position
            })
            #_stable = (_origin_type == "empty")
            _stable = false
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
            _rule = RULE
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
                (!!_rule[mode] && (
                    opts.desc = _rule[mode]
                    result = _baseFn(@, current, cells, opts)
                ))
            result

    ROLE
)
