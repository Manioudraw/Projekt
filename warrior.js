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
}