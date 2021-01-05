//BUGS: when you hold mouse and get out of the container, and let go of mouse, when you return, you can still paint

//PaintBoard
const paintBoard = document.createElement('div');
const main = document.querySelector('main');
main.appendChild(paintBoard);
paintBoard.classList.add('container');



////WIP - Creating a text place, where you can enter how many pixels you want, max being 50x50

////------------------------------------------------------

//This creates 100 pixels(divs), for now it's set in stone, but I will make it flexible in the near future.


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function gridRoww(num, rowNum) {


    const gridRow = document.createElement('div');
    paintBoard.appendChild(gridRow);
    gridRow.classList.add(`row${rowNum}`);




    for (let i = 0; i < num; i++) {
        const pixel = document.createElement('div');
        document.querySelector(`.row${rowNum}`).appendChild(pixel);
        pixel.classList.add('pixel');

    }


}

function gridSize(num) {
    removeAllChildNodes(paintBoard)
    for (let i = 1; i < num + 1; i++) {

        gridRoww(num, i)
    }
}
gridSize(10)

const range = document.querySelector('#input')
const label = document.querySelector('#sizeLabel')

range.addEventListener('input', (e) => {
    label.innerHTML = `${range.value} x ${range.value}`
})

range.addEventListener('change', (e) => {
    gridSize(parseInt(range.value))

})










//Universal pixel and container selector
const allPixels = document.querySelectorAll('.pixel');
const board = document.querySelector('.container');

//selected pixel:

function changeColor(e) {
    e.target.style.backgroundColor = `${chosenColor[0]}`
}



//---------------
//mouseover only until mousedown is true

let isMouseDown = false; //used for: you only want one event to run only if another one runs, I want mousedown to run first, then if its still true, I want mouseover to run, until mousedown is false

document.body.addEventListener('mouseup', (e) => { //bug fix, if you mouseup outside the board, it will make it so you can't paint again when you reenter the board unless you click again
    isMouseDown = false;
})


board.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = `${chosenColor[0]}`
    isMouseDown = true;
})

board.addEventListener('mouseup', (e) => {
    isMouseDown = false;
})

board.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        e.preventDefault();//This will stop the event from trying to drag elements aswell(it was my problem at the time and it f**king sucked)
        e.target.style.backgroundColor = `${chosenColor[0]}`
    } else {
        e.target.removeEventListener('mouseover', changeColor)
    }

})
//----------




//PaintBoard
//-----------------------------------------------------------------------------------------------
//color pallet
//colors [blue, red, purple, green, yellow, orange, white, black]

const allColors = ['blue', 'red', 'purple', 'green', 'yellow', 'orange', 'white', 'black'];
let chosenColor = ['blue']; //default is blue
const colorChoice = document.createElement('div');
document.body.appendChild(colorChoice);
colorChoice.classList.add('colorPicker');


for (let i = 0; i < 8; i++) {
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
        const test = paintBoard.children[i];
        for (let j = 0; j < paintBoard.children.length; j++) {
            if (test.children[j].style.backgroundColor.length > 0) {
                test.children[j].style.backgroundColor = null;
            }

        }
    }
})
//clear button


//grid lines
const gridLines = document.querySelector('#gridLine')
gridLines.addEventListener('change', (e) => {

    for (let i = 0; i < range.value; i++) {
        const test = paintBoard.children[i];
        for (let j = 0; j < paintBoard.children.length; j++) {
            test.children[j].classList.toggle('lines')
        }
    }
})
//grid lines


