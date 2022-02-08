LEVEL1 = [[01111111111111], \
[01222222222221], \
[11222222222221], \
[12222222222221], \
[12222222222221], \
[12222222222221], \
[12222222222111], \
[12222222222100], \
[11111111111100]]

LEVEL2 = [[111111111], \
[122222221], \
[122211221], \
[112222221], \
[012111111], \
[012100000], \
[012110000], \
[112211100], \
[122222100], \
[111111100]]

LEVEL3 = [[111111001110], \
[122221011211], \
[122221112221], \
[122222222221], \
[122221212221], \
[122111212221], \
[111122212221], \
[000122212221], \
[000122222221], \
[000122112221], \
[000111111111]]




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

        const rows = 9
        const cols = 14

        let gameField = document.querySelector(".game-field");
        console.log(gameField);
        this.setGameFieldSize(gameField, rows, cols);
        for (let row = 0; row < rows; row++) {
            const rowElement = this.addRow(gameField);
            for (let col = 0; col < cols; col++) {
                if(row===0 || row===(rows-1) || col===0 || col===(cols-1)) {
                    this.addCell(rowElement, row, col, "wall")
                }
                else {
                    this.addCell(rowElement, row, col, "field");
                }
                
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

