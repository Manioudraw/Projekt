let gameCounter = 0;

class Tutorial{
    constructor(gameCanvas){
        this.gameCanvas = gameCanvas;
        this.width = this.gameCanvas.width;
        this.height = this.gameCanvas.height;
        this.warrior = new Warrior(this);
        this.gui = new GUI(this.warrior, canvas);
        this.zombie = new Zombie(this, this.warrior);
        this.boss = new Boss(this, this.warrior);
        this.bossTime = (4*60+30);
        this.bossSpawned = false;
        this.currentGameNumber = 0;
        this.startZombieSpawning();
    }

    startZombieSpawning(){
        if(gameCounter == 1){
            const spawnSingleZombie = () => {
                this.zombie.createZombie();
                setTimeout(spawnSingleZombie, 9000);
            }
            spawnSingleZombie();
        }

        if(gameCounter == 2){
            const spawnZombie = () => {
                this.zombie.createZombie();
                setTimeout(spawnZombie, 2000);
            }
            spawnZombie();
        }
    }

    render(context){
        if(this.warrior.health > 0 && this.boss.health > 0){
            this.warrior.draw(context);
            this.warrior.move(context);
            this.warrior.drawBullet(context, "warriorBullet");
            this.warrior.bulletShoot();

            if(gameCounter-1 == 1 || gameCounter-1 == 2){
                this.zombie.draw(context, "zombie");
                this.zombie.move();
                this.zombie.checkBodyCollision(this.warrior);
                this.warrior.checkBulletCollisionZombie(this.zombie.zombies);
            }

            if(gameCounter-1 == 3){
                this.boss.draw(context, "boss");
                this.boss.move();
                this.boss.drawBullet(context, "heartDamage");
                this.boss.bulletShoot();
                this.boss.checkBulletCollision(this.warrior);
                this.boss.checkBodyCollision(this.warrior);
                this.warrior.checkBulletCollisionBoss(this.boss);
            }
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
    canvContext.font = "500% Georgia";
    const textWidth = canvContext.measureText("Willkommen im Tutorial!").width;
    const textHeight = canvContext.measureText("M").width;
    const posX = (gameCanvas.width - textWidth) / 2;
    const posY = (gameCanvas.height + textHeight) / 2;
    canvContext.fillText("Willkommen im Tutorial!", posX, posY);

    const buttonFurther = document.getElementById("buttonFurther");
    const videoURLs = ["./videos/test_video.mp4", "./videos/test_video2.mp4", "./videos/test_video.mp4", "./videos/test_video2.mp4"];
    let currentVideoNumber = 0;
    let mode = false;
    modeSelection(buttonFurther, mode, currentVideoNumber, videoURLs, canvContext);

    window.onresize = function(){
        windowDimensions(gameCanvas);
    }
});

function modeSelection(button, mode, currentVideoNumber, videoURLs, canvasContext){
    button.addEventListener("click", () => {
        const canvas = document.getElementById("canvas");
        canvasContext = canvas.getContext("2d");
        windowDimensions(canvas);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        
        const tutorial = new Tutorial(canvas);

        if(mode == false && videoURLs.length > currentVideoNumber){
            // var video = document.createElement("video");
            // video.setAttribute("src",  videoURLs[currentVideoNumber]);
            // const videoWidth = video.videoWidth;
            // const videoHeight = video.videoHeight;
            // canvas.width = videoWidth * 0.9;
            // canvas.height = videoHeight * 0.9;
            canvas.width = window.innerWidth - 200;
            canvas.height = window.innerHeight - 150;
            playVideo(currentVideoNumber, videoURLs, canvas, canvasContext, tutorial);
            currentVideoNumber += 1;
            mode = true;
        } else if (mode == true && videoURLs.length > gameCounter){
            windowDimensions(canvas);
            if(gameCounter < 2){
                warriorMechanics(canvas, canvasContext, tutorial);
            } else if (gameCounter == 2){
                zombieMechanics(canvas, canvasContext, tutorial);
            } else if (gameCounter == 3){
                bossMechanics(canvas, canvasContext, tutorial);
            }
            gameCounter += 1;
            mode = false;
        } else {
            let draw = function(){
                canvasContext.clearRect(0, 0, canvas.width, canvas.height);
                canvasContext.font = "500% Georgia";
                const textWidth = canvasContext.measureText("Du hast das Tutorial beendet!").width;
                const textHeight = canvasContext.measureText("M").width;
                const posX = (canvas.width - textWidth) / 2;
                const posY = (canvas.height + textHeight) / 2;
                canvasContext.fillText("Du hast das Tutorial beendet!", posX, posY);
                requestAnimationFrame(draw);
            }
            draw();
            playSound("tutorialEnd");
            tutorial.gui.clearGUI();
            button.remove();
        }
    });
}

function playVideo(currentVideoNumber, videoURLs, canvas, canvasContext, tutorial){
    if(currentVideoNumber == 2 || currentVideoNumber == 3){
        tutorial.gui.clearGUI();
    }
    if(currentVideoNumber == 3 || currentVideoNumber == 4){
        tutorial.gui.clearTimer();
    }

    var video = document.createElement("video");
    video.setAttribute("src",  videoURLs[currentVideoNumber]);
    video.play();

    let draw = function(){
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
    }
    draw();
}

function playSound(soundID){
    if(soundID == "tutorialWelcome" && (!sessionStorage.getItem("soundPlayed"))){
        var audio = document.getElementById(soundID);
        audio.play();
        sessionStorage.setItem("soundPlayed", true);
    } else if(!(soundID == "tutorialWelcome")) {
        var audio = document.getElementById(soundID);
        var button = document.getElementById("buttonAudio");
        if (button.innerHTML == "Pause Audio") {
            audio.play();
        } else if (button.innerHTML == "Play Audio"){
            audio.pause();
        }
    }
}

window.addEventListener("beforeunload", function() {
    sessionStorage.removeItem("soundPlayed");
});



//Funktionen für Spielumgebungen des Tutorials
function warriorMechanics(canvas, canvasContext, tutorial){
    function update(){
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        tutorial.render(canvasContext);
        if(gameCounter == 2){
            tutorial.gui.deleteWarriorHearts(tutorial.warrior.health);
        }
        requestAnimationFrame(update);
    }
    update();

    if(gameCounter == 1){
        tutorial.gui.warriorHearts(tutorial.warrior.health);
    }
}

function zombieMechanics(canvas, canvasContext, tutorial){
    function update(){
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        tutorial.render(canvasContext);
        if(gameCounter > 0){
            tutorial.gui.deleteWarriorHearts(tutorial.warrior.health);
        }
        requestAnimationFrame(update);
    }
    update();

    tutorial.gui.warriorHearts(tutorial.warrior.health);
    tutorial.gui.timer(2 * 60);
}

function bossMechanics(canvas, canvasContext, tutorial){
    function update(){
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        tutorial.render(canvasContext);
        if(gameCounter > 0){
            tutorial.gui.deleteWarriorHearts(tutorial.warrior.health);
        }
        requestAnimationFrame(update);
    }
    update();

    tutorial.gui.warriorHearts(tutorial.warrior.health);
}