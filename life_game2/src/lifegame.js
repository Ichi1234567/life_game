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
