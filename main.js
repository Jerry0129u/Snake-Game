const scale = 20;

const area = document.getElementById("area");

const areaWidth = 30;
const areaHeight = 15;

let positionX = 5;
let positionY = 5;

// Initialize direction (you might need this globally based on your implementation)
let direction = "right";

const bodyCoordinates = [
    { x: 7, y: 5 },
    { x: 8, y: 5 },
    { x: 9, y: 5 },
    { x: 10, y: 5 }
];

const food = {
    x: 5,
    y: 5,
};

function resetGame() {
    area.style.width = `${areaWidth * scale}px`;
    area.style.height = `${areaHeight * scale}px`;
    render();
}

function handleKeydown(event) {
    console.log(event.key);
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
    if (direction === "left" || direction === "right") {
        if (value === "up" || value === "down") {
            direction = value;
        }
    } else if (direction === "down" || direction === "up") {
        if (value === "right" || value === "left") {
            direction = value;
        }
    }
}

function goRight() {
    positionX += 1;
    if (positionX > areaWidth - 1) {
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
    if (positionY > areaHeight - 1) {
        positionY = 0;
    }
}

function goUp() {
    positionY -= 1;
    if (positionY < 0) {
        positionY = areaHeight - 1;
    }
}

const bodyContainer = document.getElementById("body");

function render() {
    if (food.x === positionX && food.y === positionY) {
        bodyCoordinates.unshift(bodyCoordinates[0]);
    }

    let bodyHtml = "";

    for (let i = 0; i < bodyCoordinates.length; i++) {
        bodyHtml += `<div class="part" style="top: ${bodyCoordinates[i].y * scale}px; left: ${bodyCoordinates[i].x * scale}px;"></div>`;
    }

    bodyContainer.innerHTML = bodyHtml;
}

function gameLoop() {
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

    bodyCoordinates.push({ x: positionX, y: positionY });
    bodyCoordinates.shift();

    render();
}

// Event listeners
document.addEventListener("keydown", handleKeydown);

// Initialize game
resetGame();

// Start game loop
let speed = 80; // Adjust speed as needed
setInterval(gameLoop, speed);
