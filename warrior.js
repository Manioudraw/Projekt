class Warrior{
    constructor(game){
        this.game = game;
        this.width = 80;
        this.height = 80;
        this.x = (game.width * 0.5) - (this.width * 0.5);
        this.y = (game.height * 0.5) - (this.height * 0.5);
        this.borderX = game.width;
        this.borderY = game.height;
        this.speed = 3;
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
        this.bulletControlSetup();
    }

    draw(context){
        const warriorImg = document.getElementById("warrior");
        context.drawImage(warriorImg, this.x, this.y, this.width, this.height);
    }

    move(){
        let moveX = 0;
        let moveY = 0;

        if(this.keyPressed["w"]){
            moveY -= this.speed;
        }
        if(this.keyPressed["a"]){
            moveX -= this.speed;
        }
        if(this.keyPressed["s"]){
            moveY += this.speed;
        }
        if(this.keyPressed["d"]){
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

    bulletControlSetup(){
        document.addEventListener("keydown", (event) => {
            if (this.speedX == 0 && this.speedY == 0){
                if (event.key == "ArrowUp" || event.key == "i"){
                    this.createWarriorBullet(0, -2);
                } else if (event.key == "ArrowDown" || event.key == "k"){
                    this.createWarriorBullet(0, 2);
                } else if (event.key == "ArrowLeft" || event.key == "j"){
                    this.createWarriorBullet(-2, 0);
                } else if (event.key == "ArrowRight" || event.key == "l"){
                    this.createWarriorBullet(2, 0);
                }
            }
        });
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