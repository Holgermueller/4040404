const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

const box = 32;

// get images
const ground = new Image();
ground.src = './img/ground.png';

const foodImg = new Image();
foodImg.src = './img/food.png';

// include audio files
let dead = new Audio;
let eat = new Audio;
let up = new Audio;
let right = new Audio;
let left = new Audio;
let down = new Audio;

dead.src = 'audio/dead.mp3';
eat.src = 'audio/eat.mp3';
up.src = 'audio/up.mp3';
right.src = 'audio/right.mp3';
left.src = 'audio/left.mp3';
down.src = 'audio/down.mp3';

// create the snake
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// create apples
let apple = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

// create score
let score = 0;

// control the snake
let d;

document.addEventListener('keydown', direction);

// direction function
function direction(e) {
  let key = e.keyCode;
  if (e.keyCode == 37 && d != 'RIGHT') {
    d = 'LEFT';
    left.play();
  } else if (e.keyCode == 38 && d != 'DOWN') {
    d = 'UP';
    up.play();
  } else if (e.keyCode == 39 && d != 'LEFT') {
    d = 'RIGHT';
    right.play();
  } else if (e.keyCode == 40 && d != 'UP') {
    d = 'DOWN';
    down.play();
  }
};

// check collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything on canvas
function draw() {
  // get ground on dom
  ctx.drawImage(ground, 0, 0);

  // get snake on dom
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  };
  // get apple on dom, make it appear randomly
  ctx.drawImage(foodImg, apple.x, apple.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // if snake eats an apple
  if (snakeX == apple.x && snakeY == apple.y) {
    score++;
    eat.play();
    apple = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
    // don't remove tail
  } else {
    // remove the tail
    snake.pop();
  };

  // determine direction snake moves
  if (d == 'LEFT') snakeX -= box;
  if (d == 'UP') snakeY -= box;
  if (d == 'RIGHT') snakeX += box;
  if (d == 'DOWN') snakeY += box;

  // add new Head
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // game over
  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box ||
    snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game);
    dead.play();
  };

  snake.unshift(newHead);

  // get score on dom
  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText(score, 2 * box, 1.6 * box);
};

// call draw function every 100ms
let game = setInterval(draw, 100);
