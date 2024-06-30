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
        this.health = 6;
        this.zombies = [];
        this.zombieSpawnInterval = 2000;
        this.lastZombieSpawnTime = 0;
        this.canCollide = true;
        super.spawn(this.width, this.height);
        this.difficultyAdjustments();

        //Sounds
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.listener = this.audioContext.listener;
        this.zombieSounds = {
            walking: './audio/soundFiles/enemies/enemyFootsteps.mp3',
            fromTop: './audio/soundFiles/enemies/fromTop.mp3',
            fromBottom: './audio/soundFiles/enemies/fromBottom.mp3',
            fromLeft: './audio/soundFiles/enemies/fromLeft.mp3',
            fromRight: './audio/soundFiles/enemies/fromRight.mp3'
        };
        this.audioBuffers = {};
        this.soundCooldown = false;
        this.loadSounds();
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
            soundCooldown: false,
            closenessSoundCooldown: false
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
            
            if(this.checkForSoundAvailibility()){
                this.playMovingSound(zombie);
            }

            if (this.checkForSoundAvailibility() && this.checkClosenessToWarrior(zombie)) {
                this.playClosenessSound(zombie);
            }
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

    difficultyAdjustments() {
        if(localStorage.getItem("difficulty") != null) {
            var difficulty = localStorage.getItem("difficulty");

            if(difficulty == "easy"){
                this.health = 3;
                this.zombieSpawnInterval = 3000;
            } else if(difficulty == "normal") {
                this.health = 6;
                this.zombieSpawnInterval = 2000;
            } else if(difficulty == "medium") {
                this.health = 7;
                this.zombieSpawnInterval = 2000;
            } else if(difficulty == "advanced") {
                this.health = 8;
                this.zombieSpawnInterval = 1500;
            } else if(difficulty == "challenging") {
                this.health = 8.5;
                this.zombieSpawnInterval = 1500;
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
        for (let sound in this.zombieSounds) {
            const response = await fetch(this.zombieSounds[sound]);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.audioBuffers[sound] = audioBuffer;
        }
    }

    playMovingSound(zombie) {
        if (zombie.soundCooldown) return;

        const distance = Math.sqrt(
            Math.pow(zombie.x - this.warrior.x, 2) + Math.pow(zombie.y - this.warrior.y, 2)
        );

        const volume = 1.0 - Math.min(1.0, distance / 500); // Je weiter weg, desto leiser
        
        const sound = this.audioContext.createBufferSource();
        sound.buffer = this.audioBuffers.walking;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;

        const panner = this.audioContext.createPanner();
        panner.panningModel = 'HRTF'; 
        panner.distanceModel = 'linear';

        const x = zombie.x - this.warrior.x;
        const y = zombie.y - this.warrior.y;
        const z = -0.5 * Math.sqrt(x * x + y * y); // Z für etwas Tiefe

        panner.positionX.value = x;
        panner.positionY.value = y;
        panner.positionZ.value = z;

        sound.connect(gainNode).connect(panner).connect(this.audioContext.destination);
        sound.start(0);

        zombie.soundCooldown = true;
        setTimeout(() => {
            zombie.soundCooldown = false;
        }, 1000);
    }

    // checkClosenessToWarrior(zombie) {
    //     const warriorCircleRadius = 100; 
    //     const distance = Math.sqrt(
    //         Math.pow(zombie.x - this.warrior.x, 2) + Math.pow(zombie.y - this.warrior.y, 2)
    //     );
    //     return distance <= warriorCircleRadius;
    // }

    checkClosenessToWarrior(zombie) {
        const circle = document.getElementById("closenessCircle");
        const warriorCircleRadius = 150;
        const warriorCenterX = this.warrior.x + this.warrior.width / 2;
        const warriorCenterY = this.warrior.y + this.warrior.height / 2;
        const zombieCenterX = zombie.x + zombie.width / 2;
        const zombieCenterY = zombie.y + zombie.height / 2;
        const distance = Math.sqrt(
            Math.pow(zombieCenterX - warriorCenterX, 2) + Math.pow(zombieCenterY - warriorCenterY, 2)
        );
        return distance <= warriorCircleRadius;
    }

    playClosenessSound(zombie) {
        if (zombie.closenessSoundCooldown) return;

        const dx = zombie.x - (this.warrior.x + this.warrior.width / 2);
        const dy = zombie.y - (this.warrior.y + this.warrior.height / 2);

        let soundBuffer;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                soundBuffer = this.audioBuffers.fromRight; //Zombie kommt von rechts
            } else {
                soundBuffer = this.audioBuffers.fromLeft; //Zombie kommt von links
            }
        } else {
            if (dy > 0) {
                soundBuffer = this.audioBuffers.fromBottom; //Zombie kommt von unten
            } else {
                soundBuffer = this.audioBuffers.fromTop; //Zombie kommt von oben
            }
        }

        const sound = this.audioContext.createBufferSource();
        sound.buffer = soundBuffer;
        sound.connect(this.audioContext.destination);
        sound.start(0);

        zombie.closenessSoundCooldown = true;
        setTimeout(() => {
            zombie.closenessSoundCooldown = false;
        }, sound.buffer.duration * 2500);
    }
}