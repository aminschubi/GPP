var myGame = new Kiwi.Game();
var myState = new Kiwi.State("myState");

myState.preload = function () {
    Kiwi.State.prototype.preload.call(this);
}

myState.create = function(){
    Kiwi.State.prototype.create.call(this);

}

myState.update = function() {
       Kiwi.State.prototype.update.call(this);

}

myGame.states.addState(myState);
myGame.states.switchState("myState");