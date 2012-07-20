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
