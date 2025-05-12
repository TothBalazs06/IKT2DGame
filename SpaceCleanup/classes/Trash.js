export default class Trash {
    constructor(x, y) {
        this.sprite = new Sprite(x, y, 20, 20);
        this.sprite.color = "green";
        this.speed = random(1, 2); // Függőleges sebesség
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
