const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

const box = 32;

// get images
const ground = new Image();
ground.src = './img/ground.png';

const foodImg = new Image();
foodImg.src = './img/food.png';

// create the snake
let snake = [0];
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

// draw everything on canvas
function draw() {
    // get ground on dom
  ctx.drawImage(ground, 0, 0);

  // get snake on dom
  for ( let i = 0; i < snake.length; i++) {
    ctx.fillStyle = ( i == 0 ) ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  };
// get apple on dom
  ctx.drawImage(foodImg, apple.x, apple.y);

  // get score on dom
  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText(score, 2 * box, 1.6 * box);

};

// call draw function every 100ms
let game = setInterval(draw, 100);
