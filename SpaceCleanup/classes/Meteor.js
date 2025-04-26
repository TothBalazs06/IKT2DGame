export default class Meteor {
    constructor(x, y) {
        this.sprite = new Sprite(x, y, 30, 30);
        this.sprite.color = "red";
        this.speed = random(1, 3); // Függőleges sebesség
    }
    
    move() {
        this.sprite.y += this.speed; // Csak függőlegesen mozogjon
        if (this.sprite.y > height + 20) {
            this.sprite.y = random(-100, -20); // Reset pozíció
            this.sprite.x = random(width);    // Új random X
        }
    }
    
    draw() {
        // Automatikusan rajzolás a p5play által
    }
}
