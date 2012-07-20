var setcell = function(lginit, celltype) {

    /////////////////////////////////////////////////
    lginit.prototype.setcell = function(pos, type) {
        var me = this;
        var size = me.celltabsize;

        var x = parseInt(pos.x / size) + 1;
        x = (pos.x % size) ? (x) : (x - 1);
        var y = parseInt(pos.y / size) + 1;
        y = (pos.y % size) ? (y) : (y - 1);
        //console.log(x + ' , ' + y);

        me.celltab[x][y].cell = celltype(type, {x: x, y: y});
        me.draw(me);
    };

    lginit.prototype.clear = function() {
        var me = this;
        var w = me.w;
        var h = me.h
        var size = me.celltabsize;
        var nox = parseInt(w / size);
        var noy = parseInt(h / size);

        var celltab = [];
        for (var i = 0; i < (nox + 3); i++) {
            celltab[i] = [];
            for (var j = 0; j < (noy + 3); j++) {
                var seed = Math.random();
                //celltab[i][j] = (seed > 0.90) ? (1) : (0);
                if ((i && j) && (i < (nox + 2) && j < (noy + 2))) {
                    celltab[i][j] = {};
                    celltab[i][j].guess = {x: 0, y: 0};
                    celltab[i][j].nei = [];
                    for (var k = -1; k < 2; k++) {
                        for (var l = -1; l < 2; l++) {
                            celltab[i][j].nei.push({x: (i + k), y: (j + l)});
                        }
                    }
                    celltab[i][j].cell = celltype('empty', {x: i, y: j});
                } else {
                    celltab[i][j] = -1;
                }
            }
        }
        me.celltab = celltab;
        me.draw(me);
    };
};
