define([
    "basic_cell"
], (BASIC_CELL) ->
    console.log("role_cell")
    _Math = Math
    chkbyNei = (thisCell, current, cells, num) ->
        position = thisCell.position
        thisCell.lifecycle++
        c_size = _Math.sqrt(num)
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
            nei_pos = position + delta_i
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
        switch (bedead)
            when (1), (2), (5)
                _stable = true
            else
                _stable = _origin_type == "empty"
                cells[position] = new EMPTY({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }

    _conway = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        switch (bedead)
            when (2), (3)
                _stable = true
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
        switch (bedead)
            when (1), (2), (3), (4), (5)
                _stable = true
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
        switch (bedead)
            when (1), (3), (5), (7)
                _stable = true
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
        cells[position].type = "ghost"
        cells[position].ghost++
        (cells[position].ghost == 2 && (
            cells[position] = new EMPTY({
            position: position
            })
        ))
        
        {
            cells: cells
            stable: false
        }


    _banners = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        switch (bedead)
            when (2), (3), (6), (7) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && cells[position].ghost++)

        (cells[position].ghost == 6 && (
            cells[position] = new EMPTY({
            position: position
            })
        ))
        
        {
            cells: cells
            stable: false
        }


    _ebbflow = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        switch (bedead)
            when (0), (1), (2), (4), (7), (8) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && cells[position].ghost++)

        (cells[position].ghost == 17 && (
            cells[position] = new EMPTY({
            position: position
            })
        ))
        
        {
            cells: cells
            stable: false
        }

    _fireworks = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        switch (bedead)
            when (2) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && cells[position].ghost++)

        (cells[position].ghost == 20 && (
            cells[position] = new EMPTY({
            position: position
            })
        ))
        
        {
            cells: cells
            stable: false
        }


    _rake = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        switch (bedead)
            when (3), (4), (6), (7) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && cells[position].ghost++)

        (cells[position].ghost == 5 && (
            cells[position] = new EMPTY({
            position: position
            })
        ))
        
        {
            cells: cells
            stable: false
        }


    _spirals = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        EMPTY = opts.EMPTY
        _origin_type = thisCell.type
        switch (bedead)
            when (2) then
            else
                cells[position].type = "ghost"

        (cells[position].type == "ghost" && cells[position].ghost++)

        (cells[position].ghost == 4 && (
            cells[position] = new EMPTY({
            position: position
            })
        ))
        
        {
            cells: cells
            stable: false
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
            super
            @type = "role"
            @speed = "2"

        move: (current, cells, mode, opts) ->
            opts.rule = RULE
            super(current, cells, mode, opts)

    ROLE
)
