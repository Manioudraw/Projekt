let windowWidth;
let windowHeight;
let countdownSec;

class Game{
    constructor(gameCanvas){
        this.gameCanvas = gameCanvas;
        this.width = this.gameCanvas.width;
        this.height = this.gameCanvas.height;
        this.warrior = new Warrior(this);
        this.enemy = new Zombie(this, this.warrior);
        this.boss = new Boss(this, this.warrior);
        this.gui = new GUI();
    }

    render(context){
        this.warrior.draw(context);
        this.warrior.move(context);
        this.enemy.draw(context, "zombie");
        this.enemy.move();
        this.boss.draw(context, "boss");
        this.boss.move();
    }
}

//Höhe & Breite des Fensters berechnen und dies dem "gameCanvas" übergeben
function windowDimensions(gameCanvas){
    windowWidth = window.innerWidth - 200;
    windowHeight = window.innerHeight - 150;
    gameCanvas.width = windowWidth;
    gameCanvas.height = windowHeight;
}

window.addEventListener("load", function(){
    const gameCanvas = document.getElementById("canvas");
    const canvContext = gameCanvas.getContext("2d");
    windowDimensions(gameCanvas);

    const game = new Game(gameCanvas);
    
    //Der Warrior wird gelöscht und danach neu gerendert/gezeichnet
    function update(){
        canvContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
        game.render(canvContext);
        requestAnimationFrame(update);
    }
    update();
    
    game.gui.warriorHearts(game.warrior.health);
    game.gui.timer(5 * 60);

    //Wenn die Größe des Browser-Fensters verändert wird, wird die Fenster-Breite und -Höhe neu berechnet & dem "gameCanvas" neu übergeben
    window.onresize = function(){
        windowDimensions(gameCanvas);
    }
});