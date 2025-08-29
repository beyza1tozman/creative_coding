const palettes = [
    { background: '#F4C9EA', tree: '#6b4226' },
    { background: '#dceef2', tree: '#3c5a6e' },
    { background: '#DBD1FF', tree: '#44A1BD' },
    { background: '#cdeac0', tree: '#4a584f' },
    { background: '#756AB6', tree: '#E0AED0' },
    { background: '#C5BAFF', tree: '#E8F9FF' },
    { background: '#007074', tree: '#FFC1B4' },
    { background: '#211C84', tree: '#B5A8D5' },
    { background: '#500073', tree: '#2A004E' },
    { background: '#B03052', tree: '#7ED4AD' },
    { background: '#6CBEC7', tree: '#825B32' },
    { background: '#AA60C8', tree: '#EABDE6' },
];

let palette;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    palette = random(palettes);
    noLoop();
}

function draw() {
    background(palette.background);

    noStroke();
    fill(palette.tree);
    rect(0, height - 40, width, 40);

    stroke(palette.tree);
    strokeWeight(8);
    translate(width / 2, height);

    let baseHeight = min(windowWidth, windowHeight);

    let initialBranchLength = baseHeight * 0.16;
    branch(initialBranchLength, 8);
}

function branch(len, width) {
    line(0, 0, 0, -len);
    translate(0, -len);
    strokeWeight(width);

    if (len > 4) {
        push()
        rotate(random(15, 45));
        branch(len * 0.7, width * 0.7);
        pop();

        push();
        rotate(-random(15, 45));
        branch(len * 0.7, width * 0.7);
        pop();
    }
}

function mousePressed() {
    palette = random(palettes);
    redraw();
}