class Bullet{
    constructor(warrior){
        this.warrior = warrior;
        this.width = 80;
        this.height = 80;
        this.startX = this.warrior.x + this.warrior.width / 2 - this.width / 2;
        this.startY = this.warrior.y + this.warrior.height / 2 - this.height / 2;
        this.x = this.startX;
        this.y = this.startY;
        this.speedX = 0;
        this.speedY = 0;
        this.bullets = [];    
        this.controlSetup();
    }

    draw(context){
        for (const bullet of this.bullets) {
            const bulletImg = document.getElementById("warriorBullet");
            context.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
        }
        this.deleteBulletOutOfRange();
    }

    shoot() {
        for (const bullet of this.bullets) {
            bullet.x += bullet.speedX;
            bullet.y += bullet.speedY;
        }
    }

    createBullet(xSpeed, ySpeed){
        this.speedX = 0;
        this.speedY = 0;
        this.startX = this.warrior.x + this.warrior.width / 2 - this.width / 2;
        this.startY = this.warrior.y + this.warrior.height / 2 - this.height / 2;

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

    controlSetup() {
        document.addEventListener("keydown", (event) => {
            if (this.speedX == 0 && this.speedY == 0) {
                if (event.key == "ArrowUp") {
                    this.createBullet(0, -2);
                } else if (event.key == "ArrowDown") {
                    this.createBullet(0, 2);
                } else if (event.key == "ArrowLeft") {
                    this.createBullet(-2, 0);
                } else if (event.key == "ArrowRight") {
                    this.createBullet(2, 0);
                }
            }
        });
    }

    deleteBulletOutOfRange(){
        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i];
            //rechte Border
            if(bullet.x >= this.warrior.borderX){
                this.bullets.splice(i, 1);
                i--;
            }//linke Border
            else if(bullet.x <= (0 - this.width)){
                this.bullets.splice(i, 1);
                i--;
            }//untere Border
            else if(bullet.y >= this.warrior.borderY){
                this.bullets.splice(i, 1);
                i--;
            }//obere Border
            else if(bullet.y <= (0 - this.height)){
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }
}