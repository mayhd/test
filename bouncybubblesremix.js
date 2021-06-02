/*
 * @name Bouncy Bubbles remix may vinil
 * @frame 50,50
 * @description  based on code from Keith Peters. Multiple-object collision..
 */

let numBalls = 45;
let spring = 0.01;
let gravity = 0.06;
let friction = -0.1;
let balls = [];
function setup() {
}
	let vinil;
function preload(){
  vinil = loadImage('vinil.png');
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  image(vinil, 110, 180, mouseX, mouseY);   
}

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(50, 80),
      i,
      balls
    );
  }
  noStroke();
  fill(255, 204);
}

function draw() {
  background(200);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 1;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 3 > width) {
      this.x = width - this.diameter / 4;
      this.vx *= friction;
    } else if (this.x - this.diameter / 6 < 0) {
      this.x = this.diameter / 6;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 4 > height) {
      this.y = height - this.diameter / 6;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 12;
      this.vy *= friction;
    }
  }

  display() {
    image(vinil, this.x, this.y);
  }
}
