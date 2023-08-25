const etchASketchBoard = document.getElementById("etch-a-sketch-board");
let colorSelector;
function randomColorGenerator() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
const blackButton = document.querySelector("#black-button");
const rainbowButton = document.querySelector("#rainbow-button");
rainbowButton.onclick = function () {
    colorSelector = "rainbow";
    rainbowButton.style.opacity = "1";
    blackButton.style.opacity = "0.6";
}

blackButton.onclick = function () {
    colorSelector = "black";
    rainbowButton.style.opacity = "0.6";
    blackButton.style.opacity = "1";
}

function createGrid(totalNumberOfSquaresInGrid) {
    const numberOfRows = Math.floor(Math.sqrt(totalNumberOfSquaresInGrid));
    etchASketchBoard.style.gridTemplateRows = `repeat(${numberOfRows}, 1fr)`;
    etchASketchBoard.style.gridTemplateColumns = `repeat(${numberOfRows}, 1fr)`;
    for (let i = 0; i < numberOfRows * numberOfRows; i++) {
         const oneSquare = document.createElement('div');
         oneSquare.setAttribute("style", "background: white; border-style: none;");
         etchASketchBoard.appendChild(oneSquare);
         oneSquare.onmouseover = function () {
             if (colorSelector === "black") {
                 oneSquare.style.backgroundColor = "black";
             } else {
                 oneSquare.style.backgroundColor = randomColorGenerator();
             }
         }
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const slider = document.querySelector("#grid-size-slider");
window.onload = function () {
    createGrid(4);
}

slider.addEventListener("input", () => {
    removeAllChildNodes(etchASketchBoard);
    console.log(slider.value);
    createGrid(slider.value);
})

const settingsButton = document.querySelector("#settings-button");
const settingsContainer = document.querySelector("#settings-container");

settingsButton.onclick = function () {
    if (settingsContainer.style.display === "none"){
        settingsContainer.style.display = "flex";
    } else {
        settingsContainer.style.display = "none";
    }
}

if (colorSelector === "rainbow") {
    rainbowButton.style.opacity = "1";
}

let resetButton = document.getElementById("reset-button");

resetButton.onclick = function () {
    const currentSquares = etchASketchBoard.children;
    for (let eachSquare of currentSquares) {
        eachSquare.style.backgroundColor = "white";
    }
}