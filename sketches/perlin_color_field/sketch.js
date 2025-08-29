let row, col, size;
let x_off = 0,
    y_off = 0,
    z_off = 0,
    increment = 0.05;
let colors = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    let baseSize = min(windowWidth, windowHeight);
    size = baseSize * 0.05;
    row = ceil(height / size);
    col = ceil(width / size);

    background(0, 220);
}

function draw() {
    y_off = 0;
    for (let i = 0; i < row; i++) {
        colors[i] = [];
        x_off = 0;
        for (let j = 0; j < col; j++) {
            let x = j * size;
            let y = i * size;

            let r = map(noise(x_off + 10, y_off, z_off), 0, 1, 0, 255);
            let g = map(noise(x_off, y_off + 20, z_off), 0, 1, 0, 255);
            let b = map(noise(x_off, y_off, z_off + 30), 0, 1, 0, 255);
            let c = color(r, g, b, 80);
            colors[i][j] = c;

            fill(c);
            square(x, y, size);

            x_off += increment;
        }
        y_off += increment;
        z_off += 0.0005;
    }
}