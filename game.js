initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}


let board = ""

for (i = 0; i < 6; i++) {
    for (i = 0; i < 6; i++) {
        board += "<div class='grid-item' id=''></div>"
    }
}

document.querySelector(".board").innerHTML = board

const level1 = [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]]

// function createBoard() {
// }

