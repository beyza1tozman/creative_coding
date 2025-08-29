let sound;
let seashellImg;
let fft;
let baseSize;
let started = false;

function preload() {
    sound = loadSound('../../assets/ocean_sound.mp3');
    seashellImg = loadImage('../../assets/seashell.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fft = new p5.FFT();
    imageMode(CENTER);
    updateBaseSize();
}

function draw() {
    background(0);

    let imgW = baseSize * 0.3;
    let imgH = baseSize * 0.3;
    image(seashellImg, width / 2, height / 2, imgW, imgH);

    if (started) {
        let spectrum = fft.analyze();

        noStroke();

        for (let i = 0; i < spectrum.length; i++) {
            let x = map(i, 0, spectrum.length, 0, width);
            let h = -height + map(spectrum[i], 0, 255, height, 0);

            let blueColor = map(i, 0, spectrum.length, 100, 255);
            fill(0, 80, blueColor);

            rect(x, height, width / spectrum.length, h);
        }
    }
}

function updateBaseSize() {
    baseSize = min(windowWidth, windowHeight);
}

function mousePressed() {
    let imgX = width / 2;
    let imgY = height / 2;
    let imgW = baseSize * 0.3;
    let imgH = baseSize * 0.3;

    if (mouseX > imgX - imgW / 2 && mouseX < imgX + imgW / 2 &&
        mouseY > imgY - imgH / 2 && mouseY < imgY + imgH / 2) {
        if (!started) {
            userStartAudio();
            started = true;
        }

        if (sound.isPlaying()) {
            sound.stop();
        }
        sound.loop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateBaseSize();
}