define([
    "basic_cell"
], (BASIC_CELL) ->
    console.log("role_cell")
    class ROLE extends BASIC_CELL
        constructor: (params) ->
            super
            @type = "role"
            @speed = "2"

    ROLE
)
