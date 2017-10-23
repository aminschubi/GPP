

var Player = function(state, atlas, [x=0], [y=0], [enableInput=false], weaponType){

    Kiwi.GameObjects.Sprite.call(this,state, atlas, [x=0], [y=0], [enableInput=false]);

    this.hp = 100;

    switch(weaponType){
        //LongSword
        case 0:
            this.movespeedfactor = 1.0;
            break;
        //Bow
        case 1:
            this.movespeedfactor = 1.1;
            break;
        //Hammer
        case 2:
            this.movespeedfactor = 0.8;
            break;
    }
};