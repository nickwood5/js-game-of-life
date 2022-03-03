

var array = []
var clone = []
const xSize = 50
const ySize = 50

const gameBoard = document.getElementById('game-board')
for (let i = 0; i < xSize + 2; i++) {
    let row = []
    for (let j = 0; j < ySize + 2; j++) {
        row.push(0)
    } 
    array.push(row)
}

for (let i = 0; i < xSize + 2; i++) {
    let row = []
    for (let j = 0; j < ySize + 2; j++) {
        row.push(0)
    } 
    clone.push(row)
}

console.log(array[0][0])

function drawSquare(x, y) {
    const cell = document.createElement('div')
    cell.style.gridRowStart = y
    cell.id = "" + y + x
    //console.log(cell.id)
    cell.style.gridColumnStart = x
    cell.classList.add('cell')
    cell.onclick = function() {removeSquare(x, y)}
    gameBoard.appendChild(cell)
}

function initBlank(array, x, y) {
    const cell = document.createElement('div')
    cell.style.gridRowStart = y
    //console.log(cell.id)
    cell.style.gridColumnStart = x
    cell.onmousedown = (function() {addTile(array, y, x)})
    gameBoard.appendChild(cell)
}

for (let col = 1; col < ySize; col++) {
    for (let row = 1; row < ySize; row++) {
        initBlank(array, col, row)
    }
}


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
        //console.log("Cell is currently ALIVE")
        if (numLive == 2 || numLive == 3) {
            //console.log("Cell should continue living")
            return 1
        } else {
            //console.log("Cell should die")
            return 0
        }
    } else {
        // Cell is currently dead
        //console.log("Cell is currently DEAD with " + numLive + " neighbours")
        if (numLive == 3) {
            //console.log("Cell should spawn")
            return 1
        } else {
            return 0
        }
    }
}

function step(array) {
    let clonedArray = array.map(a => {return {...a}})
    for (let row = 1; row < ySize + 1; row++) {
        for (let col = 1; col < xSize + 1; col++) {
            array[col][row] = update(clonedArray, row, col)
        }
    }
    return clonedArray
}

//drawSquare(1, 1)

function removeSquare(col, row) {
    let id = "" + row + col
    let myobj = document.getElementById(id);
    myobj.remove();

}

function myFunction() {
    console.log("hi")
}

function addTile(array, row, col) {
    drawSquare(col, row)
    array[col][row] = 1
}

function toggleTile(array, row, col) {
    console.log(array[col][row])
    if (array[col][row] == 1) {
        removeSquare(col, row)
        array[col][row] = 0
        console.log("AAAAAAA")
    } else {
        drawSquare(col, row)
        array[col][row] = 1
        console.log("bbbb")
    }
}

function printBoard(array, previousArray) {
    for (let row = 1; row < ySize + 1; row++) {
        for (let col = 1; col < xSize + 1; col++) {
            if (array[col][row] == 1) {
                if (previousArray[col][row] == 0) {
                    drawSquare(col, row)
                    //console.log('Drawing square')
                }
                //console.log("hi")
            } else {
                if (previousArray[col][row] == 1) removeSquare(col, row)
            }
            //array[col][row] = update(array, row, col)
        }
    }
}



console.log("This is :" + clone[1][1])

printBoard(array, clone)
//console.log("THIS IS " + array[2][1])

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


var running = false

window.addEventListener('keydown', press => {

    if (running == false) {
        if (press.key == "a") {
            console.log("A")
            run()
            running = true
        }
    } else {
        console.log("Alread")
        if (press.key == "r") {
            console.log("Restart simulation")
        }
    }
})


async function run() {
    while (1) {
        await sleep(100)
        clone = step(array)
        printBoard(array, clone)
    }
}




//myobj.remove();


