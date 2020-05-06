const container = document.getElementById('container');
const reset = document.querySelector('#reset');
const black = document.querySelector('#black');
const rainbow = document.querySelector('#rainbow');
const random = document.querySelector('#random');
const eraser = document.querySelector('.control #eraser');
const precision = document.querySelector('.control #precision');


//Default window
document.addEventListener('DOMContentLoaded', function() {
    makeGrid(16);

    random.classList.add('active');
    drawInRandom();
});

function makeGrid(cols) {
    container.innerHTML = '';

    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (c = 0; c < (cols * cols); c++) {
        let cell = document.createElement('div');
        container.appendChild(cell).className = 'grid-item';
    }
}

//Reset
reset.addEventListener('click', function() {
    let num = prompt('What grid size would you like?', '16');
    if (num == '' || (num == 0)) {
        num = 16;
    } else if (num == null) {
        return;
    }

    //Maintain colour mode after reset
    makeGrid(num);
    if(random.classList.contains('active')){
        drawInRandom();
    } else if(rainbow.classList.contains('active')) {
        drawInRainbow();
    } else if(black.classList.contains('active')) {
        drawInBlack();
    }
}); 

//Black button
black.addEventListener('click', drawInBlack, true);

function drawInBlack() {
    black.classList.add('active');
    rainbow.classList.remove('active');
    random.classList.remove('active');
    eraser.classList.remove('on');

    const pixel = document.querySelectorAll('#container div');

    pixel.forEach(pixel => { 
        pixel.addEventListener('mouseover', function() {
            pixel.style.cssText = "background-color: black";
        });
    });
}

//Rainbow button
rainbow.addEventListener('click', drawInRainbow, true);

function drawInRainbow() {
    rainbow.classList.add('active');
    black.classList.remove('active');
    random.classList.remove('active');
    eraser.classList.remove('on');

    const pixel = document.querySelectorAll('#container div');

    pixel.forEach(pixel => { 
        pixel.addEventListener('mouseover', function() {
            pixel.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        });
    });
}

//Random button
random.addEventListener('click', drawInRandom, true);

function drawInRandom() {
    const pixel = document.querySelectorAll('#container div');
    const randomColour = "#"+((1<<24)*Math.random()|0).toString(16);
    random.classList.add('active');
    rainbow.classList.remove('active');
    black.classList.remove('active');
    eraser.classList.remove('on');

    console.log(randomColour);

    pixel.forEach(pixel => { 
        pixel.addEventListener('mouseover', function() {
            pixel.style.backgroundColor = randomColour;
        });
    });
}

//Eraser 
eraser.addEventListener('click', function () {
    random.classList.remove('active');
    rainbow.classList.remove('active');
    black.classList.remove('active');
    eraser.classList.add('on');

    const pixel = document.querySelectorAll('#container div');

    pixel.forEach(pixel => { 
        pixel.addEventListener('mouseover', function() {
            pixel.style.backgroundColor = 'white';
        });
    });
})

