class Enemy{
    constructor(game, warrior) {
        this.game = game;
        this.warrior = warrior;
        this.startX = 0;
        this.startY = 0;
        this.x = 0;
        this.y = 0;
        this.borderX = game.width;
        this.borderY = game.height;
        this.canCollide = true;
    }

    //Enemies spawnen am Rand. An welchem Rand oder bei welchen Koordinaten ist random.
    spawn(width, height){
        let random = Math.random();

        if(random >= 0 && random <= 0.25){ //oben
            this.x = Math.floor(Math.random() * this.borderX);
            this.y = 0 - height - 50;
        } else if(random > 0.25 && random <= 0.5){ //rechts
            this.x = this.borderX + 50;
            this.y = Math.floor(Math.random() * this.borderY);
        } else if(random > 0.5 && random <= 0.75){ //unten
            this.x = Math.floor(Math.random() * this.borderX);
            this.y = this.borderY + 50;
        } else if(random > 0.75 && random <= 1){ //links
            this.x = 0 - width - 50;
            this.y = Math.floor(Math.random() * this.borderY);
        }

        this.startX = this.x;
        this.startY = this.y;
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