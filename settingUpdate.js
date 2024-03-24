window.onload = function () {
    //Visuelles

    function updateFontSize() {
        var textSize = localStorage.getItem("fontSize");
        if (textSize) {
            document.querySelector(':root').style.setProperty('--fontsize', textSize + "px");
            document.querySelector(':root').style.setProperty('--fontHeadline', (textSize * 1.6) + "px");
            document.querySelector(':root').style.setProperty('--fontTitel', (textSize * 1.2) + "px");
        }
    }

    function updateFontStyle() {
        var fontStyle = localStorage.getItem("fontStyle");
        if (fontStyle) {
            document.querySelector(':root').style.setProperty('--fontStyle', fontStyle);
        }
    }

    function updateContrast() {
        var colorDark = localStorage.getItem("colorDark");

        if(colorDark != null) {
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
    }

    updateFontSize();
    updateFontStyle();
    updateContrast();
}   