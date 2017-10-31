var Boss = function(state, atlas, x, y){
    Kiwi.GameObjects.Sprite.call(this,state, atlas, x, y, [enableInput=false]);
   
    var player = state.player;
    this.relocate = true;
    this.actualRot;
    this.playerActPos;
    this.position;
    this.angle;
    this.mid = new Kiwi.Geom.Point(this.transform.x + this.width/2, this.transform.y + this.height/2);

    var hb = new Kiwi.Geom.Circle(this.mid.x, this.mid.y, 300);
    this.getHB = function(){
        return hb;
    }


    Boss.prototype.attack = function(){

    }

    Boss.prototype.moveTowardsEnemy = function(){
        var x = this.transform.x;
        var y = this.transform.y + 2;
        var angle = this.rotation;
        var rotatedX = Math.cos(-angle) * (x - this.transform.x) - Math.sin(-angle) * (y - this.transform.y) + this.transform.x;
        var rotatedY = Math.sin(-angle) * (x - this.transform.x) - Math.cos(-angle) * (y - this.transform.y) + this.transform.y;
        this.mid.x += rotatedX - this.transform.x;
        this.mid.y += rotatedY - this.transform.y;
        hb.x = this.mid.x;
        hb.y = this.mid.y;
        this.transform.setPosition(rotatedX, rotatedY);
    }

    Boss.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        var boss = this;
        //console.log(hb);
        //console.log(this.mid.x+"  "+this.mid.y)
        //this.mid = new Kiwi.Geom.Point(this.mid.x, this.y+this.rotPointY);
        //Relocate Boss(Rotation and Movement)
        if(this.relocate){
            console.log("Rerotate!");
            this.playerActPos = player.transform.getPositionPoint();
            this.playerActPos.x += player.width/2;
            this.playerActPos.y += player.height/2;
            this.position = this.transform.getPositionPoint();
            this.position.x += this.width/2;
            this.position.y += this.height/2;

            this.angle = Kiwi.Utils.GameMath.radiansToDegrees(this.position.angleTo(this.playerActPos));
            if(this.angle < 0)
                this.angle += 360;

            this.angle += 90;

            if(this.angle > 360)
                this.angle -= 360;

            this.angle = Math.ceil(this.angle);

            this.actualRot = this.rotation;
            if(this.rotation == 0)
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(360);

            this.relocate = false;
            var timer = state.clock.createTimer( "moveTimer", 2 );
            timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP,
                function() {
                    console.log( "Move!" );
                    boss.relocate = true;
                    state.clock.removeTimer(timer );
                }
            );
            timer.start();
        }
        else if(!this.relocate){
            if(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) < 0)
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(359);

            if(Math.floor(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)) == this.angle){
//console.log(Kiwi.Geom.Point.distanceBetween(this.mid, player.mid));
//console.log(player.mid);
//console.log(this.mid);
                if(Kiwi.Geom.Point.distanceBetween(this.mid, player.mid) > this.height/2-20){
                    this.moveTowardsEnemy();
                    if(!this.animation.getAnimation("move").isPlaying)
                        this.animation.play("move");
                }
                else{
                    if(!this.animation.getAnimation("attack").isPlaying){
                        this.animation.play("attack");
                        this.attack();
                    }
                }
            }
            else{
                var negAngle;
                var posAngle;
                //console.log(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) + "; " + this.angle);
                if(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) < this.angle){
                    negAngle = (360 - this.angle) + Kiwi.Utils.GameMath.radiansToDegrees(this.rotation);
                    posAngle = this.angle - Kiwi.Utils.GameMath.radiansToDegrees(this.rotation);
                }
                else if(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) > this.angle){
                    negAngle = Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) - this.angle;
                    posAngle = (360 - Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)) + this.angle;
                }
                //console.log("-Alpha: "+negAngle+", +Alpha: "+posAngle);
                if(negAngle < posAngle){
                    this.rotation -= Kiwi.Utils.GameMath.degreesToRadians(0.75);
                    if(!this.animation.getAnimation("move").isPlaying)
                        this.animation.play("move");
                    if(Math.floor(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)) == 0)
                        this.rotation = Kiwi.Utils.GameMath.degreesToRadians(359);
                }
                else{
                    this.rotation += Kiwi.Utils.GameMath.degreesToRadians(0.75);
                    if(!this.animation.getAnimation("move").isPlaying)
                        this.animation.play("move");
                    if(this.rotation >= 2*Math.PI){
                        console.log(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation));
                        this.rotation = Kiwi.Utils.GameMath.degreesToRadians(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)-360);
                    }
                }
            }
        }
    }
};
Kiwi.extend( Boss, Kiwi.GameObjects.Sprite );