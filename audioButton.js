function loadAudio(element) {
    var audioElement = document.getElementById(element);
    audioElement.volume = 0;
    if(parseFloat(localStorage.getItem(element)) != null) {
        audioElement.volume = localStorage.getItem(element);
    }
    localStorage.setItem(element, audioElement.volume);
}

loadAudio("backgroundMusic");
loadAudio("punchWarrior");
loadAudio("warriorHit");
loadAudio("bossShot");
loadAudio("bossAppearance");
loadAudio("bossCountdown");
loadAudio("winning");
loadAudio("losing");
loadAudio("enemyDeath");
loadAudio("enemyHit");
loadAudio("border");



var audio = document.getElementById("backgroundMusic");
var button = document.getElementById("buttonAudio");
var audioVolume = parseFloat(localStorage.getItem("backgroundMusic"));

if(audioVolume != null) {
    audio.volume = audioVolume;
} else {
    audio.volume = 0.2;
}

function switchState() {
    if (audio.paused == true) {
        audio.play();
        button.innerHTML = "Pause Audio";
    } else {
        audio.pause();
        button.innerHTML = "Play Audio";
    }
}

function checkKey(e) {
    if (e.keycode == 32 ) {
        switchState();
    }
}

button.addEventListener('click', function() {
    switchState();
}, false);

window.addEventListener("keypress", checkKey, false);