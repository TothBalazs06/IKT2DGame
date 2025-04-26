// Ship.js
export default class Ship {
    constructor(x, y) {
        this.sprite = new Sprite(x, y, 50, 50);
        this.sprite.color = "blue";
    }
    
    move() {
        if (kb.pressing("left") && this.sprite.x > 25) this.sprite.x -= 5;
        if (kb.pressing("right") && this.sprite.x < width - 25) this.sprite.x += 5;
    }
    
    overlapping(other) {
        return this.sprite.collides(other.sprite);
    }
    
    draw() {
        // p5play will automatically draw sprites
    }
}