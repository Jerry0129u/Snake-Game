const scale = 20;

const head = document.getElementById("head");
const area = document.getElementById("area");

const areaWidth = 30;
const areaHeight = 15;

const food = {
    x: 5,
    y: 5,
};

let direction = "up";
let positionX = 5;
let positionY = 5;

function resetGame() {
    area.style.width = `${areaWidth * scale}px`;
    area.style.height = `${areaHeight * scale}px`;
    head.style.display = "block";
    render();
}

function handleKeydown(event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            changeDirection("up");
            break;
        case "ArrowDown":
        case "s":
            changeDirection("down");
            break;
        case "ArrowRight":
        case "d":
            changeDirection("right");
            break;
        case "ArrowLeft":
        case "a":
            changeDirection("left");
            break;
    }
}

function changeDirection(value) {
    if ((direction === "left" || direction === "right") && (value === "up" || value === "down")) {
        direction = value;
    } else if ((direction === "up" || direction === "down") && (value === "right" || value === "left")) {
        direction = value;
    }
}

function goRight() {
    positionX += 1;
    if (positionX >= areaWidth) {
        positionX = 0;
    }
}

function goLeft() {
    positionX -= 1;
    if (positionX < 0) {
        positionX = areaWidth - 1;
    }
}

function goDown() {
    positionY += 1;
    if (positionY >= areaHeight) {
        positionY = 0;
    }
}

function goUp() {
    positionY -= 1;
    if (positionY < 0) {
        positionY = areaHeight - 1;
    }
}

function render() {
    head.style.left = `${positionX * scale}px`;
    head.style.top = `${positionY * scale}px`;
}

function gameloop() {
    switch (direction) {
        case "up":
            goUp();
            break;
        case "down":
            goDown();
            break;
        case "right":
            goRight();
            break;
        case "left":
            goLeft();
            break;
    }

    render();
}

// Event listeners
document.addEventListener("keydown", handleKeydown);

// Initialize game
resetGame();

// Start game loop
let speed = 80;
setInterval(gameloop, speed);
