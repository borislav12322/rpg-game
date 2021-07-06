import './index.scss';
import MyCharacter from './assets/Female-5-Walk.png';

const canvas = document.getElementById('game');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');
const spriteWidth = 48;
const spriteHeight = 48;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let pY = (canvasHeight - spriteHeight) / 2;
let pX = (canvasWidth - spriteWidth) / 2;
let walkAnimate = 0;

function keyDownHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = true;
    pY += 10;
    walkAnimate = 0;

    if (pY >= canvasHeight - spriteHeight) {
      pY = canvasHeight - spriteHeight;
    }
  }

  if (e.key === 'Up' || e.key === 'ArrowUp') {
    bottomPressed = true;
    pY -= 10;
    walkAnimate = 144;

    if (pY <= 0) {
      pY = 0;
    }
  }

  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    bottomPressed = true;
    pX -= 10;
    walkAnimate = 48;

    if (pX <= 0) {
      pX = 0;
    }
  }

  if (e.key === 'Right' || e.key === 'ArrowRight') {
    bottomPressed = true;
    pX += 10;
    walkAnimate = 96;

    if (pX >= canvasWidth - spriteWidth) {
      pX = canvasWidth - spriteWidth;
    }
  }
}

function keyUpHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = false;
  }

  if (e.key === 'Up' || e.key === 'ArrowUp') {
    bottomPressed = false;
  }

  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    bottomPressed = false;
  }

  if (e.key === 'Right' || e.key === 'ArrowRight') {
    bottomPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = MyCharacter;

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      cycle = (cycle + 1) % shots;
    }

    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteWidth, walkAnimate, spriteWidth, spriteHeight, pX, pY, 48, 48);
  }, 120);
});
