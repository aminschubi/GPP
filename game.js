var myGame = new Kiwi.Game();
var myState = new Kiwi.State("myState");

myState.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addSpriteSheet("hammerSprite", "img/hammerhit.png", 130,130);
    this.addSpriteSheet("boss", "img/bossSpriteSheet.png", 260, 253);
    this.addImage("bg", "img/bg.png");
}

myState.create = function(){
    Kiwi.State.prototype.create.call(this);
    this.game.stage.resize(1920,1080);

    this.clock = this.game.time.clock;

    this.bg = new Kiwi.GameObjects.Sprite(this, this.textures.bg, 0,0);

    this.player = new Player(this, this.textures.hammerSprite, 300, 300,2);
    this.player.animation.add("move", [0,1,2,3,4], 0.1, false);
    this.player.animation.add("hit", [5,6,7,8,9,10,11,12,13,14,15,16], 0.05, false);
    this.player.animation.add("dodge", [16,17,18,19,20,21,16],0.03,false);

    this.boss = new Boss(this, this.textures.boss, 500, 474);
    this.boss.animation.add("idle", [0], 0.1, false);
    this.boss.animation.add("move", [1,2], 0.4, false);
    this.boss.animation.add("attack", [0,3,4], 0.3, false);

    this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.UP);
    this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT);
    this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.DOWN);
    this.spaceKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR);
    this.cKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.C);

    this.hpP = new Kiwi.GameObjects.TextField(this, "",20,20, "#000000");
    this.hpP.fontFamily = "Wt-Position Mono";
    this.hpP.fontSize = 80;

    this.hpB = new Kiwi.GameObjects.TextField(this, "",1920/2 - 200,20, "#ff0000");
    this.hpB.fontFamily = "Wt-Position Mono";
    this.hpB.fontSize = 80;

    this.addChild(this.bg);
    this.addChild(this.boss);
    this.addChild(this.player);
    this.addChild(this.hpP);
    this.addChild(this.hpB);
}

myState.update = function() {
       Kiwi.State.prototype.update.call(this);
       this.updateHUD();
}

myState.updateHUD = function(){
    this.hpP.text = this.player.hp.toString()+"/"+this.player.maxHP.toString();
    this.hpB.text = this.boss.hp.toString()+"/"+this.boss.maxHP.toString();
}

myGame.states.addState(myState);
myGame.states.switchState("myState");


