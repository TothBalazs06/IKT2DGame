// level1.js
import { shipImg, meteorImg, trashImg } from './sketch.js';

export let ship;
export let meteors = [];
export let trash = [];
export let score = 0;

// Intro text variables
let showIntroText = true;
let introTimer = 0;
const introDuration = 5 * 60; // 5 seconds (assuming 60 FPS)

export function setupLevel1() {
  console.log("Setting up level 1");
  score = 0;
  meteors = [];
  trash = [];
  
  // Initialize intro text
  showIntroText = true;
  introTimer = 0;

  ship = new Sprite(width / 2, height - 50);
  ship.img = shipImg;
  ship.scale = 1.5;
  
  for (let i = 0; i < 5; i++) {
    let meteor = new Sprite(random(width), random(-300, -50));
    meteor.img = meteorImg;
    meteor.scale = 1.5;
    meteor.velocity.x = 0;
    meteor.velocity.y = random(2, 5);
    meteors.push(meteor);
  }
  
  for (let i = 0; i < 5; i++) {
    let trashItem = new Sprite(random(width), random(-300, -50));
    trashItem.img = trashImg;
    trashItem.scale = 1.5;
    trashItem.velocity.x = 0;
    trashItem.velocity.y = random(1, 4);
    trash.push(trashItem);
  }
}

export function updateLevel1() {
  background(0);

  fill(255);
  textSize(20);
  text(`Score: ${score}`, 10, 30);

  if (kb.pressing("left") && ship.x > ship.width / 2) ship.x -= 5;
  if (kb.pressing("right") && ship.x < width - ship.width / 2) ship.x += 5;

  for (let meteor of meteors) {
    if (meteor.y > height) {
      meteor.y = random(-300, -50);
      meteor.x = random(width);
      meteor.velocity.y = random(2, 5);
    }
  }

  for (let i = trash.length - 1; i >= 0; i--) {
    let item = trash[i];
    if (item.y > height) {
      item.y = random(-300, -50);
      item.x = random(width);
      item.velocity.y = random(1, 4);
    }
    if (ship.overlapping(item)) {
      item.remove();
      trash.splice(i, 1);
      score++;
    }
  }

  // Draw intro text on top of the gameplay
  if (showIntroText) {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Level 1: Collect the Trash!", width / 2, height / 2 - 60);
    textSize(24);
    text("Catch the trash flying towards you!", width / 2, height / 2 - 20);
    text("Don't hit the meteors!", width / 2, height / 2 + 20);
    pop();

    introTimer++;
    if (introTimer >= introDuration) {
      showIntroText = false;
    }
  }

  return trash.length === 0;
}

export function checkCollisions() {
  for (let meteor of meteors) {
    if (ship.overlapping(meteor)) {
      return true;
    }
  }
  return false;
}

export function cleanup() {
  if (ship) ship.remove();
  meteors.forEach(meteor => meteor.remove());
  trash.forEach(item => item.remove());
  meteors = [];
  trash = [];
  ship = null;
  showIntroText = true;
  introTimer = 0;
}