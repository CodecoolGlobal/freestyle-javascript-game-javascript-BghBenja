var LEVEL1 = [[0,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,2,2,2,2,2,2,2,2,2,2,2,1],[1,1,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,5,2,2,4,2,2,3,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,1,1,1],[1,2,2,2,2,2,2,2,2,2,2,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,0,0]]

var LEVEL2 = [[1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,1],[1,2,2,2,1,1,2,2,1],[1,1,2,2,2,2,2,2,1],[0,1,2,1,1,1,1,1,1],[0,1,4,1,0,0,0,0,0],[0,1,2,1,1,0,0,0,0],[1,1,2,3,1,1,1,0,0],[1,2,5,4,2,5,1,0,0],[1,1,1,1,1,1,1,0,0]]

LEVEL3 = [[1,1,1,1,1,1,0,0,1,1,1,0],[1,5,5,2,2,1,0,1,1,3,1,1],[1,5,5,2,2,1,1,1,2,2,2,1],[1,5,5,2,2,2,2,2,4,4,2,1],[1,5,5,2,2,1,2,1,2,4,2,1],[1,5,5,1,1,1,2,1,2,4,2,1],[1,1,1,1,2,4,2,1,4,2,2,1],[0,0,0,1,2,2,4,1,2,4,2,1],[0,0,0,1,2,4,2,2,4,2,2,1],[0,0,0,1,2,2,1,1,2,2,2,1],[0,0,0,1,1,1,1,1,1,1,1,1]]




const game = {
    init: function () {
        console.log("Valami")
        this.drawBoard();
        let myNavbar = document.querySelector(".navbar");
        console.log(myNavbar);

        // TODO: do the rest of the game setup here (eg. add event listeners)
        // this.initRightClick();
        // this.initLeftClick();
    },

    drawBoard: function () {

        const rows = LEVEL3.length
        const cols = LEVEL3[0].length

        let gameField = document.querySelector(".game-field");
        console.log(gameField);
        this.setGameFieldSize(gameField, rows, cols);
        /*for (let row = 0; row < rows; row++) {
            const rowElement = this.addRow(gameField);
            for (let col = 0; col < cols; col++) {
                if(row===0 || row===(rows-1) || col===0 || col===(cols-1)) {
                    this.addCell(rowElement, row, col, "wall")
                }
                else {
                    this.addCell(rowElement, row, col, "field");
                }
                
            }
        }*/
        console.log("star board")
        for (let row = 0; row < rows; row++) {
            const rowElement = this.addRow(gameField);
            for (let col = 0; col < cols; col++) {
                switch (LEVEL3[row][col]) {
                    case 0:
                        this.addCell(rowElement, row, col, "void");
                        break;
                    case 1:
                        this.addCell(rowElement, row, col, "wall");
                        break;
                    case 2:
                        this.addCell(rowElement, row, col, "field");
                        break;
                    case 3:
                        this.addCell(rowElement, row, col, "player");
                        break;
                    case 4:
                        this.addCell(rowElement, row, col, "box");
                        break;
                    case 5:
                        this.addCell(rowElement, row, col, "target");
                        break;

                }
                console.log(`end cell ${row} ${col}`)
            }
        }
    },

    setGameFieldSize: function (gameField, rows, cols) {
        gameField.style.width = (gameField.dataset.cellWidth * rows) + 'px';
        gameField.style.height = (gameField.dataset.cellHeight * cols) + 'px';
    },
    addRow: function (gameField) {
        gameField.insertAdjacentHTML(
            'beforeend',
            '<div class="row"></div>'
        );
        return gameField.lastElementChild;
    },
    addCell: function (rowElement, row, col, type) {
        rowElement.insertAdjacentHTML(
            'beforeend',
            `<div class="${type}"
                        data-row="${row}"
                        data-col="${col}"></div>`);
    },

};

game.init();


let player = document.querySelector('.player')
let myBody = document.querySelector('body')
myBody.addEventListener('keydown', function(event) {
    let player = document.querySelector('.player')
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    const currentRow = player.getAttribute("data-row")
    const currentCol = player.getAttribute("data-col")
    console.log(currentRow)
    console.log(currentCol)
    console.log(key)
    switch (event.key) {
        case "ArrowLeft":
            console.log("Left")
            break;
        case "ArrowRight":
            console.log("Right")
            break;
        case "ArrowUp":
            // Up pressed
            break;
        case "ArrowDown":
            // Down pressed
            break;
    }
});

function movePlayer() {
    switch (event.key) {
        case "ArrowLeft":
            // Left pressed
            break;
        case "ArrowRight":
            // Right pressed
            break;
        case "ArrowUp":
            // Up pressed
            break;
        case "ArrowDown":
            // Down pressed
            break;
    }
}

switch (event.key) {
    case "ArrowLeft":
        // Left pressed
        break;
    case "ArrowRight":
        // Right pressed
        break;
    case "ArrowUp":
        // Up pressed
        break;
    case "ArrowDown":
        // Down pressed
        break;
}

// initGame();
//
// function initGame() {
//
//     // Your game can start here, but define separate functions, don't write everything in here :)
//
// }
//
//
// let board = ""
//
// for (i = 0; i < 6; i++) {
//     for (i = 0; i < 6; i++) {
//         board += "<div class='grid-item' id=''></div>"
//     }
// }
//
// document.querySelector(".board").innerHTML = board
//
// const level1 = [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]]
//
// // function createBoard() {
// // }

