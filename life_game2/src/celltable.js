var tablemath = function(lg) {
    var fillter = {
            'food': {
                        x: [0.5, 1, 0, -1, -0.5],
                        y: [-0.5, -1, 0, 1, 0.5]
                    },
            'enemy': {
                        x: [-1, -2, -3, 0, 3, 2, 1],
                        y: [1, 2, , 3, 0, -3, -2, -1]
                    }
        };
    lg.updateSt = function(cell, table) {
        var celpos = cell.pos;
        var celtype = cell.type;
        var cfiler = fillter[celtype];

        var x = celpos.x;
        var y = celpos.y;
        var i, j;
        for (i = 1; i < (table.length - 1); i++) {
            for (j = 1; j < (talbe[i].length - 1); j++) {
                var tab_ij = table[x + i][y + j];
                tab_ij.guess = {
                        x: 0.5 * tab_ij.guess.x,
                        y: 0.5 * tab_ij.guess.y
                    };
            }
        }
        switch(celtype) {
            case ('food'):
            case ('enemy'):
                var filxlen = cfiler.x.length;
                var filylen = cfiler.y.length;
                var startx = 0 - (filxlen - 1) / 2;
                var starty = 0 - (filylen - 1) / 2;
                var endx = filxlen + startx;
                var endy = filylen + starty;
                for (i = startx; i < endx; i++) {
                    for (j = starty; j < endy; j++) {
                        var tab_ij = table[x + i][y + j];
                        if (typeof tab_ij == 'object') {
                            tab_ij.guess = {
                                x: tab_ij.guess.x + 0.5 * foodFilter.x[i],
                                y: tab_ij.guess.y + 0.5 * foodFilter.y[j]
                            };
                        }
                    }
                }
                break;
        }
        return table;
    };
};
