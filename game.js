var myGame = new Kiwi.Game();
var myState = new Kiwi.State("myState");

myState.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addSpriteSheet("hammerSprite", "img/hammerMove.png", 162, 120);
}

myState.create = function(){
    Kiwi.State.prototype.create.call(this);
    myState.game.stage.resize(1920, 1080);

    this.player = new Player(this, this.textures.hammerSprite, 300, 300,2);
    this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W);
    this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
    this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
    this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);
    this.spaceKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR);
    this.cKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.C);

    this.player.animation.add("move", [0,1,2,3,4], 0.2, false);
    this.addChild(this.player);
}

myState.update = function() {
       Kiwi.State.prototype.update.call(this);

}



myGame.states.addState(myState);
myGame.states.switchState("myState");


