var myGame = new Kiwi.Game();
var myState = new Kiwi.State("myState");

myState.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addSpriteSheet("hammerSprite", "img/hammerhit.png", 208,208);
    this.addSpriteSheet("boss", "img/bossSpriteSheet.png", 500, 450);
    this.addImage("bg", "img/bg.png");
}

myState.create = function(){
    Kiwi.State.prototype.create.call(this);
    myState.game.stage.resize(1920,1080);

    this.clock = this.game.time.clock;
    this.bg = new Kiwi.GameObjects.Sprite(this, this.textures.bg, 0,0);
    this.player = new Player(this, this.textures.hammerSprite, 300, 300,2);
    this.boss = new Boss(this, this.textures.boss, 500, 474);
    this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.UP);
    this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT);
    this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.DOWN);
    this.spaceKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR);
    this.cKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.C);

    this.player.animation.add("move", [0,1,2,3,4], 0.1, false);
    this.player.animation.add("hit", [5,6,7,8,9,10,11,12,13,14,15,16], 0.05, false);
    this.boss.animation.add("move", [1,2], 0.4, false);
    this.addChild(this.bg);
    this.addChild(this.boss);
    this.addChild(this.player);
}

myState.update = function() {
       Kiwi.State.prototype.update.call(this);

}



myGame.states.addState(myState);
myGame.states.switchState("myState");


