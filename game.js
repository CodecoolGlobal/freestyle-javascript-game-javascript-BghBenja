const LEVEL1 = [[0,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,2,2,2,2,2,2,2,2,2,2,2,1],[1,1,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,5,2,2,4,2,2,3,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,2,2,1],[1,2,2,2,2,2,2,2,2,2,2,1,1,1],[1,2,2,2,2,2,2,2,2,2,2,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,0,0]]

const LEVEL2 = [[1,1,1,1,1,1,1,1,1],[1,2,2,2,2,2,2,2,1],[1,2,2,2,1,1,2,2,1],[1,1,2,2,2,2,2,2,1],[0,1,2,1,1,1,1,1,1],[0,1,4,1,0,0,0,0,0],[0,1,2,1,1,0,0,0,0],[1,1,2,3,1,1,1,0,0],[1,2,5,4,2,5,1,0,0],[1,1,1,1,1,1,1,0,0]]

const LEVEL3 = [[1,1,1,1,1,1,0,0,1,1,1,0],[1,5,5,2,2,1,0,1,1,3,1,1],[1,5,5,2,2,1,1,1,2,2,2,1],[1,5,5,2,2,2,2,2,4,4,2,1],[1,5,5,2,2,1,2,1,2,4,2,1],[1,5,5,1,1,1,2,1,2,4,2,1],[1,1,1,1,2,4,2,1,4,2,2,1],[0,0,0,1,2,2,4,1,2,4,2,1],[0,0,0,1,2,4,2,2,4,2,2,1],[0,0,0,1,2,2,1,1,2,2,2,1],[0,0,0,1,1,1,1,1,1,1,1,1]]

const level1Targets = [{row:"4", col:"4"}]
const level2Targets = [{row:"8", col:"2"}, {row:"8", col:"5"}]
const level3Targets = [{row:"1", col:"1"}, {row:"1", col:"2"}, {row:"2", col:"1"}, {row:"2", col:"2"}, {row:"3", col:"1"}, {row:"3", col:"2"}, {row:"4", col:"1"}, {row:"4", col:"2"}, {row:"5", col:"1"}, {row:"5", col:"2"}]

let actualLevel = 1

function createLocalstorageElements() {
    if (!localStorage.getItem("highscore1")) {
        console.log(localStorage.getItem("highscore1"))
        localStorage.setItem("highscore1", "Doesn't exist, yet!")
    };
    if (!localStorage.getItem("highscore2")) {
        localStorage.setItem("highscore2", "Doesn't exist, yet!")
    };
    if (!localStorage.getItem("highscore3")) {
        localStorage.setItem("highscore3", "Doesn't exist, yet!")
    }
}

createLocalstorageElements();


