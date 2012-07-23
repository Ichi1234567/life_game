define([
    "basic_cell"
], (BASIC_CELL) ->
    class ENEMY extends BASIC_CELL
        constructor: (params) ->
            super
            @type = "enemy"
            @speed = "2"

    ENEMY
)
