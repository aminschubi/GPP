var Player = function(state, atlas, x, y, weaponType){
    Kiwi.GameObjects.Sprite.call(this,state, atlas, x, y, [enableInput=false]);

    this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 40, 40 );    

    this.maxHP = 1000;
    this.hp = 1000;
    this.facing = "up";
    this.cPressed = false;
    this.spacePressed = false;
    this.mid = new Kiwi.Geom.Point(this.x + this.width/2, this.y + this.height/2);

    this.attackHitbox = new Kiwi.Components.Box(this,0,30,30,30);

    //#region WeaponTypes
    //Longsword
    if(weaponType == 0)
        this.movespeedfactor = 1.0;
    //Bow
    else if(weaponType == 1)
        this.movespeedfactor = 1.1;
    //Hammer
    else if(weaponType == 2)
        this.movespeedfactor = 0.8;
    //#endregion
    Player.prototype.wouldCollide = function(dx, dy){
        console.log((Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)));
        if(Kiwi.Geom.Point.distanceBetween(this.mid, state.boss.mid) < state.boss.height/2 
            && ((Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 90 && state.boss.mid.x > this.mid.x && Kiwi.Geom.Point.distanceBetween(new Kiwi.Geom.Point(this.mid.x + 30, this.mid.y), state.boss.mid) < state.boss.height/2-40) 
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 180 && state.boss.mid.y > this.mid.y && Kiwi.Geom.Point.distanceBetween(new Kiwi.Geom.Point(this.mid.x, this.mid.y + 30), state.boss.mid) < state.boss.height/2-40)
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 270 && state.boss.mid.x < this.mid.x && Kiwi.Geom.Point.distanceBetween(new Kiwi.Geom.Point(this.mid.x - 30, this.mid.y), state.boss.mid) < state.boss.height/2-40) 
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 0 && state.boss.mid.y < this.mid.y && Kiwi.Geom.Point.distanceBetween(new Kiwi.Geom.Point(this.mid.x, this.mid.y - 30), state.boss.mid) < state.boss.height/2-40)
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 225 && state.boss.mid.y > this.mid.y && state.boss.mid.x < this.mid.x)
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 135 && state.boss.mid.y > this.mid.y && state.boss.mid.x > this.mid.x)
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 45 && state.boss.mid.y < this.mid.y && state.boss.mid.x > this.mid.x)
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 315 && state.boss.mid.y < this.mid.y && state.boss.mid.x < this.mid.x))){
            return true;
        }
        else{
            return false;
        }
    }

    Player.prototype.dodge = function(){
        var x = this.transform.x;
        var y = this.transform.y + 75;
        var angle = this.rotation;
        var rotatedX = Math.cos(-angle) * (x - this.transform.x) - Math.sin(-angle) * (y - this.transform.y) + this.transform.x;
        var rotatedY = Math.sin(-angle) * (x - this.transform.x) - Math.cos(-angle) * (y - this.transform.y) + this.transform.y;
        this.mid.x += rotatedX - this.transform.x;
        this.mid.y += rotatedY - this.transform.y;
        this.transform.setPosition(rotatedX, rotatedY);
    }

    Player.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        //#region Loop Animation right
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
        //#endregion
        //Check if Hit is being executed
        if(!this.animation.getAnimation("hit").isPlaying){
            //Down
            if(state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(180)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(180);
                }
                if(!this.wouldCollide(0, 4)){
                    this.transform.y += 4.0*this.movespeedfactor;
                    this.mid.y += 4.0*this.movespeedfactor;
                }
            }
            //Down-Left
            else if(state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(225)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(225);
                }
                if(!this.wouldCollide(-3, 3)){
                    this.transform.y += 3.0*this.movespeedfactor;
                    this.transform.x -= 3.0*this.movespeedfactor;
                    this.mid.y += 3.0*this.movespeedfactor;
                    this.mid.x -= 3.0*this.movespeedfactor;
                }
            }
            //Down-Right
            else if(state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(135)){
                    this.facing = "downright";
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(135);
                }
                if(!this.wouldCollide(3, 3)){
                    this.transform.y += 3.0*this.movespeedfactor;
                    this.transform.x += 3.0*this.movespeedfactor;
                    this.mid.y += 3.0*this.movespeedfactor;
                    this.mid.x += 3.0*this.movespeedfactor;
                }
            }
            //Nothing Up + Down
            else if(state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){}
            //Up
            else if(!state.downKey.isDown && !state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){
                if(this.rotation != 0){
                    this.rotation = 0;
                }
                if(!this.wouldCollide(0, -4)){
                    this.transform.y -= 4.0*this.movespeedfactor;
                    this.mid.y -= 4.0*this.movespeedfactor;
                }
            }
            //Up-Left
            else if(!state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(315)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(315);
                }
                if(!this.wouldCollide(-3, -3)){
                    this.transform.y -= 3.0*this.movespeedfactor;
                    this.transform.x -= 3.0*this.movespeedfactor;
                    this.mid.y -= 3.0*this.movespeedfactor;
                    this.mid.x -= 3.0*this.movespeedfactor;
                }
            }
            //Up-Right
            else if(!state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(45)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(45);
                }
                if(!this.wouldCollide(3, -3)){
                    this.transform.y -= 3.0*this.movespeedfactor;
                    this.transform.x += 3.0*this.movespeedfactor;
                    this.mid.y -= 3.0*this.movespeedfactor;
                    this.mid.x += 3.0*this.movespeedfactor;
                }
            }
            //Right
            else if(!state.downKey.isDown && !state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(90)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(90);
                }
                if(!this.wouldCollide(4, 0)){
                    this.transform.x += 4.0*this.movespeedfactor;
                    this.mid.x += 4.0*this.movespeedfactor;
                }
            }
            //Left
            else if(!state.downKey.isDown && state.leftKey.isDown && !state.rightKey.isDown && !state.upKey.isDown){
                if(this.rotation != Kiwi.Utils.GameMath.degreesToRadians(270)){
                    this.rotation = Kiwi.Utils.GameMath.degreesToRadians(270);
                }
                if(!this.wouldCollide(-4, 0)){
                    this.transform.x -= 4.0*this.movespeedfactor;
                    this.mid.x -= 4.0*this.movespeedfactor;
                }
            }
            //Nothing Left + Right
            else if(!state.downKey.isDown && state.leftKey.isDown && state.rightKey.isDown && !state.upKey.isDown){}
        }

        //Attack
        if(!this.spacePressed && state.spaceKey.isDown){
            console.log("hit");
            this.spacePressed = true;
            this.animation.stop();
            //Check if Enemy is hit
            if(Kiwi.Geom.Point.distanceBetween(this.mid, state.boss.mid) < state.boss.height/2 
            && ((Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 90 && state.boss.mid.x > this.mid.x ) 
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 180 && state.boss.mid.y > this.mid.y )
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 270 && state.boss.mid.x < this.mid.x ) 
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 0 && state.boss.mid.y < this.mid.y )
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 225 && state.boss.mid.y > this.mid.y && state.boss.mid.x < this.mid.x)
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 135 && state.boss.mid.y > this.mid.y && state.boss.mid.x > this.mid.x)
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 45 && state.boss.mid.y < this.mid.y && state.boss.mid.x > this.mid.x)
            || (Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) == 315 && state.boss.mid.y < this.mid.y && state.boss.mid.x < this.mid.x))){
                console.log("collision");
                state.boss.hp -= 100;
            }
            this.animation.play("hit");
        }
        else if(this.spacePressed && state.spaceKey.isUp && !this.animation.getAnimation("hit").isPlaying)
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