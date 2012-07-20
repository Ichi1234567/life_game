define([
    "basic_cell"
], (BASIC_CELL) ->
    class FOOD extends BASIC_CELL
        constructor: (params) ->
            super
            @type = "food"
            @speed = "1.5"

    FOOD
)
