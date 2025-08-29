let numLayers, maxRadius, baseSize;
let palette;
let t = 0;

function setup() {
    baseSize = floor(min(windowWidth, windowHeight) * 0.6);
    numLayers = floor(baseSize * 0.02);
    maxRadius = baseSize / 2;
    createCanvas(baseSize, baseSize);
    angleMode(DEGREES);

    palette = [
        color('#9C6EC4'),
        color('#59A3D8'),
        color('#152F79'),
        color('#4D3F8C'),
        color('#3992B0ff')
    ];
}

function draw() {
    background('#192445');
    translate(width / 2, height / 2);
    stroke('#192445');

    for (let i = 0; i < numLayers; i++) {
        let r = map(i, 0, numLayers, maxRadius, 20);

        let idx = (i + t * 0.02) % palette.length;
        let c1 = palette[floor(idx) % palette.length];
        let c2 = palette[(floor(idx) + 1) % palette.length];
        let amt = idx - floor(idx);

        let baseColor = lerpColor(c1, c2, amt);
        let darknessFactor = pow(i / numLayers, 1.5);
        let darkColor = lerpColor(baseColor, color(0), darknessFactor * 0.5);
        fill(darkColor);

        drawWavyCircle(r, i, t);
    }

    t += 0.3;
}

function drawWavyCircle(radius, layerIndex) {
    beginShape();
    let waveAmp = map(radius, 20, maxRadius, 0, baseSize * 0.02);
    let waveFreq = 3;

    for (let a = 0; a < 360; a += 5) {
        let wave = sin(a * waveFreq + t + layerIndex * baseSize * 0.05) * waveAmp;
        let x = cos(a) * (radius + wave);
        let y = sin(a) * (radius + wave);
        vertex(x, y);
    }
    endShape(CLOSE);
}