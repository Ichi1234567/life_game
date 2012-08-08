define([
    "rule"
], (RULE) ->
    #console.log(RULE)
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
        delta.map((delta_i)->
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
            if (!(row - this_row - chk_row))
                cell_nei = current[nei_pos]
                if (!!cell_nei && cell_nei.type == "role")
                    bedead++
        )

        bedead

    _baseFn = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        _stable = true


        rule_desc = opts.desc
        rule_nei = rule_desc[1]
        i = rule_nei.length
        chk = false
        while(i)
            (bedead == rule_nei[--i] && (
                chk = true
                i = 0
            ))

        ((chk) && (
            cells[position] = new ROLE({ position: position })
            _stable = (_origin_type == "role")
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
            @visited = false
            @delay = 0
            @lifecycle = 0
            @position = params.position
            @ghost = 0
            @

        constructor: (params) ->
            @type = "empty"
            @visited = false
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
            #(opts.rule && (
            #    _rule = opts.rule
            #    delete opts.rule
            #))

            result = {
                cells: cells,
                stable: true
            }
            if (!@visited && !!_rule[mode])
                opts.desc = RULE[mode]
                result = _baseFn(@, current, cells, opts)
            result
    })

    MODEL
)
