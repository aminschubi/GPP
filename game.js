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

    this.gameOver = false;

    this.bg = new Kiwi.GameObjects.Sprite(this, this.textures.bg, 0,0);

    this.player = new Player(this, this.textures.hammerSprite, 300, 300,2);
    this.player.animation.add("move", [0,1,2,3,4], 0.1, false);
    this.player.animation.add("hit", [5,6,7,8,9,10,11,12,13,14,15,16], 0.05, false);
    this.player.animation.add("dodge", [16,17,18,19,20,21,16],0.03,false);

    this.boss = new Boss(this, this.textures.boss, 500, 474);
    this.boss.animation.add("idle", [0], 0.1, false);
    this.boss.animation.add("move", [1,2], 0.2, false);
    this.boss.animation.add("attack", [0,3,4], 0.3, false);

    this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.UP);
    this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT);
    this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.DOWN);
    this.spaceKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR);
    this.cKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.C);

    this.playerAttack = new Kiwi.GameObjects.TextField(this, "",20,20, "#ffffff");
    this.playerAttack.fontFamily = "Wt-Position Mono";
    this.playerAttack.fontSize = 50;
    this.playerAttack.fontWeight = "bold";
    this.playerAttack.visible = false;

    this.bossAttack = new Kiwi.GameObjects.TextField(this, "",20,20, "#ff0000");
    this.bossAttack.fontFamily = "Wt-Position Mono";
    this.bossAttack.fontSize = 50;
    this.bossAttack.fontWeight = "bold";
    this.bossAttack.visible = false;

    this.dodgeCD = new Kiwi.GameObjects.TextField(this, "",20,60, "#ffffff");
    this.dodgeCD.fontFamily = "Wt-Position Mono";
    this.dodgeCD.fontSize = 60;
    this.dodgeCD.fontWeight = "bold";
    this.dodgeCD.text = "Dodge-Cooldown:2/2 Seconds";

    this.hpP = new Kiwi.GameObjects.TextField(this, "",20,20, "#ffffff");
    this.hpP.fontFamily = "Wt-Position Mono";
    this.hpP.fontSize = 60;
    this.hpP.fontWeight = "bold";

    this.hpB = new Kiwi.GameObjects.TextField(this, "",1920/2 - 200,20, "#c5f7f0");
    this.hpB.fontFamily = "Wt-Position Mono";
    this.hpB.fontSize = 60;
    this.hpB.fontWeight = "bold";

    this.endTF = new Kiwi.GameObjects.TextField(this, "",1920/2 - 400,1080/2, "#ffffff");
    this.endTF.fontFamily = "Wt-Position Mono";
    this.endTF.fontSize = 120;
    this.endTF.fontWeight = "bold";

    this.endTF2 = new Kiwi.GameObjects.TextField(this, "",1920/2 - 500,1080/2+120, "#ffffff");
    this.endTF2.fontFamily = "Wt-Position Mono";
    this.endTF2.fontSize = 120;
    this.endTF2.fontWeight = "bold";

    this.addChild(this.bg);
    this.addChild(this.boss);
    this.addChild(this.player);
    this.addChild(this.hpP);
    this.addChild(this.hpB);
    this.addChild(this.playerAttack);
    this.addChild(this.bossAttack);
    this.addChild(this.dodgeCD);
}

myState.update = function() {
       Kiwi.State.prototype.update.call(this);
       this.updateHUD();
       this.checkEnd();
       if(this.gameOver && this.spaceKey.isDown){
           this.destroy(true);
           this.create();
           this.clock.resume();
       }
}

myState.updateHUD = function(){
    this.hpP.text = "Player-HP:"+this.player.hp.toString()+"/"+this.player.maxHP.toString();
    this.hpB.text = "Boss-HP:"+this.boss.hp.toString()+"/"+this.boss.maxHP.toString();
    this.playerAttack.x = this.calcRotationPoint().x;
    this.playerAttack.y = this.calcRotationPoint().y;
    this.bossAttack.x = this.player.mid.x-20;
    this.bossAttack.y = this.player.mid.y-20;
    if(this.player.actualTime-this.player.dodgeClock < 2001)
        this.dodgeCD.text = "Dodge-Cooldown:"+(Math.round(((this.player.actualTime-this.player.dodgeClock)/1000) * 100) / 100)+"/2 Seconds";
}

myState.checkEnd = function(){
    if(this.player.hp == 0){
        this.endTF.text = "Game Over! You Died!";
        this.endTF2.text = "Press SpaceBar to restart";
        this.addChild(this.endTF);
        this.addChild(this.endTF2);
        this.boss.clock.pause();
        this.player.clock.pause();
        this.gameOver = true;
    }
    else if(this.boss.hp == 0){
        this.endTF.text = "Congratulations! You Won!";
        this.endTF2.text = "Press SpaceBar to restart";
        this.addChild(this.endTF);
        this.addChild(this.endTF2);
        this.boss.clock.pause();
        this.player.clock.pause();
        this.gameOver = true;
    }
}

myState.calcRotationPoint = function(){
    var x;
    var y;
    switch(Kiwi.Utils.GameMath.radiansToDegrees(this.player.rotation)){
        case 0:
            x = this.player.mid.x - 15;
            y = this.player.mid.y - 50;
            break;
        case 45:
            x = this.player.mid.x - 15;
            y = this.player.mid.y - 55;
            break;
        case 90:
            x = this.player.mid.x + 5;
            y = this.player.mid.y -30;
            break;
        case 135:
            x = this.player.mid.x + 15;
            y = this.player.mid.y - 30;
            break;
        case 180:
            x = this.player.mid.x + 15;
            y = this.player.mid.y - 35;
            break;
        case 225:
            x = this.player.mid.x - 5;
            y = this.player.mid.y - 45;
            break;
        case 270:
            x = this.player.mid.x -5;
            y = this.player.mid.y -60;
            break;
        case 315:
            x = this.player.mid.x + 15;
            y = this.player.mid.y - 70;
            break;
    }
    var angle = this.player.rotation;
    var rotatedX = Math.cos(-angle) * (x - this.player.mid.x) + Math.sin(-angle) * (y - this.player.mid.y) + this.player.mid.x;
    var rotatedY = Math.sin(-angle) * (x - this.player.mid.x) + Math.cos(-angle) * (y - this.player.mid.y) + this.player.mid.y;
    return new Kiwi.Geom.Point(rotatedX,rotatedY);
}

myGame.states.addState(myState);
myGame.states.switchState("myState");


