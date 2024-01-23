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
        this.health = 15;
        this.zombies = [];
        this.zombieSpawnInterval = 2000;
        this.lastZombieSpawnTime = 0;
        this.canCollide = true;
        super.spawn(this.width, this.height);
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

    checkBodyCollision(warrior){
        for (const zombie of this.zombies) {
            if (
                this.canCollide &&
                zombie.x < warrior.x + warrior.width &&
                zombie.x + zombie.width > warrior.x &&
                zombie.y < warrior.y + warrior.height &&
                zombie.y + zombie.height > warrior.y
            ) {
                warrior.health -= 1;

                this.canCollide = false;
                setTimeout(() => {
                    this.canCollide = true;
                }, 1000);
            }
        }
    }
}