//Menü

function showSettings(category) {
    document.querySelectorAll('.settings-container').forEach(container => {
        container.classList.remove('visible');
    });
    document.getElementById(`${category}-settings`).classList.add('visible');

    document.querySelectorAll('.menu').forEach(container => {
        container.classList.remove('visible');
    });
    document.getElementById(`${category}-menu`).classList.add('visible');

    

    setTimeout(function() {
        var element = document.getElementById(`${category}-legend`);
        element.focus();
    }, 10);
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

    if(localStorage.getItem("colorDark") != null) {
        var colorDark = localStorage.getItem("colorDark");
        var colorMiddle = localStorage.getItem("colorMiddle");
        var colorLight = localStorage.getItem("colorLight");
        var colorMenu = localStorage.getItem("colorMenu");
        var colorMenuFocus = localStorage.getItem("colorMenuFocus");
        var colorBorder = localStorage.getItem("colorBorder");
        var colorButton = localStorage.getItem("colorButton");
        var colorButtonHover = localStorage.getItem("colorButtonHover");
        var colorReset = localStorage.getItem("colorReset");
        var colorResetHover = localStorage.getItem("colorResetHover");
        var borderDepth = localStorage.getItem("borderDepth");

        if(colorDark == '#020202') {
            document.getElementById("contrast").value = "Standard"; 
        } 
        else if(colorDark == '#000000') {
            document.getElementById("contrast").value = "Hoch"; 
        } 

        changeContrastValues(colorDark, colorMiddle, colorLight, colorMenu, colorMenuFocus, colorBorder, colorButton,
            colorButtonHover, colorReset, colorResetHover, borderDepth);
    }

}

function updateContrast() {
    var contrast = document.getElementById("contrast").value;
    var colorDark;
    var colorMiddle;
    var colorLight;
    var colorMenu;
    var colorMenuFocus;
    var colorBorder;
    var colorButton;
    var colorButtonHover;
    var colorReset;
    var colorResetHover;
    var borderDepth;

    if(contrast == "Standard") {
        colorDark = '#020202';
        colorMiddle = '#212121';
        colorLight = '#ffffff';
        colorMenu = '#d0d0d0';
        colorMenuFocus = '#505050';
        colorBorder = '#c4c4c4';
        colorButton = '#4DBB8D';
        colorButtonHover = '#007c48';
        colorReset = '#B95252';
        colorResetHover = '#bf0000';
        borderDepth = '3px';
    } 
    else if(contrast == "Hoch") {
        colorDark = '#000000';
        colorMiddle = colorDark;
        colorLight = '#ffffff'; //21.0:1 Kontrast zu Schwarz
        colorMenu = colorLight;
        colorMenuFocus = '#370b60'; //15.23:1 Kontrast zur weißen Schrift
        colorBorder = colorDark;
        colorButton = '#00FA8E'; //15.1:1 Kontrast zu Schwarz 
        colorButtonHover = '#ff0571'; //Komplementärfarbe zu colorButton & dafür nur 5.51:1
        colorReset = '#ff87ff'; //10.16:1 Kontrast zu Schwarz
        colorResetHover = '#007800'; //Komplentärfarbe zu colorReset
        borderDepth = '5px';
    }

    changeContrastValues(colorDark, colorMiddle, colorLight, colorMenu, colorMenuFocus, colorBorder, colorButton,
        colorButtonHover, colorReset, colorResetHover, borderDepth);
    
    localStorage.setItem("colorDark", colorDark);
    localStorage.setItem("colorMiddle", colorMiddle);
    localStorage.setItem("colorLight", colorLight);
    localStorage.setItem("colorMenu", colorMenu);
    localStorage.setItem("colorMenuFocus", colorMenuFocus);
    localStorage.setItem("colorBorder", colorBorder);
    localStorage.setItem("colorButton", colorButton);
    localStorage.setItem("colorButtonHover", colorButtonHover);
    localStorage.setItem("colorReset", colorReset);
    localStorage.setItem("colorResetHover", colorResetHover);
    localStorage.setItem("borderDepth", borderDepth);
}

function changeContrastValues(colorDark, colorMiddle, colorLight, colorMenu, colorMenuFocus, colorBorder, colorButton,
    colorButtonHover, colorReset, colorResetHover, borderDepth) {
    document.querySelector(':root').style.setProperty('--colorDark', colorDark);
    document.querySelector(':root').style.setProperty('--colorMiddle', colorMiddle);
    document.querySelector(':root').style.setProperty('--colorLight', colorLight);
    document.querySelector(':root').style.setProperty('--colorMenu', colorMenu);
    document.querySelector(':root').style.setProperty('--colorMenuFocus', colorMenuFocus);
    document.querySelector(':root').style.setProperty('--colorBorder', colorBorder);
    document.querySelector(':root').style.setProperty('--colorButton', colorButton);
    document.querySelector(':root').style.setProperty('--colorButtonHover', colorButtonHover);
    document.querySelector(':root').style.setProperty('--colorReset', colorReset);
    document.querySelector(':root').style.setProperty('--colorResetHover', colorResetHover);
    document.querySelector(':root').style.setProperty('--borderDepth', borderDepth);
}

function updateVisual() {
    updateFontSize();
    updateFontStyle();
    updateContrast();
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
    var backgroundVolume = localStorage.getItem("backgroundMusic");
    backgroundVolume = sliderValue/100;
    localStorage.setItem("backgroundMusic", backgroundVolume);
}

function updateSoundEffects() {
    confSlider("soundEffects", "outputEffects");
    var soundEffect = localStorage.getItem("punchWarrior");
    soundEffect = sliderValue/100;
    localStorage.setItem("soundEffect", soundEffect);
}

function loadCurrentAudioSettings(elementId, sliderId, outputId) {
    if(localStorage.getItem(elementId) != null){
        var element = localStorage.getItem(elementId);
        var slider = document.getElementById(sliderId);
        var output = document.getElementById(outputId);

        slider.value = element*100;
        output.innerHTML = element*100 + "%";
    }
}

function updateAudio() {
    updateBackgroundSettings();
    updateSoundEffects();
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




// Button-Abfrage, um Fokus nach einem Button wieder zum Menü zu führen
document.addEventListener("keydown", function(event) {
    if(event.key == 'Tab') {
        var focusOn = document.activeElement;
        if (focusOn.tagName == "BUTTON" && focusOn.type == "button" || focusOn == document.getElementById("tabEnd")) {
            var element = document.querySelector('[tabindex="1"]');
            element.focus();
        }
    }
});