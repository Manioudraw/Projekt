class GUI{
    constructor(warrior, gameCanvas){
        this.warrior = warrior;
        this.gameCanvas = gameCanvas;
        this.countdown = 0;
        this.healthCounter = this.warrior.health;
    }

    warriorHearts(warriorHealth){
        for(let i = 0; i < warriorHealth; i++){
            var heart = new Image();
            heart.src = "./images/heart.png";
            document.getElementById("body").appendChild(heart);
            heart.id = "warriorHeart" + i;
        }
    }

    deleteWarriorHearts(){
        if(this.warrior.health < this.healthCounter && this.warrior.health >= 0){
            let currentWarriorHeart = document.getElementById("warriorHeart" + this.warrior.health);
            currentWarriorHeart.remove();
            this.playSound("warriorHit");
            this.healthCounter -= 1;
        }
    }

    clearGUI(){
        for(let i = 0; i < this.warrior.health; i++){
            let heart = document.getElementById("warriorHeart" + i);
            heart.remove();
        }
    }
    
    timer(countdownSec){
        var timer = document.getElementById("timer");

        const interval = setInterval(() => {
            var winOption = localStorage.getItem("bossDead");
            var minutes = Math.floor((countdownSec % 60000 / 6000) * 100);
            var seconds = countdownSec % 60;

            timer.textContent = this.timerDraw(seconds, minutes);
            countdownSec -= 1;
        
            if(countdownSec <= 0){
                timer.textContent = "Time is Over!";
                this.playSound("losing");
                clearInterval(interval);
            }
            if(this.warrior.health <= 0){
                timer.textContent = "You Died!";
                this.playSound("losing");
                clearInterval(interval);
            }
            if(winOption == "true"){
                timer.textContent = "You Win!";
                this.playSound("winning");
                clearInterval(interval);
            }

            this.countdown = countdownSec;
            localStorage.setItem("countdown", countdownSec);
        }, 1000);
    }

    //timerDraw() fügt eine "0" vor eine einstellige Zahl
    timerDraw(seconds, minutes){
        if(seconds < 10 && minutes < 10){
            return "0" + minutes + " : 0" + seconds;
        } else if(seconds < 10 && minutes >= 10){
            return minutes + " : 0" + seconds;
        } else if(seconds >= 10 && minutes < 10){
            return "0" + minutes + " : " + seconds;
        } else {
            return minutes + " : " + seconds;
        }
    }

    playSound(elementId) {
        var audio = document.getElementById(elementId);
        var button = document.getElementById("buttonAudio");
        var audioVolume = localStorage.getItem("soundEffect");

        if(audioVolume != null) {
            audio.volume = audioVolume;
        } else {
            audio.volume = 0.3;
        }

        if (button.innerHTML == "Pause Audio") {
            audio.play();
        } else if (button.innerHTML == "Play Audio"){
            audio.pause();
        }
    }
}