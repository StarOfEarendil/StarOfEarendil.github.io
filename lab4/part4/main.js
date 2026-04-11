const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Grab the paragraph element for the score
const para = document.querySelector('p');
let count = 0;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

// 1. Create the base Shape class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// 2. Make Ball extend Shape
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY); // Call the parent Shape constructor
    this.color = color;
    this.size = size;
    this.exists = true; // Track if it's been eaten
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width) { this.velX = -(this.velX); }
    if ((this.x - this.size) <= 0) { this.velX = -(this.velX); }
    if ((this.y + this.size) >= height) { this.velY = -(this.velY); }
    if ((this.y - this.size) <= 0) { this.velY = -(this.velY); }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      // Only check collisions for balls that still exist
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// 3. Create the EvilCircle class
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); // Hardcode velocity to 20
    this.color = 'white';
    this.size = 10;

    // Set up the WASD controls
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a": this.x -= this.velX; break;
        case "d": this.x += this.velX; break;
        case "w": this.y -= this.velY; break;
        case "s": this.y += this.velY; break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color; // Use stroke instead of fill
    ctx.lineWidth = 3;            // Make the line thicker
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    // Just bounce it back slightly if it hits the wall, don't auto-move it
    if ((this.x + this.size) >= width) { this.x -= this.size; }
    if ((this.x - this.size) <= 0) { this.x += this.size; }
    if ((this.y + this.size) >= height) { this.y -= this.size; }
    if ((this.y - this.size) <= 0) { this.y += this.size; }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the evil circle hits a ball, eat it!
        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--; // Drop the score
          para.textContent = 'Ball count: ' + count; // Update the HTML text
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  count++; // Add to the score for every ball generated
  para.textContent = 'Ball count: ' + count; 
}

// Instantiate the Evil Circle
const evilBall = new EvilCircle(random(0, width), random(0, height));

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) { // Only draw and update balls that haven't been eaten
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // Draw and update the Evil Circle every frame
  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  requestAnimationFrame(loop);
}

loop();