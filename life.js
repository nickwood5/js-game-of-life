var currentBoard = []
var nextBoard = []
var mousePressed = false
var removeCells = false
var simulationRunning = false
var stopSimulation = false

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
    cell.id = row + "," + column
    cell.classList.add('cell')
    gameBoard.appendChild(cell)
    currentBoard[column][row] = 1
}

function setAliveNotClickable(row, column) {
    const cell = document.createElement('div')
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.id = row + "," + column
    cell.classList.add('cell')
    gameBoard.appendChild(cell)
    currentBoard[column][row] = 1
}

function initSimulation() {
    for (let col = 1; col < ySize + 1; col++) {
        for (let row = 1; row < ySize + 1; row++) {
            let id = "toggle" + row + col
            let cell = document.getElementById(id)
            cell.remove()
            if (currentBoard[col][row] == 1) {
                setAliveNotClickable(row, col)
                let id = row + "," + col
                let cell = document.getElementById(id)
                cell.remove()
            } 
        }
    }
}

function setDead(row, column) {
    //console.log("Set dead cell at " + row + ", " + column)
    let id = row + "," + column
    let cell = document.getElementById(id)
    cell.remove()
    currentBoard[column][row] = 0
}

function initDead(row, column) {
    //console.log("Init new dead cell at " + row + ", " + column)
    const cell = document.createElement('div')
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.onmousedown = (function() {mouseDown(row, column)})
    cell.onmouseover = (function() {mouseOver(row, column)})
    cell.onmouseup = (function() {mouseUp(row, column)})
    gameBoard.appendChild(cell)
    cell.id = "toggle" + row + column
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
    if (press.code == 'Space' && !simulationRunning) {
        console.log("Start running simulation")
        initSimulation()
        simulationRunning = true
        run()
    } else if (press.code == 'KeyR' && simulationRunning) {
        console.log("Restart")
        stopSimulation = true
    } else if (press.code == 'KeyP' && simulationRunning) {
        console.log("Pause")
        stopSimulation = true
        simulationRunning = false
    } else if (press.code == 'KeyP' && !simulationRunning) {
        console.log("Unpause")
        simulationRunning = true
        stopSimulation = false
        run()        
    }
})

function update(array, row, col) {
    //console.log("THIS IS " + array[2][1])
    //console.log("Analyze tile at " + col + ", " + row)
    let numLive = 0

    let x = col - 1
    for (let y = row - 1; y < row + 2; y++) {
        
        //console.log("Pos at " + x + ", " + y + " is " + array[x][y])
        if (array[x][y] == 1) numLive += 1
    }

    x = col + 1
    for (let y = row - 1; y < row + 2; y++) {
        //console.log("Pos at " + x + ", " + y + " is " + array[x][y])
        if (array[x][y] == 1) numLive += 1
    }

    let y = row + 1
    x = col
    //console.log("Pos at " + y + ", " + x + " is " + array[y][x])
    if (array[x][y] == 1) numLive += 1

    y = row - 1
    //console.log("Pos at " + y + ", " + x + " is " + array[y][x])
    if (array[x][y] == 1) numLive += 1

    let numDead = 8 - numLive
    //console.log(numLive)
    //console.log(numDead)

    if (array[col][row] == 1) {
        if (numLive == 2 || numLive == 3) {
            return 1
        } else {
            return 0
        }
    } else {
        // Cell is currently dead
        //console.log("Cell is currently DEAD with " + numLive + " neighbours")
        if (numLive == 3) {
            //console.log("Cell should spawn")
            return 1
        } else {
            //console.log("Cell should continue dead")
            return 0
        }
    }
}

function step(currentBoard) {
    let clonedArray = currentBoard.map(a => {return {...a}})
    for (let row = 1; row < ySize + 1; row++) {
        for (let col = 1; col < xSize + 1; col++) {
            currentBoard[col][row] = update(clonedArray, row, col)
        }
    }
    return clonedArray
}

function printBoard(array, previousArray) {
    for (let row = 1; row < ySize + 1; row++) {
        for (let col = 1; col < xSize + 1; col++) {
            if (array[col][row] == 1) {
                if (previousArray[col][row] == 0) {
                    setAliveNotClickable(row, col)
                    //console.log('Drawing square')
                    //array[row][col] = 1
                }
                //console.log("hi")
            } else {
                if (previousArray[col][row] == 1) setDead(row, col)
                //array[row][col] = 0
            }
            //array[col][row] = update(array, row, col)
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    while (1) {
        await sleep(100)
        //console.log("ss")
        clone = step(currentBoard)
        printBoard(currentBoard, clone)
        //console.log(currentBoard)
        if (stopSimulation) {
            console.log("Stop")
            return
        }
    }
}

