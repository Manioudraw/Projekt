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
function updateAudioSettings() {
    var backgroundVolume = parseFloat(localStorage.getItem("backgroundMusic"));
    var slider = document.getElementById("volume");
    var output = document.getElementById("output");
    output.innerHTML = slider.value + "%";

    slider.oninput = function() {
        output.innerHTML = this.value + "%";
        backgroundVolume = this.value;
        slider.value = this.value;
    }

    backgroundVolume = slider.value/100;
    localStorage.setItem("backgroundMusic", backgroundVolume);
}

function loadCurrentAudioSettings() {
    if(localStorage.getItem("backgroundMusic") != null) {
        var backgroundVolume = parseFloat(localStorage.getItem("backgroundMusic"));
        var slider = document.getElementById("volume");
        var output = document.getElementById("output");

        slider.value = backgroundVolume*100;
        output.innerHTML = backgroundVolume*100 + "%";
    }
    
}

loadCurrentAudioSettings();






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