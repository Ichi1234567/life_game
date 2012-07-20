define([
    "basic_cell"
], (EMPTY)->
    console.log("rule")
    chkbyNei = (thisCell, cells) ->
        position = thisCell.position
        thisCell.lifecycle++
        delta = [
            1,      # east nei
            3,      # n-e nei
            2,      # north nei
            23,     # n-w nei
            21,     # west nei
            63,     # s-w nei
            42,     # south nei
            43      # s-e nei
        ]
        bedead = 0
        delta.map((delta_i)->
            position_i = position_i + delta_i
            cell_nei = cells[position_i]
            if (!!cell_nei && cell_nei.cell.type == "role")
                ghost_i = cell_nei.cell.ghost
                ((typeof ghost_i == "number" && !ghost_i) && (bedead++))
        )
        ((thisCell.cell.type == "role") && (bedead--))

        bedead


    _twotwo = (thisCell, cells, result) ->
        position = thisCell.position
        bedead = chkbyNei(thisCell, cells)
        switch (bedead)
            when (1), (2), (3)
                console.log("do nothing")
            else
                result[position].cell = new EMPTY(position)
        
        result

    

    {
        "towtow": _twotwo
    }
)
