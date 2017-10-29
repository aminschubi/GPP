var Player = function(state, atlas, x, y, weaponType){
    Kiwi.GameObjects.Sprite.call(this,state, atlas, x, y, [enableInput=false]);

    this.hp = 100;
    this.facing = "up";

    //Longsword
    if(weaponType == 0)
        this.movespeedfactor = 1.0;
    //Bow
    else if(weaponType == 1)
        this.movespeedfactor = 1.1;
    //Hammer
    else if(weaponType == 2)
        this.movespeedfactor = 0.8;

    

    Player.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        if(state.downKey.isDown || state.leftKey.isDown || state.rightKey.isDown ||state.upKey.isDown){
            if(!this.animation.getAnimation("move").isPlaying)
                this.animation.play("move");
        }
        if(state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
            console.log("X");
            if(this.facing != "down"){
                this.facing = "down";
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(180);
            }
            this.transform.y += 2.0*this.movespeedfactor;
        }
        else if(state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
            if(this.facing != "downleft"){
                this.facing = "downleft";
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(225);
            }
            this.transform.y += 1.5*this.movespeedfactor;
            this.transform.x -= 1.5*this.movespeedfactor;
        }
        else if(state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){
            if(this.facing != "downright"){
                this.facing = "downright";
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(145);
            }
            this.transform.y += 1.5*this.movespeedfactor;
            this.transform.x += 1.5*this.movespeedfactor;
        }
        else if(state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){
            //Nothing Up + Down
        }
        else if(!state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){
            if(this.facing != "up"){
                this.facing = "up";
                this.rotation = 0;
            }
            this.transform.y -= 2*this.movespeedfactor;
        }
        else if(!state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){
            if(this.facing != "upleft"){
                this.facing = "upleft";
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(315);
            }
            this.transform.y -= 1.5*this.movespeedfactor;
            this.transform.x -= 1.5*this.movespeedfactor;
        }
        else if(!state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && state.upKey.isDown){
            if(this.facing != "upright"){
                this.facing = "upright";
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(45);
            }
            this.transform.y -= 1.5*this.movespeedfactor;
            this.transform.x += 1.5*this.movespeedfactor;
        }
        else if(!state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){
            if(this.facing != "right"){
                this.facing = "right";
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(90);
            }
            this.transform.x += 2*this.movespeedfactor;
        }
        else if(!state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
            if(this.facing != "left"){
                this.facing = "left";
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(270);
            }
            this.transform.x -= 2*this.movespeedfactor;
        }
        else if(!state.downKey.isDown && state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){
            //Nothing Left + Right
        }
    }
};
Kiwi.extend( Player, Kiwi.GameObjects.Sprite );