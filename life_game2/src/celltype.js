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
