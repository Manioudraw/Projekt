class GUI{
    warriorHearts(warriorHealth){
        for(let i = 0; i < warriorHealth; i++){
            var heart = new Image();
            heart.src = "./images/heart.png";
            document.getElementById("body").appendChild(heart);
            heart.id = "warriorHeart";
        }
    }
    
    timer(countdownSec){
        var timer = document.getElementById("timer");

        const interval = setInterval(() => {
            var minutes = Math.floor((countdownSec % 60000 / 6000) * 100);
            var seconds = countdownSec % 60;

            timer.textContent = this.timerDraw(seconds, minutes);
            countdownSec -= 1;
        
            if(countdownSec <= 0){
                timer.textContent = "Time is Over!";
                clearInterval(interval);
            }
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
}