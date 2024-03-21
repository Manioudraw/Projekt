class Boss extends Enemy {
    constructor(game, warrior, bullet) {
        super(game, warrior, bullet);
        this.width = 200;
        this.height = 200;
        this.x = 0;
        this.y = 0;
        this.borderX = game.width;
        this.borderY = game.height;
        this.speed = 0.5;
        this.health = 2;
        super.spawn(this.width, this.height);

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

    draw(context, image){
        const enemyImg = document.getElementById(image);
        context.drawImage(enemyImg, this.x, this.y, this.width, this.height);
    }

    checkBodyCollision(warrior){
        if (
            this.canCollide &&
            this.x < warrior.x + warrior.width &&
            this.x + this.width > warrior.x &&
            this.y < warrior.y + warrior.height &&
            this.y + this.height > warrior.y
        ) {
            warrior.health -= 1;

            this.canCollide = false;
            setTimeout(() => {
                this.canCollide = true;
            }, 500);
        }
    }

    //Bullet-Management

    drawBullet(context, imgName){
        for (const bullet of this.bullets){
            const bulletImg = document.getElementById(imgName);
            context.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
        }
        this.deleteBulletOutOfRange();
    }

    bulletControlSetup(){
        let speedX = 0;
        let speedY = 0;
        let speed = 0.1;
        var shot = false;

        const interval = setInterval(() =>{
            let warriorX = this.warrior.x + (this.warrior.width / 2);
            let warriorY = this.warrior.y + (this.warrior.height / 2);
            let charX = this.x + (this.width / 2);
            let charY = this.y + (this.height / 2);

            if(charX > warriorX && charY > warriorY){ //Schuss nach links & oben
                speedX = Math.sqrt(charX - warriorX) * -speed;
                speedY = Math.sqrt(charY - warriorY) * -speed;
                this.shotSound();
                shot = true;
            } else if(charX > warriorX && charY < warriorY){ //Schuss nach links & unten
                speedX = Math.sqrt(charX - warriorX) * -speed;
                speedY = Math.sqrt(warriorY - charY) * speed;
                this.shotSound();
                shot = true;
            } else if(charX < warriorX && charY > warriorY){ //Schuss nach rechts & oben
                speedX = Math.sqrt(warriorX - charX) * speed;
                speedY = Math.sqrt(charY - warriorY) * -speed;
                this.shotSound();
                shot = true;
            } else if(charX < warriorX && charY < warriorY){ //Schuss nach rechts & unten
                speedX = Math.sqrt(warriorX - charX) * speed;
                speedY = Math.sqrt(warriorY - charY) * speed;
                this.shotSound();
                shot = true;
            }

            localStorage.setItem("shot", shot);

            if(this.health <= 0){
                clearInterval(interval);
            } else {
               this.createBossBullet(speedX, speedY); 
            }
        }, 1500);
    }

    shotSound() {
        var audio = document.getElementById("bossShot");
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

    createBossBullet(xSpeed, ySpeed){
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

    checkBulletCollision(warrior){
        for (const bullet of this.bullets){
            if (
                this.canCollide &&
                bullet.x < warrior.x + warrior.width &&
                bullet.x + bullet.width > warrior.x &&
                bullet.y < warrior.y + warrior.height &&
                bullet.y + bullet.height > warrior.y
            ) {
                warrior.health -= 1;

                this.canCollide = false;
                setTimeout(() => {
                    this.canCollide = true;
                }, 1500);
            }
        }
    }
}