var LEVEL1 = [[0,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,2,2,2,2,2,2,2,2,2,2,2,1],[1,1,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,5,2,2,4,2,2,3,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,1,1,1],[1,2,2,2,2,2,2,2,2,2,2,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,0,0]]

var LEVEL2 = [[1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,1],[1,2,2,2,1,1,2,2,1],[1,1,2,2,2,2,2,2,1],[0,1,2,1,1,1,1,1,1],[0,1,4,1,0,0,0,0,0],[0,1,2,1,1,0,0,0,0],[1,1,2,3,1,1,1,0,0],[1,2,5,4,2,5,1,0,0],[1,1,1,1,1,1,1,0,0]]

LEVEL3 = [[1,1,1,1,1,1,0,0,1,1,1,0],[1,5,5,2,2,1,0,1,1,3,1,1],[1,5,5,2,2,1,1,1,2,2,2,1],[1,5,5,2,2,2,2,2,4,4,2,1],[1,5,5,2,2,1,2,1,2,4,2,1],[1,5,5,1,1,1,2,1,2,4,2,1],[1,1,1,1,2,4,2,1,4,2,2,1],[0,0,0,1,2,2,4,1,2,4,2,1],[0,0,0,1,2,4,2,2,4,2,2,1],[0,0,0,1,2,2,1,1,2,2,2,1],[0,0,0,1,1,1,1,1,1,1,1,1]]

let level1Targets = [{row:"4", col:"4"}]
let level2Targets = [{row:"9", col:"2"}]
let level3Targets = [{row:"1", col:"1"}, {row:"1", col:"2"}, {row:"2", col:"1"}, {row:"2", col:"2"}, {row:"3", col:"1"}, {row:"3", col:"2"}, {row:"4", col:"1"}, {row:"4", col:"2"}, {row:"5", col:"1"}, {row:"5", col:"2"}]




const game = {
    init: function () {
        this.drawBoard();
        let myNavbar = document.querySelector(".navbar");
    },

    drawBoard: function () {
        const rows = LEVEL1.length
        const cols = LEVEL1[0].length

        let gameField = document.querySelector(".game-field");
        this.setGameFieldSize(gameField, rows, cols);
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

function movement(player, newCell, newBoxCell) {
    if (newCell.className == 'field' || newCell.className == 'target') {
                newCell.className = "player"
                player.className = "field";
            } else if ((newCell.className == 'box') && (newBoxCell.className !== 'wall') && (newBoxCell.className !== 'box')) {
                newBoxCell.className = "box";
                newCell.className = "player";
                player.className = "field";
            } else {
                console.log("else")
            }
}


var keypressCount = 0
let player = document.querySelector('.player')
let myBody = document.querySelector('body')

myBody.addEventListener('keydown', function(event) {
    keypressCount++
    let myKeypressCounter = document.querySelector('.keypressCounter')
    myKeypressCounter.innerHTML = `Number of your moves: ${keypressCount}`
    let player = document.querySelector('.player')
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    const currentRow = player.getAttribute("data-row")
    const currentCol = player.getAttribute("data-col")
    switch (event.key) {
        case "ArrowLeft":
            console.log(keypressCount)
            let newCol = String(Number(currentCol) - 1);
            let newCell1 = document.querySelector(`[data-row = '${currentRow}' ][data-col = '${newCol}' ]`);
            let newBoxCol1 = String(Number(newCol) - 1);
            let newBoxCell1 = document.querySelector(`[data-row = '${currentRow}' ][data-col = '${newBoxCol1}' ]`);
            movement(player, newCell1, newBoxCell1)
            break;
        case "ArrowRight":
            let newColumn = String(Number(currentCol) + 1);
            let newCell2 = document.querySelector(`[data-row = '${currentRow}' ][data-col = '${newColumn}' ]`);
            let newBoxCol2 = String(Number(newColumn) + 1);
            let newBoxCell2 = document.querySelector(`[data-row = '${currentRow}' ][data-col = '${newBoxCol2}' ]`);
            movement(player, newCell2, newBoxCell2)
            break;
        case "ArrowUp":
            let newRow = String(Number(currentRow) - 1);
            let newCell3 = document.querySelector(`[data-row = '${newRow}' ][data-col = '${currentCol}' ]`);
            let newBoxRow = String(Number(newRow) - 1);
            let newBoxCell3 = document.querySelector(`[data-row = '${newBoxRow}' ][data-col = '${currentCol}' ]`);
            movement(player, newCell3, newBoxCell3)
            break;
        case "ArrowDown":
            let new_Row = String(Number(currentRow) + 1);
            let newCell4 = document.querySelector(`[data-row = '${new_Row}' ][data-col = '${currentCol}' ]`);
            let newBox_Row = String(Number(new_Row) + 1);
            let newBoxCell4 = document.querySelector(`[data-row = '${newBox_Row}' ][data-col = '${currentCol}' ]`);
            movement(player, newCell4, newBoxCell4)
            break;
    }
    targetChecker()
});


let myRestartButton = document.querySelector(".button-restart")
myRestartButton.addEventListener("click", function(event) {
    location.reload()
} );



function targetChecker (){
    let counter = 0
    for(let element of level1Targets){
        let row = element.row
        let col = element.col
        let currentCell = document.querySelector(`[data-row = '${row}' ][data-col = '${col}' ]`);
        console.log(currentCell)
        if (currentCell.className == "field"){
            console.log("bent van")
            currentCell.className = "target"
        }
        if (currentCell.className == "box"){
            counter++
        }
    }
    if (counter == level1Targets.length){
        winner()
    }
}

function winner () {
        let counter = 0;
        for(let element of level1Targets){
        let row = element.row
        let col = element.col
        let currentCell = document.querySelector(`[data-row = '${row}' ][data-col = '${col}' ]`);
        console.log(currentCell)
        if (currentCell.className == "box") {
            counter++
        }
        if (counter == level1Targets.length){
        console.log("nyertel")
        alert("YESSSSS")
        }
    }
};

