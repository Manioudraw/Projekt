class Warrior{
    constructor(game){
        this.game = game;
        this.width = 80;
        this.height = 80;
        this.x = (game.width * 0.5) - (this.width * 0.5);
        this.y = (game.height * 0.5) - (this.height * 0.5);
        this.borderX = game.width;
        this.borderY = game.height;
        this.speed = 5;
        this.health = 5;
        this.keyPressed = {};
        this.controlSetup();

        //Bullet-Management
        this.bullets = [];
        this.bulletWidth = 80;
        this.bulletHeight = 80;
        this.bulletSpeed = 3.5;
        this.speedX = 0;
        this.speedY = 0;
        this.canCollide = true;
        this.bulletControlSetup();
    }

    draw(context){
        const warriorImg = document.getElementById("warrior");
        context.drawImage(warriorImg, this.x, this.y, this.width, this.height);
    }

    move(){
        let moveX = 0;
        let moveY = 0;

        var up = localStorage.getItem("up");
        var down = localStorage.getItem("down");
        var right = localStorage.getItem("right");
        var left = localStorage.getItem("left");

        //Standard-Tastenbelegung, falls diese nicht indiviualisiert ist
        if (up == null){
            up = "w";
            localStorage.setItem("up", up);
        }
        if (down == null){
            down = "s";
            localStorage.setItem("down", down);
        }
        if (right == null){
            right = "d";
            localStorage.setItem("right", right);
        }
        if (left == null){
            left = "a";
            localStorage.setItem("left", left);
        }

        //Bewegung nach der Tastenbelegung
        if(this.keyPressed[up]){
            moveY -= this.speed;
        }
        if(this.keyPressed[left]){
            moveX -= this.speed;
        }
        if(this.keyPressed[down]){
            moveY += this.speed;
        }
        if(this.keyPressed[right]){
            moveX += this.speed;
        }

        this.x += moveX;
        this.y += moveY;

        this.borderCheck();
    }

    //Verhindern, dass der Warrior aus dem Spielfeld laufen kann.
    borderCheck(){
        if(this.x >= (this.borderX - this.width * 0.4)){ //rechte Border
            this.x = this.borderX - this.width * 0.4;
        } else if(this.x <= (0 - this.width * 0.4)){ //linke Border
            this.x = 0 - this.width * 0.4;
        } else if(this.y >= (this.borderY - this.height * 0.8)){ //untere Border
            this.y = this.borderY - this.height * 0.8;
        } else if(this.y <= (0 - this.height * 0.4)){ //obere Border
            this.y = 0 - this.height * 0.4;
        }
    }

    controlSetup(){
        //Wenn eine Taste gedrückt wird, wird ihr Status auf "true" gesetzt.
        document.addEventListener("keydown", (event) => {
            this.keyPressed[event.key] = true;
        });

        //Wenn die Taste nicht mehr gedrückt wird, bekommt sie den Status "false".
        document.addEventListener("keyup", (event) => {
            this.keyPressed[event.key] = false;
        });
    }
    //Bullet-Management

    drawBullet(context, imgName){
        for (const bullet of this.bullets){
            const bulletImg = document.getElementById(imgName);
            context.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
        }
        this.deleteBulletOutOfRange();
    }

    checkHealth(){
        if(this.health <= 0){
            let warriorDead = document.getElementById("warrior");
            warriorDead.remove();
        }
    }

    bulletControlSetup(){
        var canShoot = true;

        document.addEventListener("keydown", (event) => {
            if (this.speedX == 0 && this.speedY == 0 && canShoot){

                var upShot = localStorage.getItem("upShot");
                var downShot = localStorage.getItem("downShot");
                var rightShot = localStorage.getItem("rightShot");
                var leftShot = localStorage.getItem("leftShot");

                //Standard-Tastenbelegung, falls diese nicht indiviualisiert ist
                if (upShot == null){
                    upShot = "ArrowUp";
                    localStorage.setItem("upShot", upShot);
                }
                if (downShot == null){
                    downShot = "ArrowDown";
                    localStorage.setItem("downShot", downShot);
                }
                if (rightShot == null){
                    rightShot = "ArrowRight";
                    localStorage.setItem("rightShot", rightShot);
                }
                if (leftShot == null){
                    leftShot = "ArrowLeft";
                    localStorage.setItem("leftShot", leftShot);
                }

                if (event.key == upShot){
                    this.createWarriorBullet(0, -2);
                    this.playShotSound();
                } else if (event.key == downShot){
                    this.createWarriorBullet(0, 2);
                    this.playShotSound();
                } else if (event.key == leftShot){
                    this.createWarriorBullet(-2, 0);
                    this.playShotSound();
                } else if (event.key == rightShot){
                    this.createWarriorBullet(2, 0);
                    this.playShotSound();
                }

                canShoot = false;
                setTimeout(function() {
                    canShoot = true;
                }, 500);
            }
        });
    }

    playShotSound() {
        var audio = document.getElementById("punchWarrior");
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

    createWarriorBullet(xSpeed, ySpeed){
        this.speedX = 0;
        this.speedY = 0;
        let startX = this.x + this.width / 2 - this.bulletWidth / 2;
        let startY = this.y + this.height / 2 - this.bulletHeight / 2;

        const newBullet = {
            x: startX,
            y: startY,
            width: this.bulletWidth,
            height: this.bulletHeight,
            speedX: xSpeed,
            speedY: ySpeed,
        };

        this.bullets.push(newBullet);
    }

    bulletShoot(){
        for (const bullet of this.bullets){
            bullet.x += bullet.speedX * this.bulletSpeed;
            bullet.y += bullet.speedY * this.bulletSpeed;
        }
    }

    checkBulletCollisionBoss(enemy){
        for (const bullet of this.bullets){
            if (
                this.canCollide &&
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemy.health -= 1;

                this.canCollide = false;
                setTimeout(() => {
                    this.canCollide = true;
                }, 500);

                if(enemy.health <= 0){
                    enemy.bullets = [];

                    let enemyElement = document.getElementById("boss");
                    enemyElement.remove();
                }
            }
        }
    }

    checkBulletCollisionZombie(zombieArray){
        for(const enemy of zombieArray){
            for (const bullet of this.bullets){
                if (
                    this.canCollide &&
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    enemy.health -= 1;

                    this.canCollide = false;
                    setTimeout(() => {
                        this.canCollide = true;
                    }, 50);

                    if(enemy.health <= 0){
                        zombieArray.splice(zombieArray.indexOf(enemy), 1);
                    }
                }
            }
        }
    }

    deleteBulletOutOfRange(){
        for (let i = 0; i < this.bullets.length; i++){
            const bullet = this.bullets[i];

            if (
                bullet.x >= this.borderX || //rechte Border
                bullet.x <= (0 - this.bulletWidth) || //linke Border
                bullet.y >= this.borderY || //untere Border
                bullet.y <= (0 - this.bulletHeight) //obere Border
            ) {
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }
}