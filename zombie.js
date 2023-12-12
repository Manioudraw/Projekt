class Zombie extends Enemy {
    constructor(game, warrior) {
        super(game, warrior);
        this.width = 85;
        this.height = 90;
        this.x = 0;
        this.y = 0;
        this.borderX = game.width;
        this.borderY = game.height;
        this.speed = 0.7;
        super.spawn(this.width, this.height);
    }

    draw(context, image){
        const enemyImg = document.getElementById(image);
        context.drawImage(enemyImg, this.x, this.y, this.width, this.height);
    }
}