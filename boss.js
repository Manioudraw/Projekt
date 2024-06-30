class Boss extends Enemy {
    constructor(game, warrior, bullet) {
        super(game, warrior, bullet);
        this.width = 200;
        this.height = 200;
        this.x = 0;
        this.y = 0;
        this.borderX = game.width;
        this.borderY = game.height;
        this.speed = 0.5;
        this.health = 13;
        this.difficultyAdjustments();
        super.spawn(this.width, this.height);

        //Bullet-Management
        this.bullets = [];
        this.bulletWidth = 50;
        this.bulletHeight = 50;
        this.bulletSpeed = 3.5;
        this.speedX = 0;
        this.speedY = 0;
        this.canCollide = true;
        this.bulletControlSetup();

        //Sounds
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.listener = this.audioContext.listener;
        this.bossSounds = {
            walking: './audio/soundFiles/enemies/enemyFootsteps.mp3',
            shooting: './audio/soundFiles/enemies/bossShotPos.mp3'
        };
        this.audioBuffers = {};
        this.soundCooldown = false;
        this.loadSounds();
    }

    draw(context, image){
        const enemyImg = document.getElementById(image);
        context.drawImage(enemyImg, this.x, this.y, this.width, this.height);

        if(this.checkForSoundAvailibility()){
            this.playMovingSound();
        }
    }

    checkBodyCollision(warrior){
        if (
            this.canCollide &&
            this.x < warrior.x + warrior.width &&
            this.x + this.width > warrior.x &&
            this.y < warrior.y + warrior.height &&
            this.y + this.height > warrior.y
        ) {
            warrior.health -= 1;

            this.canCollide = false;
            setTimeout(() => {
                this.canCollide = true;
            }, 500);
        }
    }

    //Bullet-Management

    drawBullet(context, imgName){
        for (const bullet of this.bullets){
            const bulletImg = document.getElementById(imgName);
            context.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
        }
        this.deleteBulletOutOfRange();
    }

    bulletControlSetup(){
        let speedX = 0;
        let speedY = 0;
        let speed = 0.1;

        const interval = setInterval(() =>{
            let warriorX = this.warrior.x + (this.warrior.width / 2);
            let warriorY = this.warrior.y + (this.warrior.height / 2);
            let charX = this.x + (this.width / 2);
            let charY = this.y + (this.height / 2);

            if(charX > warriorX && charY > warriorY){ //Schuss nach links & oben
                speedX = Math.sqrt(charX - warriorX) * -speed;
                speedY = Math.sqrt(charY - warriorY) * -speed;
            } else if(charX > warriorX && charY < warriorY){ //Schuss nach links & unten
                speedX = Math.sqrt(charX - warriorX) * -speed;
                speedY = Math.sqrt(warriorY - charY) * speed;
            } else if(charX < warriorX && charY > warriorY){ //Schuss nach rechts & oben
                speedX = Math.sqrt(warriorX - charX) * speed;
                speedY = Math.sqrt(charY - warriorY) * -speed;
            } else if(charX < warriorX && charY < warriorY){ //Schuss nach rechts & unten
                speedX = Math.sqrt(warriorX - charX) * speed;
                speedY = Math.sqrt(warriorY - charY) * speed;
            }
            
            var soundPlayed = false;
            var bossDead = false;
            localStorage.setItem("bossDead", bossDead);
            var bossAppearance = localStorage.getItem("bossTime");
            var timer = localStorage.getItem("countdown");
            
            if(this.health <= 0){
                clearInterval(interval);
                bossDead = true;
                localStorage.setItem("bossDead", bossDead);
            } else {
                this.createBossBullet(speedX, speedY);
                if (!soundPlayed && timer <= bossAppearance && this.warrior.health > 0) {    
                    this.playSound("bossShot");
                }
            }
        }, 1500);
    }

    createBossBullet(xSpeed, ySpeed){
        this.speedX = 0;
        this.speedY = 0;
        let startX = this.x + this.width / 2 - this.bulletWidth / 2;
        let startY = this.y + this.height / 2 - this.bulletHeight / 2;

        const newBullet = {
            x: startX,
            y: startY,
            width: this.bulletWidth,
            height: this.bulletHeight,
            speedX: xSpeed,
            speedY: ySpeed,
            soundCooldown: false
        };
        this.bullets.push(newBullet);
    }

    bulletShoot(){
        for (const bullet of this.bullets){
            bullet.x += bullet.speedX * this.bulletSpeed;
            bullet.y += bullet.speedY * this.bulletSpeed;

            if(this.checkForSoundAvailibility()){
                this.playShootingSound(bullet);
            }
        }
    }

    deleteBulletOutOfRange(){
        for (let i = 0; i < this.bullets.length; i++){
            const bullet = this.bullets[i];

            if (
                bullet.x >= this.borderX || //rechte Border
                bullet.x <= (0 - this.bulletWidth) || //linke Border
                bullet.y >= this.borderY || //untere Border
                bullet.y <= (0 - this.bulletHeight) //obere Border
            ) {
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }

    checkBulletCollision(warrior){
        for (const bullet of this.bullets){
            if (
                this.canCollide &&
                bullet.x < warrior.x + warrior.width &&
                bullet.x + bullet.width > warrior.x &&
                bullet.y < warrior.y + warrior.height &&
                bullet.y + bullet.height > warrior.y
            ) {
                warrior.health -= 1;

                this.canCollide = false;
                setTimeout(() => {
                    this.canCollide = true;
                }, 1500);
            }
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

    difficultyAdjustments() {
        if(localStorage.getItem("difficulty") != null) {
            var difficulty = localStorage.getItem("difficulty");

            if(difficulty == "easy"){
                this.health = 10;
            } else if(difficulty == "normal") {
                this.health = 13;
            } else if(difficulty == "medium") {
                this.health = 15;
            } else if(difficulty == "advanced") {
                this.health = 18;
            } else if(difficulty == "challenging") {
                this.health = 20;
            }
        }
    }

    checkForSoundAvailibility(){
        var button = document.getElementById("buttonAudio");

        if (button.innerHTML == "Pause Audio") {
            return true;
        } else if (button.innerHTML == "Play Audio"){
            return false;
        }
    }

    async loadSounds() {
        for (let sound in this.bossSounds) {
            const response = await fetch(this.bossSounds[sound]);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.audioBuffers[sound] = audioBuffer;
        }
    }

    playMovingSound() {
        if (this.soundCooldown) return;

        const distance = Math.sqrt(
            Math.pow(this.x - this.warrior.x, 2) + Math.pow(this.y - this.warrior.y, 2)
        );

        const volume = 1.0 - Math.min(1.0, distance / 500); // Je weiter weg, desto leiser
        
        const sound = this.audioContext.createBufferSource();
        sound.buffer = this.audioBuffers.walking;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;

        const panner = this.audioContext.createPanner();
        panner.panningModel = 'HRTF'; 
        panner.distanceModel = 'linear';

        const x = this.x - this.warrior.x;
        const y = this.y - this.warrior.y;
        const z = -0.5 * Math.sqrt(x * x + y * y); // Z für etwas Tiefe

        panner.positionX.value = x;
        panner.positionY.value = y;
        panner.positionZ.value = z;

        sound.connect(gainNode).connect(panner).connect(this.audioContext.destination);
        sound.start(0);

        this.soundCooldown = true;
        setTimeout(() => {
            this.soundCooldown = false;
        }, 1000);
    }

    playShootingSound(bullet) {
        if (bullet.soundCooldown) return;

        const distance = Math.sqrt(
            Math.pow(bullet.x - this.warrior.x, 2) + Math.pow(bullet.y - this.warrior.y, 2)
        );

        const volume = 1.0 - Math.min(1.0, distance / 500); // Je weiter weg, desto leiser
        
        const sound = this.audioContext.createBufferSource();
        sound.buffer = this.audioBuffers.shooting;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;

        const panner = this.audioContext.createPanner();
        panner.panningModel = 'HRTF'; 
        panner.distanceModel = 'linear';

        const x = bullet.x - this.warrior.x;
        const y = bullet.y - this.warrior.y;
        const z = -0.5 * Math.sqrt(x * x + y * y); // Z für etwas Tiefe

        panner.positionX.value = x;
        panner.positionY.value = y;
        panner.positionZ.value = z;

        sound.playbackRate.value = 0.5;

        sound.connect(gainNode).connect(panner).connect(this.audioContext.destination);
        sound.start(0);

        bullet.soundCooldown = true;
        setTimeout(() => {
            bullet.soundCooldown = false;
        }, 2000);
    }
}