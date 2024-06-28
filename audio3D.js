// Initialisiere den AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Funktion zum Laden und Dekodieren der Audiodatei
async function loadSound(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
        //console.error('Fehler beim Laden der Audiodatei');
    }
}

// Funktion zum Abspielen des Sounds an einer bestimmten Position
async function playSoundAtPosition(url, x, y, z) {
    const soundBuffer = await loadSound(url);
    if (!soundBuffer) {
        //console.error('Sound Buffer konnte nicht geladen werden.');
        return;
    }
    const source = audioContext.createBufferSource();
    source.buffer = soundBuffer;

    // Erstelle einen PannerNode für die räumliche Positionierung
    const panner = audioContext.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;
    
    // Setze die Position der Audioquelle
    panner.positionX.setValueAtTime(x, audioContext.currentTime);
    panner.positionY.setValueAtTime(y, audioContext.currentTime);
    panner.positionZ.setValueAtTime(z, audioContext.currentTime);


    // Verbinde die AudioNodes
    source.connect(panner);
    panner.connect(audioContext.destination);

    // Spiele den Sound ab
    source.start();
}

// Setze die Position und Orientierung des AudioListeners
function setListenerPositionAndOrientation(x, y, z) {
    const listener = audioContext.listener;

    // Setze die Position des Listeners (Standardmäßig bei (0, 0, 0))
    listener.positionX.setValueAtTime(x, audioContext.currentTime);
    listener.positionY.setValueAtTime(y, audioContext.currentTime);
    listener.positionZ.setValueAtTime(z, audioContext.currentTime);

    // Setze die Orientierung des Listeners (nach vorne und oben)
    listener.forwardX.setValueAtTime(0, audioContext.currentTime);
    listener.forwardY.setValueAtTime(0, audioContext.currentTime);
    listener.forwardZ.setValueAtTime(-1, audioContext.currentTime);
    listener.upX.setValueAtTime(0, audioContext.currentTime);
    listener.upY.setValueAtTime(1, audioContext.currentTime);
    listener.upZ.setValueAtTime(0, audioContext.currentTime);
}