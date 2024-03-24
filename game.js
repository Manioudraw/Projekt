let windowWidth;
let windowHeight;
let countdownSec;

class Game{
    constructor(gameCanvas){
        this.gameCanvas = gameCanvas;
        this.width = this.gameCanvas.width;
        this.height = this.gameCanvas.height;
        this.warrior = new Warrior(this);
        this.gui = new GUI(this.warrior, gameCanvas);
        this.zombie = new Zombie(this, this.warrior);
        this.boss = new Boss(this, this.warrior);
        this.bossTime = (4*60+30);
        this.bossSpawned = false;
        this.startZombieSpawning();
    }

    startZombieSpawning() {
        const spawnZombie = () => {
            this.zombie.createZombie();
            setTimeout(spawnZombie, this.zombie.zombieSpawnInterval);
        };
        spawnZombie();
    }

    render(context){
        if(this.warrior.health > 0 && this.boss.health > 0){
            this.warrior.draw(context);
            this.warrior.move(context);
            this.warrior.drawBullet(context, "warriorBullet");
            this.warrior.bulletShoot();
            if(!this.bossSpawned) {
                this.zombie.draw(context, "zombie");
                this.zombie.move();
                this.zombie.checkBodyCollision(this.warrior);
                this.warrior.checkBulletCollisionZombie(this.zombie.zombies);
            }
            
    
            // var bossTime = (4*60+50);
            localStorage.setItem("bossTime", this.bossTime);

            if(this.gui.countdown == (this.bossTime+7)) {
                this.playSound("bossCountdown");
            }

            if(this.gui.countdown == this.bossTime) {
                this.playSound("bossAppearance");
                this.bossSpawned = true;
            }

            if(this.gui.countdown <= this.bossTime && this.boss.health > 0) {
                this.boss.draw(context, "boss");
                this.boss.move();
                this.boss.drawBullet(context, "heartDamage");
                this.boss.bulletShoot();
                this.boss.checkBulletCollision(this.warrior);
                this.boss.checkBodyCollision(this.warrior);
                this.warrior.checkBulletCollisionBoss(this.boss);
            }
            

            // if(this.gui.countdown <= bossAppearance && this.boss.health > 0) {
            //     this.boss.draw(context, "boss");
            //     this.boss.move();
            //     this.boss.drawBullet(context, "heartDamage");
            //     this.boss.bulletShoot();
            //     this.boss.checkBulletCollision(this.warrior);
            //     this.boss.checkBodyCollision(this.warrior);
            //     this.warrior.checkBulletCollisionBoss(this.boss);
            // }
        }
    }

    playSound(elementId) {
        var audio = document.getElementById(elementId);
        var button = document.getElementById("buttonAudio");
        var audioVolume = localStorage.getItem("soundEffect");

        if(audioVolume != null) {
            audio.volume = audioVolume;
        } else {
            audio.volume = 0.3;
        }

        if (button.innerHTML == "Pause Audio") {
            audio.play();
        } else if (button.innerHTML == "Play Audio"){
            audio.pause();
        }
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
        game.gui.deleteWarriorHearts(this.warrior.health);
        requestAnimationFrame(update);

        // if(game.warrior.health <= 0){
        //     console.log("drinnen");
        //     canvContext.clearRect(0, 0, this.width, this.height);
        // }
    }
    update();
    
    game.gui.warriorHearts(game.warrior.health);
    game.gui.timer(5 * 60);

    //Wenn die Größe des Browser-Fensters verändert wird, wird die Fenster-Breite und -Höhe neu berechnet & dem "gameCanvas" neu übergeben
    window.onresize = function(){
        windowDimensions(gameCanvas);
    }
});