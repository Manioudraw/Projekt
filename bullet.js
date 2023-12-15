class Bullet{
    constructor(character, warrior){
        this.width = 80;
        this.height = 80;
        this.startX = character.x + character.width / 2 - this.width / 2;
        this.startY = character.y + character.height / 2 - this.height / 2;
        this.x = this.startX;
        this.y = this.startY;
        this.speedX = 0;
        this.speedY = 0;
        this.speed = 3.5;
        this.bullets = [];    
        this.characterIdentification(character, warrior);
    }

    draw(context, imgName, character){
        for (const bullet of this.bullets){
            const bulletImg = document.getElementById(imgName);
            context.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
        }
        this.deleteBulletOutOfRange(character);
    }

    shoot(){
        for (const bullet of this.bullets){
            bullet.x += bullet.speedX * this.speed;
            bullet.y += bullet.speedY * this.speed;
        }
    }

    createBullet(xSpeed, ySpeed, character){
        this.speedX = 0;
        this.speedY = 0;
        this.startX = character.x + character.width / 2 - this.width / 2;
        this.startY = character.y + character.height / 2 - this.height / 2;

        const newBullet = {
            x: this.startX,
            y: this.startY,
            width: this.width,
            height: this.height,
            speedX: xSpeed,
            speedY: ySpeed,
        };
        this.bullets.push(newBullet);
    }

    characterIdentification(character, warrior){
        if (character.constructor.name == "Warrior"){
            this.warriorControlSetup(character);
        } else if (character.constructor.name == "Boss"){
            this.bossControlSetup(character, warrior);
        }
    }

    warriorControlSetup(character){
        document.addEventListener("keydown", (event) => {
            if (this.speedX == 0 && this.speedY == 0){
                if (event.key == "ArrowUp" || event.key == "i"){
                    this.createBullet(0, -2, character);
                } else if (event.key == "ArrowDown" || event.key == "k"){
                    this.createBullet(0, 2, character);
                } else if (event.key == "ArrowLeft" || event.key == "j"){
                    this.createBullet(-2, 0, character);
                } else if (event.key == "ArrowRight" || event.key == "l"){
                    this.createBullet(2, 0, character);
                }
            }
        });
    }

    bossControlSetup(character, warrior){
        let speedX = 0;
        let speedY = 0;
        let speed = 0.1;

        const interval = setInterval(() =>{
            let warriorX = warrior.x + (warrior.width / 2);
            let warriorY = warrior.y + (warrior.height / 2);
            let charX = character.x + (character.width / 2);
            let charY = character.y + (character.height / 2);

            if(charX > warriorX && charY > warriorY){ //Schuss nach links & oben
                speedX = Math.sqrt(charX - warriorX) * -speed;
                speedY = Math.sqrt(charY - warriorY) * -speed;
            } else if(charX > warriorX && charY < warriorY){ //Schuss nach links & unten
                speedX = Math.sqrt(charX - warriorX) * -speed;
                speedY = Math.sqrt(warriorY - charY) * speed;
            } else if(charX < warriorX && charY > warriorY){ //Schuss nach rechts & oben
                speedX = Math.sqrt(warriorX - charX) * speed;
                speedY = Math.sqrt(charY - warriorY) * -speed;
            } else if(charX < warriorX && charY < warriorY){ //Schuss nach rechts & unten
                speedX = Math.sqrt(warriorX - charX) * speed;
                speedY = Math.sqrt(warriorY - charY) * speed;
            }

            if(character.health <= 0){
                clearInterval(interval);
            } else {
               this.createBullet(speedX, speedY, character); 
            }
        }, 1500);
    }

    deleteBulletOutOfRange(character){
        for (let i = 0; i < this.bullets.length; i++){
            const bullet = this.bullets[i];
            
            if(bullet.x >= character.borderX){ //rechte Border
                this.bullets.splice(i, 1);
                i--;
            } else if(bullet.x <= (0 - this.width)){ //linke Border
                this.bullets.splice(i, 1);
                i--;
            } else if(bullet.y >= character.borderY){ //untere Border
                this.bullets.splice(i, 1);
                i--;
            } else if(bullet.y <= (0 - this.height)){ //obere Border
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }

    getBulletX(){
        return this.x;
    }

    getBulletY(){
        return this.y;
    }
}