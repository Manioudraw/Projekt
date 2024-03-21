//Menü

function showSettings(category) {
    document.querySelectorAll('.settings-container').forEach(container => {
    container.classList.remove('visible');
    });
    document.getElementById(`${category}-settings`).classList.add('visible');
}

// Visuelles

function updateFontSize() {
    var textSize = document.getElementById("fontSize").value;
    localStorage.setItem("fontSize", textSize);
    document.querySelector(':root').style.setProperty('--fontsize', textSize + "px");
    document.querySelector(':root').style.setProperty('--fontHeadline', (textSize * 1.6) + "px");
    document.querySelector(':root').style.setProperty('--fontTitel', (textSize * 1.2) + "px");
}

function updateFontStyle() {
    var fontStyle = document.getElementById("fontStyle").value;
    localStorage.setItem("fontStyle", fontStyle);
    document.querySelector(':root').style.setProperty('--fontStyle', fontStyle);
}

function updateVisual() {
    updateFontSize();
    updateFontStyle();
}

function loadCurrentVisualSettings() {
    if(localStorage.getItem("fontSize") != null) {
        var textSize = localStorage.getItem("fontSize");
        document.getElementById("fontSize").value = textSize; 
        document.querySelector(':root').style.setProperty('--fontsize', textSize + "px");
        document.querySelector(':root').style.setProperty('--fontHeadline', (textSize * 1.6) + "px");
        document.querySelector(':root').style.setProperty('--fontTitel', (textSize * 1.2) + "px");
    }

    if(localStorage.getItem("fontStyle") != null) {
        var fontStyle = localStorage.getItem("fontStyle");
        document.getElementById("fontStyle").value = fontStyle; 
        document.querySelector(':root').style.setProperty('--fontStyle', fontStyle);
    }
}

loadCurrentVisualSettings();





//Audio
var sliderValue;

function confSlider(idSlider, idOutput) {
    var slider = document.getElementById(idSlider);
    var output = document.getElementById(idOutput);
    output.innerHTML = slider.value + "%";

    slider.oninput = function() {
        output.innerHTML = this.value + "%";
        slider.value = this.value;
    }

    sliderValue = slider.value;
}

function updateBackgroundSettings() {
    confSlider("volume", "output");
    var backgroundVolume = parseFloat(localStorage.getItem("backgroundMusic"));
    backgroundVolume = sliderValue/100;
    localStorage.setItem("backgroundMusic", backgroundVolume);
}

function updateSoundEffects() {
    confSlider("soundEffects", "outputEffects");
    var soundEffect = localStorage.getItem("punchWarrior");
    soundEffect = sliderValue/100;
    localStorage.setItem("soundEffect", soundEffect);

    // confSlider("soundEffects", "outputEffects");
    // var punchWarrior = localStorage.getItem("punchWarrior");
    // punchWarrior = sliderValue/100;
    // localStorage.setItem("punchWarrior", punchWarrior);

    // var bossShot = localStorage.getItem("bossShot");
    // bossShot = sliderValue/100;
    // localStorage.setItem("bossShot", bossShot);
}

function updateAudio() {
    updateBackgroundSettings();
    updateSoundEffects();
}

function loadCurrentAudioSettings(elementId, sliderId, outputId) {
    if(localStorage.getItem(elementId) != null){
        var element = parseFloat(localStorage.getItem(elementId));
        var slider = document.getElementById(sliderId);
        var output = document.getElementById(outputId);

        slider.value = element*100;
        output.innerHTML = element*100 + "%";
    }
}

loadCurrentAudioSettings("backgroundMusic", "volume", "output");
loadCurrentAudioSettings("soundEffect", "soundEffects", "outputEffects");






//Spieleinstellungen





//Tastenbelegungen

function updateKeySettings(element) {
    var key = document.getElementById(element).value;
    localStorage.setItem(element, key);
}

function updateValue(element) {
    var key = localStorage.getItem(element);
    document.getElementById(element).placeholder = key;
    document.getElementById(element).value = key;
    return key;
}

function resetKeyBindings() {
    localStorage.setItem("up", "w");
    localStorage.setItem("down", "s");
    localStorage.setItem("right", "d");
    localStorage.setItem("left", "a");

    localStorage.setItem("upShot", "ArrowUp");
    localStorage.setItem("downShot", "ArrowDown");
    localStorage.setItem("rightShot", "ArrowRight");
    localStorage.setItem("leftShot", "ArrowLeft");
    loadCurrentKeyBindings();
}

function loadCurrentKeyBindings() {
    if(localStorage.getItem("up") != null) {
        updateValue("up");
        updateValue("down");
        updateValue("right");
        updateValue("left");

        updateValue("upShot");
        updateValue("downShot");
        updateValue("rightShot");
        updateValue("leftShot");
    }
}

loadCurrentKeyBindings();