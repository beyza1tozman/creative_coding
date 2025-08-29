let spirals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background("#111827");
  noStroke();
}

function draw() {
  for (let s of spirals) {
    let x = s.x + cos(s.angle) * s.radius;
    let y = s.y + sin(s.angle) * s.radius;

    fill(s.color.r, s.color.g, s.color.b, 100);
    ellipse(x, y, 5, 5);

    s.angle += s.speed;
    s.radius += s.growth;

    if (s.radius > s.deathLimit) {
      s.dead = true;
    }
  }

  spirals = spirals.filter((s) => !s.dead);
}

function mousePressed() {
  spirals.push({
    x: mouseX,
    y: mouseY,
    angle: 0,
    radius: 0,
    speed: random(8, 20),
    growth: random(0.3, 1.2),
    color: {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255),
    },
    deathLimit: random(100, 200),
    dead: false,
  });
}

function keyPressed() {
  if (key === " ") {
    background("#111827");
    spirals = [];
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background("#111827");
}