const game = {
    init: function (currentLevel) {
        let level = currentLevel;
        this.drawBoard(level);
    },

    drawBoard: function (level) {
        const rows = level.length
        const cols = level[0].length

        let gameField = document.querySelector(".game-field");
        this.setGameFieldSize(gameField, rows, cols);
        for (let row = 0; row < rows; row++) {
            const rowElement = this.addRow(gameField);
            for (let col = 0; col < cols; col++) {
                switch (level[row][col]) {
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


let highscore1 = localStorage.getItem("highscore1");
document.querySelector(".highscore").innerHTML = `Your highscore on this level: ${highscore1}`;
document.querySelector('.title').innerHTML = `DogeMan - Level ${actualLevel}`
game.init(LEVEL1);


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
    console.log(`actual level ${actualLevel}`)
    if (actualLevel == 1) {
        targetChecker(level1Targets)
    } else if (actualLevel == 2) {
        targetChecker(level2Targets)
    } else {
        targetChecker(level3Targets)
    }
});


let myRestartButton = document.querySelector(".button-restart")
myRestartButton.addEventListener("click", function(event) {
    keypressCount = 0;
    document.querySelector('.title').innerHTML = `DogeMan - Level ${actualLevel}`;
    let myKeypressCounter = document.querySelector('.keypressCounter');
    myKeypressCounter.innerHTML = `Number of your moves: ${keypressCount}`
    if (actualLevel == 1) {
        let myBoard = document.querySelector(".game-field")
        myBoard.innerHTML = ""
        game.init(LEVEL1);
    } else if (actualLevel == 2) {
        let myBoard = document.querySelector(".game-field")
        myBoard.innerHTML = ""
        game.init(LEVEL2);
    } else {
        let myBoard = document.querySelector(".game-field")
        myBoard.innerHTML = ""
        game.init(LEVEL3);
    }
} );


function targetChecker (targets){
    let counter = 0
    for(let element of targets){
        let row = element.row
        let col = element.col
        let currentCell = document.querySelector(`[data-row = '${row}' ][data-col = '${col}' ]`);
        if (currentCell.className == "field"){
            currentCell.className = "target"
        }
        if (currentCell.className == "box"){
            counter++
        }
    }
    if (counter == targets.length){
        setLocalStorage();
        if (actualLevel == 3) {
            setTimeout(() => alert("You Won!!!"), 500);
            setTimeout(function(){location.reload()}, 1500);
        } else {
            setTimeout(() => finishingLevel(), 500)
        }
    }
}

function finishingLevel() {
    if (confirm("Proceed to the next level")) {
        if (actualLevel == 1) {
            actualLevel++
            document.querySelector('.title').innerHTML = `DogeMan - Level ${actualLevel}`;
            let myBoard = document.querySelector(".game-field")
            myBoard.innerHTML = ""
            keypressCount = 0
            let myKeypressCounter = document.querySelector('.keypressCounter')
            myKeypressCounter.innerHTML = `Number of your moves: ${keypressCount}`;
            let highscore2 = localStorage.getItem("highscore2");
            document.querySelector(".highscore").innerHTML = `Highscore on this level: ${highscore2}`
            game.init(LEVEL2)
        } else if (actualLevel == 2) {
            actualLevel++
            document.querySelector('.title').innerHTML = `DogeMan - Level ${actualLevel}`;
            let myBoard = document.querySelector(".game-field")
            myBoard.innerHTML = ""
            keypressCount = 0
            let myKeypressCounter = document.querySelector('.keypressCounter')
            myKeypressCounter.innerHTML = `Number of your moves: ${keypressCount}`;
            let highscore3 = localStorage.getItem("highscore3");
            document.querySelector(".highscore").innerHTML = `Highscore on this level: ${highscore3}`
            game.init(LEVEL3)
        } else if (actualLevel == 3) {
            console.log("no more proceed")
        } else {
            alert("You won!")
        }
    } else {
        keypressCount = 0;
        let myKeypressCounter = document.querySelector('.keypressCounter');
        myKeypressCounter.innerHTML = `Number of your moves: ${keypressCount}`;
        if (actualLevel == 1) {
            let myBoard = document.querySelector(".game-field")
            myBoard.innerHTML = ""
            game.init(LEVEL1);
        } else if (actualLevel == 2) {
            let myBoard = document.querySelector(".game-field")
            myBoard.innerHTML = ""
            game.init(LEVEL2);
        } else {
            let myBoard = document.querySelector(".game-field")
            myBoard.innerHTML = ""
            game.init(LEVEL3);
        }
    }
};

function setLocalStorage() {
    if (actualLevel == 1) {
        let allTimeHighscore1 = localStorage.getItem("highscore1");
        if (keypressCount < Number(allTimeHighscore1) || allTimeHighscore1 == "Doesn't exist, yet!") {
            localStorage.setItem("highscore1", keypressCount);
            document.querySelector(".highscore").innerHTML = `Highscore on this level: ${keypressCount}`
            setTimeout(() => alert("New Highscore!"), 500)
        }
    } else if (actualLevel == 2) {
        let allTimeHighscore2 = localStorage.getItem("highscore2");
        if (keypressCount < Number(allTimeHighscore2) || allTimeHighscore2 == "Doesn't exist, yet!") {
            localStorage.setItem("highscore2", keypressCount);
            document.querySelector(".highscore").innerHTML = `Highscore on this level: ${keypressCount}`
            setTimeout(() => alert("New Highscore!"), 500);
        }
    } else if (actualLevel == 3) {
        let allTimeHighscore3 = localStorage.getItem("highscore3");
        if (keypressCount < Number(allTimeHighscore3) || allTimeHighscore3 == "Doesn't exist, yet!") {
            localStorage.setItem("highscore3", keypressCount);
            document.querySelector(".highscore").innerHTML = `Highscore on this level: ${keypressCount}`
            setTimeout(() => alert("New Highscore!"), 500)
        }
    }
    ;
}

