const canvas = document.createElement('canvas');

const size = 6000;
canvas.width = canvas.height = size;

const ctx = canvas.getContext('2d');

if (!ctx) {
    throw new Error('woops');
}

ctx.fillStyle = 'black';

function isPrime(num: number): boolean {
    if (num <= 3) {
        return true;
    }
    if ((num % 2 === 0) || (num % 3 === 0)) {
        return false;
    }
    for(let i = 5; i * i <= num; i += 6) {
        if (num % i == 0 || (num % (i + 2)) === 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(5));

const enum Direction {
    Right,
    Down,
    Left,
    Up,
}

let posX = size / 2;
let posY = size / 2;
let curr = 0;
let currDir = Direction.Left;


function nextDirection(dir: Direction): Direction {
    return (dir + 1) % 4;
}

function drawNext() {
    for(let i = 0; i < 1000; ++i) {
        if (isPrime(curr)) {
            currDir = nextDirection(currDir);
        }
    
        switch (currDir) {
            case Direction.Right:
                posX++;
                break;
            case Direction.Down:
                posY++;
                break;
            case Direction.Left:
                posX--;
                break;
            case Direction.Up:
                posY--;
                break;
        }
        ctx!.fillRect(posX, posY, 1, 1);
        curr++;
    }

    requestAnimationFrame(drawNext);
}

document.body.appendChild(canvas);

requestAnimationFrame(drawNext);