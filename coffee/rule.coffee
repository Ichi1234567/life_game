define([
], ()->
    console.log("rule")
    _Math = Math
    chkbyNei = (thisCell, cells, num) ->
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
            cell_nei = cells[nei_pos]
            if (!!cell_nei && cell_nei.type == "role")
                ghost_i = cell_nei.ghost
                ((typeof ghost_i == "number" && !ghost_i) && (bedead++))
        )
        ((thisCell.type == "role") && (bedead--))

        bedead


    _twoxtwo = (thisCell, cells, opts) ->
        #console.log(thisCell)
        #console.log(cells)
        position = thisCell.position
        bedead = chkbyNei(thisCell, cells, opts.num)
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

    _conway = (thisCell, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, cells, opts.num)
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

    _maze = (thisCell, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, cells, opts.num)
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

    _replicator = (thisCell, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, cells, opts.num)
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

    _logic = (thisCell, cells, opts) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, cells, opts.num)
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

    #_brainbrain = (thisCell, cells, opts) ->
    #    position = thisCell.position
    #    bedead = chkbyNei(thisCell, cells, opts.num)
    #    EMPTY = opts.EMPTY
    #    _origin_type = thisCell.type
    #    switch (bedead)
    #        when (2):
    #            (thisCell.type == "ghost" && (
    #                cells[position].ghost++
    #            ))
    #        else
    #            cells[position].type = "ghost"
    #            cells[position].ghost++
    #    (cells[position].ghost == 2 && (
    #        cells[position] = new EMPTY({
    #            position: position
    #        })
    #    ))
    #    
    #    {
    #        cells: cells
    #        stable: _stable
    #    }
    

    {
        "twoxtwo": _twoxtwo,
        "conway": _conway,
        "maze": _maze,
        "replicator": _replicator,
        "logic": _logic,
        #"brainbrain": _brainbrain
    }
)
