var moverule = function(cell, _cellstruct) {
    var empty = _cellstruct.empty;
    var food = _cellstruct.food;
    var role = _cellstruct.role;
    var enemy = _cellstruct.enemy;

    /////////////////////////////////////////////////
    var count = function(me, table) {
        var pos = me.pos;
        me.licycle++;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var tab = table[x][y];
        var nei = tab.nei;
        var bedead = 0;
        //if (me.licycle < 3) {
            for (var i = 0; i < nei.length; i++) {
                var nei_i = nei[i];
                var nx = nei_i.x;
                var ny = nei_i.y;
                if (typeof table[nx][ny] == 'object' && table[nx][ny].cell.type == 'role') {
                    var ghost = table[nx][ny].cell.ghost;
                    if (typeof ghost == 'number' && !ghost) {
                        bedead++;
                    }
                }
            }
        //}
        if (tab.cell.type == 'role') {
            bedead--;
        }
        return bedead;
    };

    /////////////////////////////////////////////////
    var roleRule = {};
    roleRule.twoxtwo = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (1):
            case (2):
            case (5):
                break;
            default:
                //table[x][y].cell = new empty(pos);
                result[x][y].cell = new empty(pos);
                break;
        }
        // move or not
        return result;
    };
    roleRule.conway = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (2):
            case (3):
                break;
            default:
                //table[x][y].cell = new empty(pos);
                result[x][y].cell = new empty(pos);
                break;
        }
        // move or not
        return result;
    };
    roleRule.flakes = function(me, table, result) {
    };
    roleRule.maze = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (1):
            case (2):
            case (3):
            case (4):
            case (5):
                break;
            default:
                //table[x][y].cell = new empty(pos);
                result[x][y].cell = new empty(pos);
                break;
        }
        // move or not
    };
    roleRule.replicator = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (1):
            case (3):
            case (5):
            case (7):
                break;
            default:
                //table[x][y].cell = new empty(pos);
                result[x][y].cell = new empty(pos);
                break;
        }
        // move or not
    };
    roleRule.logic = function(me, table, result) {
        var pos = me.pos;
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        //table[x][y].cell = new empty(pos);
        result[x][y].cell = new empty(pos);
        // move or not
    };


    roleRule.brainbrain = function(me, table, result) {
        var pos = me.pos;
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (2) :
                if (me.type == 'ghost') {
                    result[x][y].cell.ghost++;
                }
                break;
            default:
                //me.type = 'ghost';
                //me.ghost++;
                result[x][y].cell.type = 'ghost';
                result[x][y].cell.ghost++;
                break;
        }
        if (me.ghost == 2) {
            //table[x][y].cell = new empty(pos);
            me.ghost = 0;
            result[x][y].cell = new empty(pos);
        }
        // move or not
    };
    roleRule.banners = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (2):
            case (3):
            case (6):
            case (7):
                if (me.type == 'ghost') {
                    //me.ghost++;
                    result[x][y].cell.ghost++;
                }
                break;
            default:
                //me.type = 'ghost';
                //me.ghost++;
                result[x][y].cell.type = 'ghost';
                result[x][y].cell.ghost++;
                break;
        }
        if (me.ghost == 4) {
            //table[x][y].cell = new empty(pos);
            me.ghost = 0;
            result[x][y].cell = new empty(pos);
        }
    };
    roleRule.ebbflow = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (1):
            case (2):
            case (4):
            case (7):
            case (8):
                if (me.type == 'ghost') {
                    //me.ghost++;
                    result[x][y].cell.ghost++;
                }
                break;
            default:
                //me.type = 'ghost';
                //me.ghost++;
                result[x][y].cell.type = 'ghost';
                result[x][y].cell.ghost++;
                break;
        }
        if (me.ghost == 17) {
            //table[x][y].cell = new empty(pos);
            me.ghost = 0;
            result[x][y].cell = new empty(pos);
        }
    };
    roleRule.fireworks = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (2) :
                if (me.type == 'ghost') {
                    //me.ghost++;
                    result[x][y].cell.ghost++;
                }
                break;
            default:
                //me.type = 'ghost';
                //me.ghost++;
                result[x][y].cell.type = 'ghost';
                result[x][y].cell.ghost++;
                break;
        }
        if (me.ghost == 20) {
            //table[x][y].cell = new empty(pos);
            me.ghost = 0;
            result[x][y].cell = new empty(pos);
        }
    };
    roleRule.rake = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (3):
            case (4):
            case (6):
            case (7):
                if (me.type == 'ghost') {
                    //me.ghost++;
                    result[x][y].cell.ghost++;
                }
                break;
            default:
                //me.type = 'ghost';
                //me.ghost++;
                result[x][y].cell.type = 'ghost';
                result[x][y].cell.ghost++;
                break;
        }
        if (me.ghost == 5) {
            //table[x][y].cell = new empty(pos);
            me.ghost = 0;
            result[x][y].cell = new empty(pos);
        }
    };
    roleRule.spirals = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (2):
                if (me.type == 'ghost') {
                    //me.ghost++;
                    result[x][y].cell.ghost++;
                }
                break;
            default:
                //me.type = 'ghost';
                //me.ghost++;
                result[x][y].cell.type = 'ghost';
                result[x][y].cell.ghost++;
                break;
        }
        if (me.ghost == 4) {
            //table[x][y].cell = new empty(pos);
            me.ghost = 0;
            result[x][y].cell = new empty(pos);
        }
    };

    ///////////////////////////////////////////
    var emptyRule = {};
    emptyRule.twoxtwo = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (3):
            case (6):
                //table[x][y].cell = new role(pos);
                result[x][y].cell = new role(pos);
                break;
        }
        return result;
    };
    emptyRule.conway = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (3):
                //table[x][y].cell = new role(pos);
                result[x][y].cell = new role(pos);
                break;
        }
        return result;
    };
    emptyRule.flakes = emptyRule.conway;
    emptyRule.maze = emptyRule.conway;
    emptyRule.replicator = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (1):
            case (3):
            case (5):
            case (7):
                //table[x][y].cell = new role(pos);
                result[x][y].cell = new role(pos);
                break;
        }
        // move or not
    };
    emptyRule.logic = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (2):
                //table[x][y].cell = new role(pos);
                result[x][y].cell = new role(pos);
                break;
        }
    };


    emptyRule.brainbrain = emptyRule.logic;
    emptyRule.banners = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (3):
            case (4):
            case (5):
            case (7):
                //table[x][y].cell = new role(pos);
                me.ghost = 0;
                result[x][y].cell = new role(pos);
                break;
        }
    };
    emptyRule.ebbflow = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (3):
            case (6):
                //table[x][y].cell = new role(pos);
                me.ghost = 0;
                result[x][y].cell = new role(pos);
                break;
        }
    };
    emptyRule.fireworks = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (1):
            case (3):
                //table[x][y].cell = new role(pos);
                me.ghost = 0;
                result[x][y].cell = new role(pos);
                break;
        }
    };
    emptyRule.rake = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (2):
            case (6):
            case (7):
            case (8):
                //table[x][y].cell = new role(pos);
                me.ghost = 0;
                result[x][y].cell = new role(pos);
                break;
        }
    };
    emptyRule.spirals = function(me, table, result) {
        var pos = me.pos;
        // chk dead or not
        var x = pos.x;
        var y = pos.y;
        var bedead = count(me, table);
        switch (bedead) {
            case (2):
            case (3):
            case (4):
                //table[x][y].cell = new role(pos);
                me.ghost = 0;
                result[x][y].cell = new role(pos);
                break;
        }
    };

    ///////////////////////////////////////////
    var foodRule = {};

    ///////////////////////////////////////////
    var enemyRule = {};



    ///////////////////////////////////////////
    cell.roleRule = roleRule;
    cell.emptyRule = emptyRule;
    cell.foodRule = foodRule;
    cell.enemyRule = enemyRule;
};
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
var celtype = function(lg) {
    var cell = function(type, pos) {
        return new _cellstruct[type](pos);
    };

    /////////////////////////////////////////
    var food = function(pos) {
        this.type = 'food';
        this.pos = pos;
        this.speed = 1.5;
        this.licycle = 0;
        this.ghost = 0;
    };
    food.prototype.move = function(table) {
    };

    var enemy = function(pos) {
        this.type = 'enemy';
        this.pos = pos;
        this.speed = 3;
        this.licycle = 0;
        this.ghost = 0;
    };
    enemy.prototype.move = function(table) {
    };

    var role = function(pos) {
        this.type = 'role';
        this.pos = pos;
        this.speed = 2;
        this.licycle = 0;
        this.ghost = 0;
    };
    role.prototype.move = function(table, mode, result) {
        roleRule[mode](this, table, result);
    };

    var empty = function(pos) {
        this.type = 'empty';
        this.pos = pos;
        this.speed = 0;
        this.licycle = 0;
        this.ghost = 0;
    };
    empty.prototype.move = function(table, mode, result) {
        emptyRule[mode](this, table, result);
    };


    /////////////////////////////////////////
    var _cellstruct = {
        'food': food,
        'enemy': enemy,
        'role': role,
        'empty': empty
    };

    /////////////////////////////////////////
    moverule(cell, _cellstruct);
    var roleRule = cell.roleRule;
    var emptyRule = cell.emptyRule;
    var foodRule = cell.foodRule;
    var enemyRule = cell.enemyRule;

    /////////////////////////////////////////
    lg.cell = cell;
};
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
(function(window) {
    var canvas;
    var ctx;
    var _toString = Object.prototype.toString;
    var deepClone = function(obj, property) {
        var i, _fn;
        var cloneObj;
        var type = _toString.call(obj);
        var propertype = _toString.call(property);
        var property = (propertype === '[object Array]') ? (property) : (null);
        switch(type) {
            case ('[object Array]'):
                cloneObj = [];
                obj.foreach = foreach;
                _fn = function(name, val, result) {
                    result.push(val);
                    return result;
                };
                cloneObj = obj.foreach(_fn, cloneObj);
                break;
            case ('[object Object]'):
                obj.foreach = foreach;
                if (property) {
                    var proStr = property.toString();
                }
                _fn = function(name, val, proStr, result) {
                    var beCopy = true;
                    if (proStr) {
                        beCopy = false;
                        beCopy = (proStr.indexOf(name) < 0) ? (false): (true);
                    }
                    if (beCopy) {
                        result[name] = val;
                    }
                    return result;
                };
                cloneObj = obj.foreach(_fn, [proStr], {});
                break;
            default:
                cloneObj = obj;
                break;
        }
        if (isType.func(cloneObj.foreach)) {
            delete cloneObj.foreach;
        }
        return cloneObj;
    };
    var foreach = function(fn) {
        var i, _args;
        var _obj = this;
        var len = _obj.length;
        var isArray = (isType.arr(_obj)) ? (true) : (false);
        var args = (isType.arr(arguments[1]) && arguments[1].length) ? (arguments[1]) : ([]);
        var result =  (!args.length && typeof arguments[1] != 'undefined') ? (arguments[1]) :
                ((typeof arguments[2] != 'undefined') ? (arguments[2]) : (null));
        var isResult = (result != null) ? (true) : (false);
        if (isArray) {
            for (i = 0; i < len; i++) {
                _args = Array.prototype.slice.call(args);
                _args.splice(0, 0, i, _obj[i]);
                if (isResult) {
                    _args.push(result);
                }
                result = fn.apply(_obj[i], _args);
                if (result == false) {
                    break;
                }
            }
        } else {
            for (i in _obj) {
                _args = Array.prototype.slice.call(args);
                _args.splice(0, 0, i, _obj[i]);
                if (isResult) {
                    _args.push(result);
                }
                result = fn.apply(_obj[i], _args);
                if (result == false) {
                    break;
                }
            }
        }
        if (!isResult) {
            result = _obj;
        }
        return result;
    };
    var isType = {
        'null': function(obj) {
            return (obj == null);
        },
        'undefined': function(obj) {
            return (typeof obj == 'undefined');
        },
        'num': function(obj) {
            return (_toString.call(obj) === '[object Number]' && isFinite(obj));
        },
        'str': function(obj) {
            return (typeof obj == 'string' || 
                    _toString.call(obj) === '[object String]');
        },
        'bool': function(obj) {
            return (typeof obj == 'boolean' || 
                    _toString.call(obj) === '[object Boolean]');
        },
        'reg': function(obj) {
            return (_toString.call(obj) === '[object RegExp]');
        },
        'date': function(obj) {
            return (_toString.call(obj) === '[object Date]');
        },
        'func': function(obj) {
            return (_toString.call(obj) === '[object Function]');
        },
        'obj': function(obj) {
            return (_toString.call(obj) === '[object Object]');
        },
        'arr': function(obj) {
            return (_toString.call(obj) === '[object Array]');
        }
    }

    ///////////////////////////////////////////////////
    var lg = function() {
        return new init();
    };

    var init = function() {
        canvas = document.getElementById('evn');
        ctx = canvas.getContext('2d');

        this.celltabsize = 15;
        this.w = 600;
        this.h = 600;
        this.mode = 'default';
        this.celltab = null;
        this.timmer = null;
    };

    init.prototype.reset = function() {
        var me = this;

        me.celltab = stinit(me.w, me.h, me.celltabsize);
        me.draw();
    };

    /////////////////////////////////////////////////////
    var stinit = function(w, h, size, mode) {
        var celltab = [];
        var nox = parseInt(w / size);
        var noy = parseInt(h / size);

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
                    if (seed > 0.90) {
                        celltab[i][j].cell = celltype('role', {x: i, y: j});
                    } else {
                        celltab[i][j].cell = celltype('empty', {x: i, y: j});
                    }
                } else {
                    celltab[i][j] = -1;
                }
            }
        }
        return celltab;
    };

    /////////////////////////////////////////////////////
    var border = function(w, h, size) {
        var i;
        var num;
        var x;
        var y;

        ctx.strokeStyle = '#000000';
        num = w / size;
        for (i = 0; i < num; i++) {
            x = i * size;
            ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            ctx.closePath();
            ctx.stroke();
        }

        num = h / size;
        for (i = 0; i < num; i++) {
            y = i * size;
            ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            ctx.closePath();
            ctx.stroke();
        }
    };
    var fillcell = function(cw, ch, celltab) {
        var x;
        var y;
        for (var i = 1; i < (celltab.length - 2); i++) {
            for (var j = 1; j < (celltab.length - 2); j++) {
                if (typeof celltab[i][j].cell == 'object') {
                    x = cw * (i - 1);
                    y = ch * (j - 1);
                    var cell = celltab[i][j].cell;
                    var celltype = cell.type;
                    var ghost = cell.ghost;
                    switch (celltype) {
                        case ('food'):
                            ctx.fillStyle = '#00ff00';
                            break;
                        case ('enemy'):
                            ctx.fillStyle = '#ff0000';
                            break;
                        case ('role'):
                            ctx.fillStyle = '#000000';
                            break;
                        case ('empty'):
                            ctx.fillStyle = '#ffffff';
                            break;
                        default:
                            if (ghost) {
                                var col = parseInt(16 / (ghost + 1)).toString(16);
                                var str = '#';
                                for (var k = 0; k < 6; k++) {
                                    str += col;
                                }
                                ctx.fillStyle = str;
                            }
                    }
                    ctx.beginPath();
                        ctx.rect(x, y, cw, ch);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    };
    init.prototype.draw = function(me) {
        var me = (typeof me == 'object') ? (me) : (this);
        ctx.strkeStyle = '#000000';
        ctx.fillStyle = '#ffffff';
        ctx.clearRect(0, 0, me.w, me.h);
        border(me.w, me.h, me.celltabsize);
        fillcell(me.celltabsize, me.celltabsize, me.celltab);
    };


    /////////////////////////////////////////////////////
    var state = function(me, mode) {
        var i, j;
        var num = (me.w / me.celltabsize) + 3;

        var table = me.celltab;
        var result = [];
        for (i = 0; i < num; i++) {
            result[i] = [];
            for (j = 0; j < num; j++) {
                result[i][j] = deepClone(table[i][j]);
                if (typeof table[i][j] == 'object') {
                    table[i][j].cell.move(table, mode, result);
                }
            }
        }
        //console.log(result);
        me.celltab = result;
    };
    init.prototype.start = function(me, mode) {
        //console.log(me);
        me.timmer = setInterval(function() {
                state(me, mode);
                me.draw(me);
            }, 200);
    };

    init.prototype.pause = function(me) {
        clearInterval(me.timmer);
    };

    celtype(lg);
    window.LG = lg;
    var celltype = lg.cell;
    setcell(init, celltype);
})(window);
