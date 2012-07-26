require([
    "cells_view"
], (CELLS_VIEW) ->
    _view = new CELLS_VIEW({
        el: "body",
        num: 625
    })
    #console.log(_view.cells)
)
