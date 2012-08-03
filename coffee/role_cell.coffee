define([
    "basic_cell"
], (BASIC_CELL) ->
    console.log("role_cell")
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

        rule_desc = (opts.desc).split("/")
        rule_nei = rule_desc[0].split("")
        i = rule_nei.length
        chk = false
        while(i)
            (bedead == parseInt(rule_nei[--i]) && (
                chk = true
                i = 0
            ))
        (!chk && rule_desc[2].length && (
            cells[position].type = "ghost"
        ))

        (cells[position].type == "ghost" && (
            cells[position].ghost++
            _stable = false
        ))

        (((!chk && !rule_desc[2].length) ||
        (cells[position].ghost >= parseInt(rule_desc[2]))) && (
            cells[position] = new EMPTY({
                position: position
            })
            _stable = _origin_type == "empty"
        ))
        
        {
            cells: cells
            stable: _stable
        }

    ####################################################
    _twoxtwo = (thisCell, current, cells, opts) ->
        opts.desc = "125/36/"
        _baseFn(thisCell, current, cells, opts)

    _conway = (thisCell, current, cells, opts) ->
        opts.desc = "23/3/"
        _baseFn(thisCell, current, cells, opts)

    _flakes = (thisCell, current, cells, opts) ->
        {
            cells: cells
            stable: true
        }

    _maze = (thisCell, current, cells, opts) ->
        opts.desc = "12345/3/"
        _baseFn(thisCell, current, cells, opts)

    _replicator = (thisCell, current, cells, opts) ->
        opts.desc = "1357/1357/"
        _baseFn(thisCell, current, cells, opts)

    _logic = (thisCell, current, cells, opts) ->
        position = thisCell.position
        EMPTY = opts.EMPTY
        cells[position] = new EMPTY({
            position: position
        })
        
        {
            cells: cells
            stable: false
        }

    _assimilation = (thisCell, current, cells, opts) ->
        opts.desc = "4567/345/"
        _baseFn(thisCell, current, cells, opts)


        ####################################
        # there's ghost state

    _brainbrain = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        #_stable = _origin_type == "ghost"
        _stable = true
        cells[position].type = "ghost"
        cells[position].ghost++
        (cells[position].ghost >= 3 && (
            _stable = _origin_type == "empty"
            cells[position] = new EMPTY({
            position: position
            })
        ))
        
        {
            cells: cells
            stable: _stable
        }


    _banners = (thisCell, current, cells, opts) ->
        opts.desc = "2367/3457/5"
        _baseFn(thisCell, current, cells, opts)


    _ebbflow = (thisCell, current, cells, opts) ->
        opts.desc = "012478/36/16"
        _baseFn(thisCell, current, cells, opts)

    _fireworks = (thisCell, current, cells, opts) ->
        opts.desc = "2/13/19"
        _baseFn(thisCell, current, cells, opts)

    _rake = (thisCell, current, cells, opts) ->
        opts.desc = "3467/2678/4"
        _baseFn(thisCell, current, cells, opts)

    _spirals = (thisCell, current, cells, opts) ->
        opts.desc = "2/234/3"
        _baseFn(thisCell, current, cells, opts)

    _star_wars = (thisCell, current, cells, opts) ->
        opts.desc = "345/2/4"
        _baseFn(thisCell, current, cells, opts)

    _soft_freeze = (thisCell, current, cells, opts) ->
        opts.desc = "13458/38/6"
        _baseFn(thisCell, current, cells, opts)

    _frozen_spirals = (thisCell, current, cells, opts) ->
        opts.desc = "356/23/6"
        _baseFn(thisCell, current, cells, opts)

    _belzhab = (thisCell, current, cells, opts) ->
        opts.desc = "23/23/8"
        _baseFn(thisCell, current, cells, opts)

    _flaming_starbow = (thisCell, current, cells, opts) ->
        opts.desc = "347/23/6"
        _baseFn(thisCell, current, cells, opts)


    ####################################################
    RULE = {
        twoxtwo: _twoxtwo,
        conway: _conway,
        flakes: _flakes,
        maze: _maze,
        replicator: _replicator,
        logic: _logic,
        assimilation: _assimilation,

        #########################
        brainbrain: _brainbrain,
        banners: _banners,
        ebbflow: _ebbflow,
        fireworks: _fireworks,
        rake: _rake,
        spirals: _spirals,
        star_wars: _star_wars,
        soft_freeze: _soft_freeze,
        frozen_spirals: _frozen_spirals,
        belzhab: _belzhab,
        flaming_starbow: _flaming_starbow
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
                result = super(current, cells, mode, opts)

            result

    ROLE
)
