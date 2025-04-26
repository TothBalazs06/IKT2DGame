export let shipImg, meteorImg, trashImg, playerImg, plasticImg, glassImg, machinePlasticImg, machineGlassImg, mineImg;

function preload() {
  // Lokális képek betöltése az 1. szinthez
  shipImg = loadImage('assets/ship.png');       // Hajó sprite (1. szint)
  meteorImg = loadImage('assets/meteor.png');   // Meteor sprite (1. szint)
  trashImg = loadImage('assets/trash.png');     // Hulladék sprite (1. szint)

  // Lokális képek betöltése a 2. szinthez
  playerImg = loadImage('assets/player.png');           // Játékos sprite (2. szint)
  plasticImg = loadImage('assets/plastic.png');         // Műanyag hulladék sprite
  glassImg = loadImage('assets/glass.png');             // Üveg hulladék sprite
  machinePlasticImg = loadImage('assets/machine_plastic.png'); // Gép a műanyaghoz
  machineGlassImg = loadImage('assets/machine_glass.png');     // Gép az üveghez
  mineImg = loadImage('assets/mine.png');               // Akna sprite
}

// sketch.js
import * as Level1 from './level1.js';
import * as Level2 from './level2.js';

let currentLevel = 1;
let gameState = 'playing';

function setup() {

  // Teljes képernyős vászon beállítása
  createCanvas(windowWidth, windowHeight);
  setupLevel(currentLevel);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Vászon méretezése ablak átméretezésekor
}

function setupLevel(level) {
  if (level === 1) {
    Level1.setupLevel1();
  } else if (level === 2) {
    Level2.setupLevel2();
  }
  gameState = 'playing';
}

function draw() {

  if (gameState === 'playing') {
    if (currentLevel === 1) {
      const levelCompleted = Level1.updateLevel1();
      if (Level1.checkCollisions()) {
        gameState = 'gameOver';
      }
      if (levelCompleted) {
        gameState = 'levelComplete';
      }
    } else if (currentLevel === 2) {
      const levelCompleted = Level2.updateLevel2();
      if (Level2.checkCollisions()) {
        gameState = 'gameOver';
      }
      if (levelCompleted) {
        gameState = 'gameComplete';
      }
    }
  } else if (gameState === 'levelComplete') {
    drawLevelComplete();
  } else if (gameState === 'gameOver') {
    drawGameOver();
  } else if (gameState === 'gameComplete') {
    drawGameComplete();
  }
}

function drawLevelComplete() {
  push();
  background(0, 0, 0, 200);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Level 1 Complete!", width/2, height/2 - 50);
  textSize(24);
  text(`Score: ${Level1.score}`, width/2, height/2);
  text("Press SPACE to continue to Level 2", width/2, height/2 + 50);
  pop();
  
  if (kb.presses('space')) {
    currentLevel = 2;
    Level1.cleanup();
    setupLevel(currentLevel);
  }
}

function drawGameComplete() {
  push();
  background(0, 0, 0, 200);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Game Complete!", width/2, height/2 - 50);
  textSize(24);
  text(`Level 1 Score: ${Level1.score}`, width/2, height/2);
  text(`Level 2 Score: ${Level2.score2}`, width/2, height/2 + 35);
  text(`Final Score: ${Level1.score + Level2.score2}`, width/2, height/2 + 70);
  text("Press SPACE to play again", width/2, height/2 + 120);
  pop();
  
  if (kb.presses('space')) {
    currentLevel = 1;
    Level2.cleanup();
    setupLevel(currentLevel);
  }
}

function drawGameOver() {
  push();
  background(0, 0, 0, 200);
  textAlign(CENTER, CENTER);
  textSize(40);
  fill("red");
  text("Game Over!", width/2, height/2 - 25);
  textSize(24);
  fill(255);
  if (currentLevel === 1) {
    text(`Score: ${Level1.score}`, width/2, height/2 + 25);
  } else {
    text(`Level 1 Score: ${Level1.score}`, width/2, height/2 + 25);
    text(`Level 2 Score: ${Level2.score2}`, width/2, height/2 + 60);
    text(`Total Score: ${Level1.score + Level2.score2}`, width/2, height/2 + 95);
  }
  text("Press SPACE to restart", width/2, height/2 + 130);
  pop();
  
  if (kb.presses('space')) {
    if (currentLevel === 1) {
      Level1.cleanup();
    } else {
      Level2.cleanup();
    }
    currentLevel = 1;
    setupLevel(currentLevel);
  }
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;

