var Boss = function(state, atlas, x, y){
    Kiwi.GameObjects.Sprite.call(this,state, atlas, x, y, [enableInput=false]);
    var player = state.player;
    this.searchNew = true;
    this.actualRot;
    this.playerActPos;
    this.position;
    this.angle;

    Boss.prototype.moveTowardsEnemy = function(){
        var x = this.transform.x;
        var y = this.transform.y + 2;
        var angle = this.rotation;
        var rotatedX = Math.cos(-angle) * (x - this.transform.x) - Math.sin(-angle) * (y - this.transform.y) + this.transform.x;
        var rotatedY = Math.sin(-angle) * (x - this.transform.x) - Math.cos(-angle) * (y - this.transform.y) + this.transform.y;
        this.transform.setPosition(rotatedX, rotatedY);
    }

    Boss.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        var boss = this;
        if(this.searchNew){
            console.log("Search New!");
            console.log(player.transform.getPositionPoint());
            console.log(this.transform.getPositionPoint());
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

            this.searchNew = false;
            var timer = state.clock.createTimer( "moveTimer", 2 );
            timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP,
                function() {
                    console.log( "Move!" );
                    boss.searchNew = true;
                    state.clock.removeTimer(timer );
                }
            );
            timer.start();
        }
        else if(!this.searchNew){
            //console.log(Math.floor((Kiwi.Utils.GameMath.radiansToDegrees(this.rotation))));
            //console.log(this.angle);
            if(!this.animation.getAnimation("move").isPlaying)
                this.animation.play("move");
            if(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) < 0)
                this.rotation = Kiwi.Utils.GameMath.degreesToRadians(359);

            if(Math.floor(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)) == this.angle){
                this.moveTowardsEnemy();
            }
            else{
                var negAngle;
                var posAngle;
                console.log(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) + "; " + this.angle);
                if(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) < this.angle){
                    negAngle = (360 - this.angle) + Kiwi.Utils.GameMath.radiansToDegrees(this.rotation);
                    posAngle = this.angle - Kiwi.Utils.GameMath.radiansToDegrees(this.rotation);
                }
                else if(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) > this.angle){
                    negAngle = Kiwi.Utils.GameMath.radiansToDegrees(this.rotation) - this.angle;
                    posAngle = (360 - Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)) + this.angle;
                }
                console.log("-Alpha: "+negAngle+", +Alpha: "+posAngle);
                if(negAngle < posAngle){
                    console.log("turn Left, " + Math.floor(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)));
                    this.rotation -= Kiwi.Utils.GameMath.degreesToRadians(0.75);
                    if(Math.floor(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)) == 0)
                        this.rotation = Kiwi.Utils.GameMath.degreesToRadians(359);
                }
                else{
                    console.log("turn Right, " + Math.floor(Kiwi.Utils.GameMath.radiansToDegrees(this.rotation)));
                    this.rotation += Kiwi.Utils.GameMath.degreesToRadians(0.75);
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