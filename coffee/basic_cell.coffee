define([
], () ->
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
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (3), (6)
                _stable = _origin_type == "role"
                cells[position] = new ROLE({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }

    _conway = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (3)
                _stable = _origin_type == "role"
                cells[position] = new ROLE({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }

    _flakes = _conway
    _maze = _conway

    _replicator = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (1), (3), (5), (7)
                _stable = _origin_type == "role"
                cells[position] = new ROLE({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }

    _logic = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (2)
                _stable = _origin_type == "role"
                cells[position] = new ROLE({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }


        ####################################
        # there's ghost state

    _brainbrain = _logic

    _banners = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (3), (4), (5), (7)
                _stable = (_origin_type == "role") && (!thisCell.ghost)
                cells[position] = new ROLE({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }

    _ebbflow = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (3), (6)
                _stable = (_origin_type == "role") && (!thisCell.ghost)
                cells[position] = new ROLE({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }


    _fireworks = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (1), (3)
                _stable = (_origin_type == "role") && (!thisCell.ghost)
                cells[position] = new ROLE({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }


    _rake = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (2), (6), (7), (8)
                _stable = (_origin_type == "role") && (!thisCell.ghost)
                cells[position] = new ROLE({
                    position: position
                })
        
        {
            cells: cells
            stable: _stable
        }


    _spirals = (thisCell, current, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, current, cells, opts.num)
        ROLE = opts.ROLE
        _origin_type = thisCell.type
        switch (bedead)
            when (2), (3), (4)
                _stable = (_origin_type == "role") && (!thisCell.ghost)
                cells[position] = new ROLE({
                    position: position
                })
        
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

        ###############
        brainbrain: _brainbrain,
        banners: _banners,
        ebbflow: _ebbflow,
        fireworks: _fireworks,
        rake: _rake,
        spirals: _spirals
    }

    ####################################################
    console.log("basic_cell")
    MODEL = Backbone.Model.extend({
        initialize: (params) ->
            @type = "empty"
            @speed = 0
            @lifecycle = 0
            @position = params.position
            @ghost = 0
            @

        constructor: (params) ->
            @type = "empty"
            @speed = 0
            @lifecycle = 0
            @position = params.position
            @ghost = 0
            @

        getData: () ->
            {
                type: @type,
                speed: @speed,
                position: @position,
                ghost: @ghost,
                lifecycle: @lifecycle
            }

        move: (current, cells, mode, opts) ->
            opts = if (opts) then (opts) else ({})
            opts.num = cells.length
            _rule = RULE
            (opts.rule && (
                _rule = opts.rule
                delete opts.rule
            ))

            if (typeof _rule[mode] != "function")
                return {
                    cells: cells,
                    stable: true
                }
            result = _rule[mode](@, current, cells, opts)
    })

    MODEL
)
