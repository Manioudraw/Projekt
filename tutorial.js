//Höhe & Breite des Fensters berechnen und dies dem "gameCanvas" übergeben
function windowDimensions(gameCanvas){
    windowWidth = window.innerWidth - 200;
    windowHeight = window.innerHeight - 150;
    gameCanvas.width = windowWidth;
    gameCanvas.height = windowHeight;
}

function modeSelection(button, mode, currentVideoNumber, videoURLs,  canvas, canvasContext, currentGameNumber){
    button.addEventListener("click", () => {
        if(mode == false && videoURLs.length > currentVideoNumber){
            canvas.width = 1440;
            canvas.height = 810;
            playVideo(currentVideoNumber, videoURLs, canvas, canvasContext);
            currentVideoNumber += 1;
            mode = true;
        } else if (mode == true && currentGameNumber < videoURLs.length){
            windowDimensions(canvas);
            playGame(currentGameNumber, canvas, canvasContext);
            currentGameNumber += 1;
            mode = false;
        } else {
            let draw = function(){
                canvasContext.clearRect(0, 0, canvas.width, canvas.height);
                canvasContext.font = "500% Georgia";
                canvasContext.fillText("Du hast das Tutorial beendet!", canvas.width*0.2, canvas.height/2);
                requestAnimationFrame(draw);
            }
            draw();
            
            console.log("Ende");
        }
    });
}

function playVideo(currentVideoNumber, videoURLs, canvas, canvasContext){
    var video = document.createElement("video");
    video.setAttribute("src",  videoURLs[currentVideoNumber]);
    video.setAttribute("controls", "controls");
    video.play();

    let draw = function(){
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
    }
    draw();

    console.log("Watching");
}

function playGame(currentGameNumber, canvas, canvasContext){
    let update = function(){
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(update);
    }
    update();

    console.log("Playing");
}

window.addEventListener("load", function(){
    const gameCanvas = document.getElementById("canvas");
    const canvContext = gameCanvas.getContext("2d");
    windowDimensions(gameCanvas);

    canvContext.font = "500% Georgia";
    canvContext.fillText("Willkommen im Tutorial!", gameCanvas.width*0.22, gameCanvas.height/2);

    const buttonFurther = document.getElementById("buttonFurther");
    const videoURLs = ["./videos/test_video.mp4", "./videos/test_video.mp4", "./videos/test_video.mp4"];
    let currentVideoNumber = 0;
    let currentGameNumber = 0;
    let mode = false;

    modeSelection(buttonFurther, mode, currentVideoNumber, videoURLs, canvas, canvContext, currentGameNumber);

    window.onresize = function(){
        windowDimensions(gameCanvas);
    }
});