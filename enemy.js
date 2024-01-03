class Enemy{
    constructor(game, warrior, bullet) {
        this.game = game;
        this.warrior = warrior;
        this.bullet = bullet;
        this.startX = 0;
        this.startY = 0;
        this.x = 0;
        this.y = 0;
        this.borderX = game.width;
        this.borderY = game.height;
    }

    //Enemies spawnen am Rand. An welchem Rand oder bei welchen Koordinaten ist random.
    spawn(width, height){
        let random = Math.random();

        if(random >= 0 && random <= 0.25){ //oben
            this.x = Math.floor(Math.random() * this.borderX);
            this.y = 0 - height ;
        } else if(random > 0.25 && random <= 0.5){ //rechts
            this.x = this.borderX;
            this.y = Math.floor(Math.random() * this.borderY);
        } else if(random > 0.5 && random <= 0.75){ //unten
            this.x = Math.floor(Math.random() * this.borderX);
            this.y = this.borderY;
        } else if(random > 0.75 && random <= 1){ //links
            this.x = 0 - width;
            this.y = Math.floor(Math.random() * this.borderY);
        }

        this.startX = this.x;
        this.startY = this.y;
        // console.log(random);
        // console.log(this.startX);
    }

    //Gegner bewegen sich in Richtung des Gegners
    move(){
        if(this.warrior.x > this.x){
            this.x += this.speed;
        }
        if(this.warrior.x < this.x){
            this.x -= this.speed;
        }
        if(this.warrior.y > this.y){
            this.y += this.speed;
        }
        if(this.warrior.y < this.y){
            this.y -= this.speed;
        }
    }
}