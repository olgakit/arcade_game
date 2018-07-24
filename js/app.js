//Prototype for Player and Enemy
class Creatures {

    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    update() {
        this.boundaryX = this.x > 5;
        this.boundaryY = this.y < 1;;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }
//if enemy and player collide, restart the game through checkCollisions() func in engine.js
    checkCollisions(anyCharacter) {
        if(this.y===anyCharacter.y) {
            if(this.x >= anyCharacter.x-0.75 && this.x <= anyCharacter.x+0.75) {
                return true;
                // alert('stop');
            }
        }
        else {
            return false;
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Creatures {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
        this.moving = false;
        this.victory = false;
    }

    update(dt) {
        super.update();
        if(this.boundaryY && !this.moving && !this.victory) {
            this.victory = true;
            modal1.style.display = 'block';
        }
    }

    render() {
        super.render();
        this.moving = false;
    }

    handleInput(press) {
        switch(press) {
            case 'left':
                this.x = this.x > 0 ? this.x-1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y-1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x+1 : this.x;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y+1 : this.y;
                break;
            default:
                break;
        }
        this.moving = true;
    }
}

// Enemies our player must avoid
class Enemy extends Creatures {
    constructor(x, y, speed) {
        super();
        // Draw the enemy on the screen, required method for game
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        super.update();
        if(this.boundaryX===true) {
            this.x = -1;
        } else {
            this.x += Math.random(dt)/this.speed;
        }
    }
}

// Now instantiate your objects.
// Place the player object in a variable called player
const player = new Player();
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(-1,1,7),
    new Enemy(-1,2,10),
    new Enemy(-3,3,16)
];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
