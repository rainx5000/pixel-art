//PaintBoard
const paintBoard = document.createElement('div');
document.body.appendChild(paintBoard);
paintBoard.classList.add('container');

////WIP - Creating a text place, where you can enter how many pixels you want, max being 50x50
const form = document.createElement('form');
document.body.appendChild(form);
form.classList.add('userInput');

const newInput = document.createElement('input');
const userInput = document.querySelector('.userInput');
userInput.appendChild(newInput);
userInput.classList.add('userInput');
////------------------------------------------------------

//This creates 100 pixels(divs), for now it's set in stone, but I will make it flexible in the near future.
for (let i = 0; i < 100; i++) {
    const pixel = document.createElement('div')
    document.querySelector('.container').appendChild(pixel);
    pixel.classList.add('pixel')
}

//Universal pixel and container selector
const allPixels = document.querySelectorAll('.pixel');
const board = document.querySelector('.container');

//selected pixel:

function changeColor(event) {
    event.target.style.backgroundColor = `${chosenColor[0]}`
}



for (let pixel of allPixels) { //This is my default sort of thing, it will execute on pixel when you mouse down on it
    pixel.addEventListener('mousedown', () => {
        pixel.style.backgroundColor = `${chosenColor[0]}`
    })
}

//---------------
//mouseover only until mousedown is true

let isMouseDown = false; //used for: you only want one event to run only if another one runs, I want mousedown to run first, then if its still true, I want mouseover to run, until mousedown is false

board.addEventListener('mousedown', (event) => {
    isMouseDown = true;
})

board.addEventListener('mouseup', (event) => {
    isMouseDown = false;
})

board.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        event.preventDefault(); //This will stop the event from trying to drag elements aswell(it was my problem at the time and it f**king sucked)
        for (let pixel of allPixels) {
            pixel.addEventListener('mouseover', changeColor)
        }
    } else {
        for (let pixel of allPixels) {
            pixel.removeEventListener('mouseover', changeColor)
        }
    }

})
//----------




//PaintBoard
//-----------------------------------------------------------------------------------------------
//color pallet
//colors [blue, red, purple, green, yellow, orange, white, black]

const allColors = ['blue', 'red', 'purple', 'green', 'yellow', 'orange', 'white', 'black'];
let chosenColor = []; //default is none
const colorChoice = document.createElement('div');
document.body.appendChild(colorChoice);
colorChoice.classList.add('colorPicker');


for (let i = 0; i < 8; i++) {
    const pixel = document.createElement('div')
    document.querySelector('.colorPicker').appendChild(pixel);
    pixel.classList.add('color');
    let color = pixel.style.backgroundColor = `${allColors[i]}`
    pixel.addEventListener('click', () => {
        chosenColor = [];
        chosenColor.push(color);
    })

}
//color pallet
//-----------------------------------------------------------------------------------------------
//clear button
const clearBoard = document.createElement('button');
clearBoard.innerText = 'clear'
document.body.appendChild(clearBoard);
clearBoard.setAttribute('id', 'clearAll')

clearBoard.addEventListener('click', () => {
    for (let pixel of allPixels) {
        const pixelBgc = pixel.style.backgroundColor;
        if (pixelBgc.length > 0) {
            pixel.style.backgroundColor = null
        }
    }
})
//clear button

