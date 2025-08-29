const palettes = [
    { background: '#000000', heart: '#8E7DBE' },
    { background: '#5EABD6', heart: '#FEFBC7' },
    { background: '#E62D2D', heart: '#000000' },
    { background: '#212121', heart: '#06923E' },
    { background: '#B771E5', heart: '#AEEA94' },
    { background: '#A4E06D', heart: '#CAA24F' },
    { background: '#7ED4AD', heart: '#D76C82' },
    { background: '#31292F', heart: '#F564A9' },
    { background: '#7965C1', heart: '#E3D095' },
]
let row, col, baseSize, heartSize, cellSize;
let heartGridRow, heartGridCol;
let heartGridStartingRow, heartGridStartingCol;

function setup() {
    createCanvas(windowWidth, windowHeight);

    palette = random(palettes);

    baseSize = min(windowWidth, windowHeight);
    cellSize = baseSize * 0.1;
    heartSize = cellSize * 0.8;

    row = ceil(windowHeight / cellSize)
    col = ceil(windowWidth / cellSize);

    heartGridRow = 5;
    heartGridCol = 5;
    heartGridStartingRow = (row - heartGridRow) / 2;
    heartGridStartingCol = (col - heartGridCol) / 2;

    noLoop();
}

function draw() {
    fill(palette.heart);
    background(palette.background);

    translate(heartGridStartingCol * cellSize, heartGridStartingRow * cellSize);

    for (let i = 0; i < heartGridRow; i++) {
        for (let j = 0; j < heartGridCol; j++) {
            let x = j * cellSize;
            let y = i * cellSize;
            drawHeart(x + cellSize / 2, y + cellSize / 2);
        }
    }
}

function drawHeart(x, y) {
    beginShape();

    vertex(x, y);
    bezierVertex(x - heartSize / 2, y - heartSize / 2, x - heartSize / 4, y + heartSize / 4, x, y + heartSize / 2);
    bezierVertex(x + heartSize / 4, y + heartSize / 4, x + heartSize / 2, y - heartSize / 2, x, y);

    endShape(CLOSE);
}

function mousePressed() {
    palette = random(palettes);
    redraw();
}