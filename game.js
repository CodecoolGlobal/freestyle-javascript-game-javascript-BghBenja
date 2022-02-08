const game = {
    init: function () {
        console.log("Valami")
        this.drawBoard();
        let myNavbar = document.querySelector(".navbar");
        console.log(myNavbar);

        // TODO: do the rest of the game setup here (eg. add event listeners)
        this.initRightClick();
        this.initLeftClick();
    },

    drawBoard: function () {

        const rows = 10
        const cols = 10

        let gameField = document.querySelector(".game-field");
        console.log(gameField);
        this.setGameFieldSize(gameField, rows, cols);
        let cellIndex = 0
        for (let row = 0; row < rows; row++) {
            const rowElement = this.addRow(gameField);
            for (let col = 0; col < cols; col++) {
                this.addCell(rowElement, row, col);
                cellIndex++;
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
    addCell: function (rowElement, row, col) {
        rowElement.insertAdjacentHTML(
            'beforeend',
            `<div class="field"
                        data-row="${row}"
                        data-col="${col}"></div>`);
    },

};

game.init();

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

