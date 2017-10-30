var Player = function(state, atlas, x, y, weaponType){
    Kiwi.GameObjects.Sprite.call(this,state, atlas, x, y, [enableInput=false]);

    this.hp = 100;
    this.facing = "up";
    this.cPressed = false;
    this.spacePressed = false;

    //Longsword
    if(weaponType == 0)
        this.movespeedfactor = 1.0;
    //Bow
    else if(weaponType == 1)
        this.movespeedfactor = 1.1;
    //Hammer
    else if(weaponType == 2)
        this.movespeedfactor = 0.8;

    Player.prototype.dodge = function(){
        var x = this.transform.x;
        var y = this.transform.y + 75;
        var angle = this.rotation;
        var rotatedX = Math.cos(-angle) * (x - this.transform.x) - Math.sin(-angle) * (y - this.transform.y) + this.transform.x;
        var rotatedY = Math.sin(-angle) * (x - this.transform.x) - Math.cos(-angle) * (y - this.transform.y) + this.transform.y;
        this.transform.setPosition(rotatedX, rotatedY);
    }

    Player.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        //Loop Animation right
        if((state.downKey.isDown || state.leftKey.isDown || state.rightKey.isDown ||state.upKey.isDown) 
        && !(!state.downKey.isDown && state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown)
        && !(!state.downKey.isDown && state.leftKey.isDown && state.rightKey.isDown && state.upKey.isDown)
        && !(state.downKey.isDown && state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown)
        && !(state.downKey.isDown && state.leftKey.isDown && state.rightKey.isDown && state.upKey.isDown)
        && !(state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown)
        && !(state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown)
        && !(state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && state.upKey.isDown)
        && !this.animation.getAnimation("hit").isPlaying)
        {
            if(!this.animation.getAnimation("move").isPlaying)
                this.animation.play("move");
        }
        //Check if Hit is being executed
        if(!this.animation.getAnimation("hit").isPlaying){
            //Down
            if(state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(180)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(180);
                }
                this.transform.y += 4.0*this.movespeedfactor;
            }
            //Down-Left
            else if(state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(225)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(225);
                }
                this.transform.y += 3.0*this.movespeedfactor;
                this.transform.x -= 3.0*this.movespeedfactor;
            }
            //Down-Right
            else if(state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(135)){
                    this.facing = "downright";
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(135);
                }
                this.transform.y += 3.0*this.movespeedfactor;
                this.transform.x += 3.0*this.movespeedfactor;
            }
            //Nothing Up + Down
            else if(state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){}
            //Up
            else if(!state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){
                if(this.rotation != 0){
                    this.rotation = 0;
                }
                this.transform.y -= 4.0*this.movespeedfactor;
            }
            //Up-Left
            else if(!state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(315)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(315);
                }
                this.transform.y -= 3.0*this.movespeedfactor;
                this.transform.x -= 3.0*this.movespeedfactor;
            }
            //Up-Right
            else if(!state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(45)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(45);
                }
                this.transform.y -= 3.0*this.movespeedfactor;
                this.transform.x += 3.0*this.movespeedfactor;
            }
            //Right
            else if(!state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(90)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(90);
                }
                this.transform.x += 4.0*this.movespeedfactor;
            }
            //Left
            else if(!state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(270)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(270);
                }
                this.transform.x -= 4.0*this.movespeedfactor;
            }
            //Nothing Left + Right
            else if(!state.downKey.isDown && state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){}
        }

        //Attack
        if(!this.spacePressed && state.spaceKey.isDown){
            console.log("hit");
            this.spacePressed = true;
            this.animation.stop();
            this.animation.play("hit");
        }
        else if(this.spacePressed && state.spaceKey.isUp)
            this.spacePressed = false;

        //Check if Dodge is still pressed
        if(!this.cPressed && state.cKey.isDown && !this.animation.getAnimation("hit").isPlaying){
            this.cPressed = true;
            this.dodge();
        }
        else if(this.cPressed && state.cKey.isUp)
            this.cPressed = false;
    }
};
Kiwi.extend( Player, Kiwi.GameObjects.Sprite );