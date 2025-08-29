let row, col, size;
let arrows = [];
let x_off = 0,
  y_off = 0,
  z_off = 0,
  increment = 0.1,
  radius;
let particles = [];
let colors = [];
let num = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  let baseSize = min(windowWidth, windowHeight);
  size = baseSize * 0.05;
  radius = size / 2;
  row = ceil(height / size);
  col = ceil(width / size);

  for (let i = 0; i < num; i++) {
    particles[i] = new Particle(random(0, width), random(0, height));
  }
  background(0, 240);
}

function draw() {
  y_off = 0;
  for (let i = 0; i < row; i++) {
    arrows[i] = [];
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

      let angle = map(noise(x_off, y_off, z_off), 0, 1, 0, 360);
      arrows[i][j] = createVector(cos(angle), sin(angle));

      let pt0 = createVector(size / 2 + x, size / 2 + y);
      let pt1 = createVector(arrows[i][j].x * radius, arrows[i][j].y * radius);

      //line(pt0.x, pt0.y, pt0.x + pt1.x, pt0.y + pt1.y);
      //ellipse(pt0.x + pt1.x, pt0.y + pt1.y, 5, 5);

      //text(round(angle, 2), size / 2 + x ,size / 2 + y);

      x_off += increment;
    }
    y_off += increment;
    z_off += 0.001;
  }

  for (let i = 0; i < num; i++) {
    particles[i].checkEdges();
    particles[i].direction(arrows);
    particles[i].update();
    particles[i].display(colors);
  }
}

function mouseClicked() {
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle(random(0, width), random(0, height));
  }

  background(0, 220);
}