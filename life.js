var currentBoard = []
var nextBoard = []
var mousePressed = false
var removeCells = false
var simulationRunning = false

const xSize = 50
const ySize = 50

const gameBoard = document.getElementById('game-board')
gameBoard.onmouseleave = (function() {mouseLeave()})

function mouseLeave() {
    console.log("Mouse has left the board")
    mousePressed = false
}

function initBoard(board) {
    for (let i = 0; i < xSize + 2; i++) {
        let row = []
        for (let j = 0; j < ySize + 2; j++) {
            row.push(0)
        } 
        board.push(row)
    }
}

initBoard(currentBoard)
initBoard(nextBoard)

function setAlive(row, column) {
    console.log("Set alive cell at " + row + ", " + column)
    const cell = document.createElement('div')
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.onmousedown = (function() {mouseDown(row, column)})
    cell.onmouseover = (function() {mouseOver(row, column)})
    cell.onmouseup = (function() {mouseUp(row, column)})
    cell.id = "" + row + column
    cell.classList.add('cell')
    gameBoard.appendChild(cell)
    currentBoard[column][row] = 1
}

function setAliveNotClickable(row, column) {
    const cell = document.createElement('div')
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.id = "" + row + column
    cell.classList.add('cell')
    gameBoard.appendChild(cell)
    currentBoard[column][row] = 1
}

function initSimulation() {
    for (let col = 1; col < ySize + 1; col++) {
        for (let row = 1; row < ySize + 1; row++) {
            let id = "" + row + col
            let cell = document.getElementById(id)
            cell.remove()
            if (currentBoard[col][row] == 1) {
                setAliveNotClickable(row, col)
            } 
        }
    }
}

function setDead(row, column) {
    console.log("Set dead cell at " + row + ", " + column)
    let id = "" + row + column
    let cell = document.getElementById(id)
    cell.remove()
    currentBoard[column][row] = 0
}

function initDead(row, column) {
    console.log("Init new dead cell at " + row + ", " + column)
    const cell = document.createElement('div')
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.onmousedown = (function() {mouseDown(row, column)})
    cell.onmouseover = (function() {mouseOver(row, column)})
    cell.onmouseup = (function() {mouseUp(row, column)})
    gameBoard.appendChild(cell)
    cell.id = "" + row + column
    currentBoard[column][row] = 0
}

function mouseDown(row, column) {
    console.log("Mouse down at " + row + ", " + column)
    if (currentBoard[column][row] == 0) {
        setAlive(row, column)
        removeCells = false
    } else {
        setDead(row, column)
        removeCells = true
    }
    mousePressed = true
}

function mouseUp(row, column) {
    mousePressed = false
}

function mouseOver(row, column) {
    if (mousePressed) {
        if (removeCells && currentBoard[column][row] == 1) {
            setDead(row, column)
        } else if (!removeCells && currentBoard[column][row] == 0) {
            setAlive(row, column)
        }
    }
}


for (let col = 1; col < ySize + 1; col++) {
    for (let row = 1; row < ySize + 1; row++) {
        initDead(row, col)
    }
}


window.addEventListener('keydown', press => {
    if (press.key == 'r' && !simulationRunning) {
        console.log("Start running simulation")
        initSimulation()
        simulationRunning = true
    }
})
