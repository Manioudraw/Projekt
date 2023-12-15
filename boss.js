class Boss extends Enemy {
    constructor(game, warrior) {
        super(game, warrior);
        this.width = 200;
        this.height = 200;
        this.x = 0;
        this.y = 0;
        this.borderX = game.width;
        this.borderY = game.height;
        this.speed = 0.5;
        this.health = 150;
        super.spawn(this.width, this.height);
    }

    draw(context, image){
        const enemyImg = document.getElementById(image);
        context.drawImage(enemyImg, this.x, this.y, this.width, this.height);
    }
}