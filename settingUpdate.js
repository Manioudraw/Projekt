
        var textSize = localStorage.getItem("fontSize");
        console.log(textSize);
        if (textSize) {
            document.querySelector(':root').style.setProperty('--fontsize', textSize + "px");
            document.querySelector(':root').style.setProperty('--fontHeadline', (textSize * 1.6) + "px");
        }
    // }
    