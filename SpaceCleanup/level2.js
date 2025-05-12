// level2.js
import { playerImg, plasticImg, glassImg, machinePlasticImg, machineGlassImg, mineImg } from './sketch.js';

export let player;
export let machines = [];
export let trash2 = [];
export let mines = [];
export let score2 = 0;

let carriedTrash = null;

// Intro text variables
let showIntroText2 = true;
let introTimer2 = 0;
const introDuration2 = 5 * 60; // 5 seconds (assuming 60 FPS)

export function setupLevel2() {
  console.log("Setting up level 2");
  score2 = 0;
  machines = [];
  trash2 = [];
  mines = [];
  
  // Initialize intro text
  showIntroText2 = true;
  introTimer2 = 0;

  player = new Sprite(width / 2, height / 2);
  player.img = playerImg;
  player.scale = 1.5;
  
  let plasticMachine = new Sprite(random(width), random(height));
  plasticMachine.img = machinePlasticImg;
  plasticMachine.scale = 1.5;
  plasticMachine.type = "plastic";
  machines.push(plasticMachine);

  let glassMachine = new Sprite(random(width), random(height));
  glassMachine.img = machineGlassImg;
  glassMachine.scale = 1.5;
  glassMachine.type = "glass";
  machines.push(glassMachine);

  machines.forEach(machine => {
    machine.x = constrain(machine.x, 50, width - 50);
    machine.y = constrain(machine.y, 50, height - 50);
  });

  for (let i = 0; i < 4; i++) {
    let plasticTrash = new Sprite(random(width), random(height));
    plasticTrash.img = plasticImg;
    plasticTrash.scale = 1.5;
    plasticTrash.type = "plastic";
    plasticTrash.x = constrain(plasticTrash.x, 50, width - 50);
    plasticTrash.y = constrain(plasticTrash.y, 50, height - 50);
    trash2.push(plasticTrash);
  }
  for (let i = 0; i < 4; i++) {
    let glassTrash = new Sprite(random(width), random(height));
    glassTrash.img = glassImg;
    glassTrash.scale = 1.5;
    glassTrash.type = "glass";
    glassTrash.x = constrain(glassTrash.x, 50, width - 50);
    glassTrash.y = constrain(glassTrash.y, 50, height - 50);
    trash2.push(glassTrash);
  }

  for (let i = 0; i < 5; i++) {
    let mine = new Sprite(random(width), random(height));
    mine.img = mineImg;
    mine.scale = 1.5;
    mine.x = constrain(mine.x, 50, width - 50);
    mine.y = constrain(mine.y, 50, height - 50);
    mines.push(mine);
  }
}

export function updateLevel2() {
  background(50);

  fill(255);
  textSize(20);
  text(`Score: ${score2}`, 10, 30);
  text(`Level: 2`, width - 100, 30);
  text(`Remaining trash: ${trash2.length}`, 10, 60);
  if (carriedTrash) {
    text(`Carried trash: ${carriedTrash.type === "plastic" ? "Plastic" : "Glass"}`, 10, 90);
  }

  if (kb.pressing("left") && player.x > player.width / 2) player.x -= 5;
  if (kb.pressing("right") && player.x < width - player.width / 2) player.x += 5;
  if (kb.pressing("up") && player.y > player.height / 2) player.y -= 5;
  if (kb.pressing("down") && player.y < height - player.height / 2) player.y += 5;

  if (carriedTrash) {
    carriedTrash.x = player.x;
    carriedTrash.y = player.y - player.height / 2 - carriedTrash.height / 2;
  }

  for (let i = machines.length - 1; i >= 0; i--) {
    let machine = machines[i];
    machine.x += random(-2, 2);
    machine.y += random(-2, 2);
    
    machine.x = constrain(machine.x, 50, width - 50);
    machine.y = constrain(machine.y, 50, height - 50);

    if (player.overlapping(machine) && carriedTrash) {
      if (machine.type === carriedTrash.type) {
        score2 += 1;
        trash2 = trash2.filter(item => item !== carriedTrash);
        carriedTrash.remove();
        carriedTrash = null;
      } else {
        carriedTrash.x = random(width);
        carriedTrash.y = random(height);
        carriedTrash.x = constrain(carriedTrash.x, 50, width - 50);
        carriedTrash.y = constrain(carriedTrash.y, 50, height - 50);
        carriedTrash = null;
      }
    }
  }

  for (let i = trash2.length - 1; i >= 0; i--) {
    let item = trash2[i];
    
    if (player.overlapping(item) && !carriedTrash) {
      carriedTrash = item;
    }
  }

  for (let mine of mines) {
    mine.x += random(-1, 1);
    mine.y += random(-1, 1);
    mine.x = constrain(mine.x, 50, width - 50);
    mine.y = constrain(mine.y, 50, height - 50);
  }

  // Draw intro text on top of the gameplay
  if (showIntroText2) {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Level 2: Sort the Trash!", width / 2, height / 2 - 80);
    textSize(24);
    text("Collect trash, then take it to the correct machine!", width / 2, height / 2 - 40);
    text("Colors will help: Blue for plastic, Gray for glass.", width / 2, height / 2);
    text("Use arrows to move around!", width / 2, height / 2 + 40);
    text("Do not hit the mines!", width / 2, height / 2 + 80);
    pop();

    introTimer2++;
    if (introTimer2 >= introDuration2) {
      showIntroText2 = false;
    }
  }
  
  return trash2.length === 0;
}

export function checkCollisions() {
  for (let mine of mines) {
    if (player.overlapping(mine)) {
      return true;
    }
  }
  return false;
}

export function cleanup() {
  if (player) player.remove();
  machines.forEach(machine => machine.remove());
  trash2.forEach(item => item.remove());
  mines.forEach(mine => mine.remove());
  machines = [];
  trash2 = [];
  mines = [];
  player = null;
  carriedTrash = null;
  showIntroText2 = true;
  introTimer2 = 0;
}

export function getTotalScore(level1Score) {
  return level1Score + score2;
}