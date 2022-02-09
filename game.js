var LEVEL1 = [[0,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,2,2,2,2,2,2,2,2,2,2,2,1],[1,1,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,5,2,2,4,2,2,3,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,1,1,1],[1,2,2,2,2,2,2,2,2,2,2,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,0,0]]

var LEVEL2 = [[1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,1],[1,2,2,2,1,1,2,2,1],[1,1,2,2,2,2,2,2,1],[0,1,2,1,1,1,1,1,1],[0,1,4,1,0,0,0,0,0],[0,1,2,1,1,0,0,0,0],[1,1,2,3,1,1,1,0,0],[1,2,5,4,2,5,1,0,0],[1,1,1,1,1,1,1,0,0]]

LEVEL3 = [[1,1,1,1,1,1,0,0,1,1,1,0],[1,5,5,2,2,1,0,1,1,3,1,1],[1,5,5,2,2,1,1,1,2,2,2,1],[1,5,5,2,2,2,2,2,4,4,2,1],[1,5,5,2,2,1,2,1,2,4,2,1],[1,5,5,1,1,1,2,1,2,4,2,1],[1,1,1,1,2,4,2,1,4,2,2,1],[0,0,0,1,2,2,4,1,2,4,2,1],[0,0,0,1,2,4,2,2,4,2,2,1],[0,0,0,1,2,2,1,1,2,2,2,1],[0,0,0,1,1,1,1,1,1,1,1,1]]

let level1Target = [{row:"4", col:"4"}]



const game = {
    init: function () {
        console.log("Valami")
        this.drawBoard();
        let myNavbar = document.querySelector(".navbar");
        // console.log(myNavbar);

        // TODO: do the rest of the game setup here (eg. add event listeners)
        // this.initRightClick();
        // this.initLeftClick();
    },

    drawBoard: function () {

        const rows = LEVEL1.length
        const cols = LEVEL1[0].length

        let gameField = document.querySelector(".game-field");
        // console.log(gameField);
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
                switch (LEVEL1[row][col]) {
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
                // console.log(`end cell ${row} ${col}`)
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
    switch (event.key) {
        case "ArrowLeft":
            let newCol = String(Number(currentCol) - 1);
            let newCell1 = document.querySelector(`[data-row = '${currentRow}' ][data-col = '${newCol}' ]`);
            // console.log(newCell1.className);
            if (newCell1.className !== 'wall') {
                if (newCell1.className == 'box') {
                    let newBoxCol = String(Number(newCol) - 1);
                    let newBoxCell1 = document.querySelector(`[data-row = '${currentRow}' ][data-col = '${newBoxCol}' ]`);
                    newBoxCell1.className = "box"
                }
                newCell1.className = "player"
                player.className = "field";
            }
            break;
        case "ArrowRight":
            let newColumn = String(Number(currentCol) + 1);
            let newCell2 = document.querySelector(`[data-row = '${currentRow}' ][data-col = '${newColumn}' ]`);
            let newBoxCol = String(Number(newColumn) + 1);
            let newBoxCell2 = document.querySelector(`[data-row = '${currentRow}' ][data-col = '${newBoxCol}' ]`);
            if (newCell2.className == 'field') {
                newCell2.className = "player"
                player.className = "field";
            } else if ((newCell2.className == 'box') && (newBoxCell2.className !== 'wall')) {
                newBoxCell2.className = "box";
                newCell2.className = "player";
                player.className = "field";
            } else {
                console.log("else")
            }
            break;
        case "ArrowUp":
            let newRow = String(Number(currentRow) - 1);
            let newCell3 = document.querySelector(`[data-row = '${newRow}' ][data-col = '${currentCol}' ]`);
            if (newCell3.className !== 'wall') {
                if (newCell3.className == 'box') {
                    let newBoxRow = String(Number(newRow) - 1);
                    let newBoxCell3 = document.querySelector(`[data-row = '${newBoxRow}' ][data-col = '${currentCol}' ]`);
                    newBoxCell3.className = "box"
                }
                newCell3.className = "player"
                player.className = "field";
            }
            break;
        case "ArrowDown":
            let new_Row = String(Number(currentRow) + 1);
            let newCell4 = document.querySelector(`[data-row = '${new_Row}' ][data-col = '${currentCol}' ]`);
            if (newCell4.className !== 'wall') {
                if (newCell4.className == 'box') {
                    let newBox_Row = String(Number(new_Row) + 1);
                    let newBoxCell4 = document.querySelector(`[data-row = '${newBox_Row}' ][data-col = '${currentCol}' ]`);
                    newBoxCell4.className = "box"
                }
                newCell4.className = "player"
                player.className = "field";
            }
            break;
    }
});



function targetChecker (){
    for(let element of level1Target){
        let row = element.row
        let col = element.col
        let currentCell = document.querySelector(`[data-row = '${row}' ][data-col = '${col}' ]`);
        console.log(currentCell)
        if (currentCell.className == "field"){
            console.log("bent van")
            currentCell.className = "target"
        }
    }

}

targetChecker()