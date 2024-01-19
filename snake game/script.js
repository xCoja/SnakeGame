const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

// game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    // walls
    if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
        gameOver = true;
    }

    // own tail
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '50px Verdana';
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
        document.getElementById('restartButton').style.display = 'block'; // Show the restart button
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '10px Verdana';
    ctx.fillText('Score ' + score, canvas.width - 50, 10);
}

function clearScreen() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    // Up or 'W' key
    if (event.keyCode === 38 || event.keyCode === 87) {
        if (yVelocity === 1) return;
        yVelocity = -1;
        xVelocity = 0;
    }

    // Down or 'S' key
    if (event.keyCode === 40 || event.keyCode === 83) {
        if (yVelocity === -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }

    // Left or 'A' key
    if (event.keyCode === 37 || event.keyCode === 65) {
        if (xVelocity === 1) return;
        yVelocity = 0;
        xVelocity = -1;
    }

    // Right or 'D' key
    if (event.keyCode === 39 || event.keyCode === 68) {
        if (xVelocity === -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}


function SnakePart(x, y) {
    this.x = x;
    this.y = y;
}

document.getElementById('restartButton').addEventListener('click', function() {
    // Reset game state
    headX = 10;
    headY = 10;
    snakeParts.length = 0;
    tailLength = 2;
    xVelocity = 0;
    yVelocity = 0;
    score = 0;
    document.getElementById('restartButton').style.display = 'none'; // Hide the restart button
    drawGame(); // Restart the game
});

drawGame();
