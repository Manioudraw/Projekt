window.onload = function () {
    //Visuelles

    function updateFontSize(){
        var textSize = localStorage.getItem("fontSize");
        if (textSize) {
            document.querySelector(':root').style.setProperty('--fontsize', textSize + "px");
            document.querySelector(':root').style.setProperty('--fontHeadline', (textSize * 1.6) + "px");
        }
    }

    function updateFontStyle(){
        var fontStyle = localStorage.getItem("fontStyle");
        if (fontStyle) {
            document.querySelector(':root').style.setProperty('--fontStyle', fontStyle);
        }
    }

    updateFontSize();
    updateFontStyle();

    //Nicht-Visuelles
}   