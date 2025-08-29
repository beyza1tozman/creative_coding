let asciiChars =
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. ";
let imgPaths = ['../../assets/dog.png', '../../assets/fish.png', '../../assets/cat.png'];
let images = [];
let currentImg;
let size = 10;

function preload() {
    for (let name of imgPaths) {
        images.push(loadImage(name));
    }
}

function setup() {
    createCanvas(600, 600);
    currentImg = images[0];

    currentImg.resize(100, 0);
    size = width / currentImg.width;

    fill("#7a4b74ff");
    stroke("#f8cbfcff");

    sel = createSelect();
    sel.position(10, 10);
    imgPaths.forEach((name) => {
        let animalName = name.split('/').pop().split('.')[0];
        sel.option(animalName, name);
    });
    sel.changed(changeImage);

    noLoop();
}

function draw() {
    drawAscii();
}

function changeImage() {
    let selectedName = sel.value();
    currentImg = images[imgPaths.indexOf(selectedName)];
    currentImg.resize(100, 0);
    size = width / currentImg.width;
    redraw();
}

function drawAscii() {
    background(255);

    for (let i = 0; i < currentImg.width; i++) {
        for (let j = 0; j < currentImg.height; j++) {
            let pixelVal = currentImg.get(i, j);
            let b = brightness(pixelVal);
            let charIndex = floor(map(b, 0, 100, 0, asciiChars.length));

            let x = i * size + size / 2;
            let y = j * size + size / 2;
            let char = asciiChars.charAt(charIndex);
            textSize(size);
            textAlign(CENTER, CENTER);
            text(char, x, y);
        }
    }
}