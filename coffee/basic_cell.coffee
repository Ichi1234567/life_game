define([
    "rule"
], (RULE) ->
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

        move: (cells, mode) ->
            RULE[mode](@, cells)
    })

    MODEL
)
