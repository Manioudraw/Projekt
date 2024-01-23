class Zombie extends Enemy {
    constructor(game, warrior, bullet) {
        super(game, warrior, bullet);
        this.width = 85;
        this.height = 90;
        this.x = 0;
        this.y = 0;
        this.borderX = game.width;
        this.borderY = game.height;
        this.speed = 0.7;
        this.health = 10;
        this.zombies = [];
        this.zombieSpawnInterval = 1500;
        this.lastZombieSpawnTime = 0;
    }

    draw(context, image){
        for (const zombie of this.zombies){
            const enemyImg = document.getElementById(image);
            context.drawImage(enemyImg, zombie.x, zombie.y, zombie.width, zombie.height);
        }
    }

    createZombie(){
        const newZombie = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            speed: this.speed,
            health: this.health,
        };
        
        super.spawn(newZombie.width, newZombie.height);
        this.zombies.push(newZombie);

        console.log("Zombie-Array-Length:" + this.zombies.length);

        for (const zombie of this.zombies) {
            this.updateZombiePosition(zombie);
        }
    }

    move() {
        for (const zombie of this.zombies) {
            this.updateZombiePosition(zombie);
        }
    }

    updateZombiePosition(zombie) {
        if (this.warrior.x > zombie.x) {
            zombie.x += zombie.speed;
        }
        if (this.warrior.x < zombie.x) {
            zombie.x -= zombie.speed;
        }
        if (this.warrior.y > zombie.y) {
            zombie.y += zombie.speed;
        }
        if (this.warrior.y < zombie.y) {
            zombie.y -= zombie.speed;
        }
    }

    // damage(){
    //     console.log(1);
    //     for (const bullet of this.bullet.bullets) {
    //         for (const zombie of this.zombies){
    //             if(bullet.bulletOnCharacter(zombie)){
    //                 console.log(this.health);
    //                 this.health -= 1;
    //                 console.log(this.health);
    //             }
    //         }
    //     }
    // }
}