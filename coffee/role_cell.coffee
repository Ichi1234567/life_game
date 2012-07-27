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


    ####################################################
    _twoxtwo = (thisCell, current, cells, opts) ->
        #console.log(thisCell)
        #console.log(cells)
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (1), (2), (5) then
            else
                cells[position] = new EMPTY({
                    position: position
                })
                _stable = _origin_type == "empty"
        
        {
            cells: cells
            stable: _stable
        }

    _conway = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (2), (3) then
            else
                _stable = _origin_type == "empty"
                cells[position] = new EMPTY({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }

    _flakes = (thisCell, current, cells, opts) ->
        {
            cells: cells
            stable: true
        }

    _maze = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (1), (2), (3), (4), (5) then
            else
                _stable = _origin_type == "empty"
                cells[position] = new EMPTY({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }

    _replicator = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (1), (3), (5), (7) then
            else
                _stable = _origin_type == "empty"
                cells[position] = new EMPTY({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }

    _logic = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = _origin_type == "empty"
        cells[position] = new EMPTY({
            position: position
        })
        
        {
            cells: cells
            stable: _stable
        }


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
        (cells[position].ghost == 2 && (
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
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (2), (3), (6), (7) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && (
            cells[position].ghost++
            _stable = false
        ))

        (cells[position].ghost == 6 && (
            cells[position] = new EMPTY({
            position: position
            })
            _stable = _origin_type == "empty"
        ))
        
        {
            cells: cells
            stable: _stable
        }


    _ebbflow = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (0), (1), (2), (4), (7), (8) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && (
            cells[position].ghost++
            _stable = false
        ))

        (cells[position].ghost == 17 && (
            cells[position] = new EMPTY({
            position: position
            })
            _stable = _origin_type == "empty"
        ))
        
        {
            cells: cells
            stable: _stable
        }

    _fireworks = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (2) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && (
            cells[position].ghost++
            _stable = false
        ))

        (cells[position].ghost == 20 && (
            cells[position] = new EMPTY({
            position: position
            })
            _stable = _origin_type == "empty"
        ))
        
        {
            cells: cells
            stable: _stable
        }


    _rake = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (3), (4), (6), (7) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && (
            cells[position].ghost++
            _stable = false
        ))

        (cells[position].ghost == 5 && (
            cells[position] = new EMPTY({
            position: position
            })
            _stable = _origin_type == "empty"
        ))
        
        {
            cells: cells
            stable: _stable
        }


    _spirals = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        _stable = true
        switch (bedead)
            when (2) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && (
            cells[position].ghost++
            _stable = false
        ))

        (cells[position].ghost == 4 && (
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
    RULE = {
        twoxtwo: _twoxtwo,
        conway: _conway,
        flakes: _flakes,
        maze: _maze,
        replicator: _replicator,
        logic: _logic,

        #########################
        brainbrain: _brainbrain,
        banners: _banners,
        ebbflow: _ebbflow,
        fireworks: _fireworks,
        rake: _rake,
        spirals: _spirals
    }

    ####################################################
    class ROLE extends BASIC_CELL
        constructor: (params) ->
            super(params)
            @type = "role"
            @speed = "2"

            if (!!params.dying)
                _dying = params.dying
                _measure_num = _Math.random()
                _const = if (_dying < 10) then ((100 - _dying * _dying) / 1000) else (-_dying * _dying / 10000)
                base_measure = 0.70 * (1 - _dying / 20 - _const)
                (_measure_num > base_measure && (
                    _measure_num = _Math.round(_Math.random() * (_dying - 1) + 1)
                    ((_measure_num) && (
                        @type = "ghost"
                        @ghost = _measure_num
                    ))
                ))
            @

        move: (current, cells, mode, opts) ->
            opts.rule = RULE
            super(current, cells, mode, opts)

    ROLE
)
