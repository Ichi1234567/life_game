define([
    "rule"
], (RULE) ->
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
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        _stable = true

        rule_desc = opts.desc
        cond = rule_desc[1]
        chk = if (cond) then (cond.test(bedead)) else (false)

        ((chk) && (
            cells[position] = new ROLE({
                position: position
            })
            #_stable = (_origin_type == "role")
            _stable = false
        ))

        {
            cells: cells
            stable: _stable
        }

    ####################################################
    console.log("basic_cell")
    MODEL = Backbone.Model.extend({
        initialize: (params) ->
            @type = "empty"
            @visited = if (params.visited) then (true) else (false)
            @delay = 0
            @lifecycle = 0
            @position = params.position
            @ghost = 0
            @

        constructor: (params) ->
            @type = "empty"
            @visited = if (params.visited) then (true) else (false)
            @delay = 0
            @lifecycle = 0
            @position = params.position
            @ghost = 0
            @

        getData: () ->
            {
                type: @type,
                delay: @delay,
                position: @position,
                ghost: @ghost,
                lifecycle: @lifecycle
            }

        move: (current, cells, mode, opts) ->
            opts = if (opts) then (opts) else ({})
            opts.num = cells.length
            _rule = RULE
            result = {
                cells: cells,
                stable: true
            }

            (!!_rule[mode] && (
                opts.desc = RULE[mode]
                result = _baseFn(@, current, cells, opts)
            ))
            result
    })

    MODEL
)
