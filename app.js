


const paintBoard = document.createElement('div');
const main = document.querySelector('main');//main content controls and grid
main.appendChild(paintBoard);
paintBoard.classList.add('container');


////------------------------------------------------------



//clears the board before inserting a new grid size
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}
//function that generates a row
function gridRow(num, rowNum) {
    const gridRow = document.createElement('div');
    paintBoard.appendChild(gridRow);
    gridRow.classList.add(`row${rowNum}`);

    for (let i = 0; i < num; i++) {
        const pixel = document.createElement('div');
        document.querySelector(`.row${rowNum}`).appendChild(pixel);
        pixel.classList.add('pixel');
    }
}
//function that multiplies the rows by the same amount it used to create a row
function gridSize(num) {
    removeAllChildNodes(paintBoard)
    for (let i = 1; i < num + 1; i++) {
        gridRow(num, i)
    }
}

gridSize(10)//default size

//our range input, and generating grid, with or without grid lines

const range = document.querySelector('#input')
const label = document.querySelector('#sizeLabel')

range.addEventListener('input', (e) => {
    label.innerHTML = `${range.value} x ${range.value}`
})

range.addEventListener('change', (e) => {

    gridSize(parseInt(range.value))

    for (let i = 0; i < range.value; i++) {
        const rows = paintBoard.children[i];
        for (let j = 0; j < paintBoard.children.length; j++) {
            if (gridLines.checked) {
                rows.children[j].classList.remove('lines')
            } else {
                rows.children[j].classList.add('lines')
            }
        }
    }
})

//paintbrush
function changeColor(e) {
    e.target.style.backgroundColor = `${chosenColor[0]}`
}
//paintbrush

//-------------------------------------------------------------------------------------------------------------
//This will let me paint while I hold my mouse down

let isMouseDown = false; //used for: you only want one event to run only if another one runs, I want mousedown to run first, then if its still true, I want mouseover to run, until mousedown is false

document.body.addEventListener('mouseup', (e) => { //bug fix, if you mouseup outside the board, it will make it so you can't paint again when you reenter the board unless you click again
    isMouseDown = false;
})


paintBoard.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = `${chosenColor[0]}` //This would let me paint over the first element clicked
    isMouseDown = true;
})

paintBoard.addEventListener('mouseup', (e) => {
    isMouseDown = false;
})

paintBoard.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        e.preventDefault();//This will stop the event from trying to drag elements aswell(it was my problem at the time and it f**king sucked)
        e.target.style.backgroundColor = `${chosenColor[0]}`
    } else {
        e.target.removeEventListener('mouseover', changeColor)
    }

})

//PaintBoard
//-----------------------------------------------------------------------------------------------
//color pallet
//colors [blue, red, purple, green, yellow, orange, white, black]

const allColors = ['blue', 'red', 'purple', 'green', 'yellow', 'orange', 'white', 'black', 'saddlebrown']; //small color pallet 
let chosenColor = ['blue']; //default brush color is blue
document.querySelector('#currentColor').style.backgroundColor = ['blue'];//default current color showcaser

const colorChoice = document.createElement('div');
main.appendChild(colorChoice);
colorChoice.classList.add('colorPicker');


for (let i = 0; i < 9; i++) {
    const pixel = document.createElement('div')
    document.querySelector('.colorPicker').appendChild(pixel);
    pixel.classList.add('color');
    let color = pixel.style.backgroundColor = `${allColors[i]}`
    pixel.addEventListener('click', (e) => {
        chosenColor = [];
        chosenColor.push(color);
        //current color
        const currentColor = document.querySelector('#currentColor');
        currentColor.style.backgroundColor = `${chosenColor[0]}`
        const currentColorLabel = document.querySelector('#colorLabel');
        currentColorLabel.innerHTML = `${chosenColor[0]}`
        //current color
        //eraser to not active
        if (chosenColor[0] !== 'white') {
            eraser.classList.remove('eraserActive')
        }
        //eraser to not active

    })
    pixel.addEventListener('mouseenter', (e) => {
        e.target.classList.toggle('highlightColor')
    })
    pixel.addEventListener('mouseleave', (e) => {
        e.target.classList.toggle('highlightColor')
    })
}

//color pallet
//-----------------------------------------------------------------------------------------------
//clear button
const clearBoard = document.querySelector('#clearAll')

clearBoard.addEventListener('click', (e) => {

    for (let i = 0; i < range.value; i++) {
        const rows = paintBoard.children[i];
        for (let j = 0; j < paintBoard.children.length; j++) {
            if (rows.children[j].style.backgroundColor.length > 0) {
                rows.children[j].style.backgroundColor = null;
            }
        }
    }
})
//clear button


//grid lines
const gridLines = document.querySelector('#gridLine')
gridLines.addEventListener('change', (e) => {

    for (let i = 0; i < range.value; i++) {
        const rows = paintBoard.children[i];
        for (let j = 0; j < paintBoard.children.length; j++) {
            rows.children[j].classList.toggle('lines')
        }
    }
})
//grid lines

//custom color//
const custom = document.querySelector('#customColor')
custom.addEventListener('change', (e) => {
    chosenColor = [];
    chosenColor.push(custom.value)
    //current color
    const currentColor = document.querySelector('#currentColor');
    currentColor.style.backgroundColor = `${chosenColor[0]}`
    const currentColorLabel = document.querySelector('#colorLabel');
    currentColorLabel.innerHTML = `${chosenColor[0]}`
    //current color
    //eraser not active
    if (chosenColor[0] !== 'white') {
        eraser.classList.remove('eraserActive')
    }
    //eraser not active
})

custom.addEventListener('click', (e) => {
    console.dir(custom.clientHeight)
    console.dir(e)
    e.view.screen.height = '10'
})
//custom color//

//eraser
const eraser = document.querySelector('.eraser')
eraser.addEventListener('click', (e) => {
    chosenColor = ['white']

    if (chosenColor[0] === 'white') {
        eraser.classList.toggle('eraserActive')
    }
})
//eraser

//
const currentColor = document.querySelector('#currentColor');
currentColor.addEventListener('click', (e) => {
    chosenColor = [];
    chosenColor = [currentColor.style.backgroundColor] || ['blue'];
    if (chosenColor[0] !== 'white') {
        eraser.classList.remove('eraserActive')
    }
})
//



