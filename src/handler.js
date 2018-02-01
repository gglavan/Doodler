// const electron = require('electron');
// const ipcRenderer = electron.ipcMain;

let prevTool = null;
let activeTool;

/////////////////////////////////////////////////

const Pencil = {
    body: document.getElementById('pencil'),
    size: 1,
    color: '#000',
    active: false
}

/////////////////////////////////////////////////

Pencil.body.addEventListener('click', pencilDraw);

function pencilDraw() {
    if (prevTool)
        prevTool.body.classList.remove('active-option')
    prevTool = Pencil;
    activeTool = Pencil;
    Pencil.body.classList.add('active-option');
    Pencil.active = true;
}

/////////////////////////////////////////////////

const Brush = {
    body: document.getElementById('brush'),
    size: 5,
    color: '#000',
    active: false
}

Brush.body.addEventListener('click', brushDraw);

function brushDraw() {
    if (prevTool)
        prevTool.body.classList.remove('active-option')
    prevTool = Brush;
    activeTool = Brush;
    Brush.body.classList.add('active-option');
    Brush.active = true;
}

/////////////////////////////////////////////////

const Palette = {
    body: document.getElementById('color-palette'),
    color: '#000',
    active: false
}

Palette.body.addEventListener('click', colorSelector);

function colorSelector() {
    if (prevTool)
        prevTool.body.classList.remove('active-option')
    prevTool = Palette;
    activeTool = Palette;
    Palette.body.classList.add('active-option');
    Palette.active = true;
}

/////////////////////////////////////////////////

const Rubber = {
    body: document.getElementById('rubber'),
    size: 30,
    color: '#fff',
    active: false
}

Rubber.body.addEventListener('click', erase);

function erase() {
    if (prevTool)
        prevTool.body.classList.remove('active-option')
    prevTool = Rubber;
    activeTool = Rubber;
    Rubber.body.classList.add('active-option');
    Rubber.active = true;
}

/////////////////////////////////////////////////

const Crop = {
    body: document.getElementById('rubber'),
    size: 5,
    active: false
}

Rubber.body.addEventListener('click', erase);

function erase() {
    if (prevTool)
        prevTool.body.classList.remove('active-option')
    prevTool = Rubber;
    activeTool = Rubber;
    Rubber.body.classList.add('active-option');
    Rubber.active = true;
}





// export default activePencil;


// window.onload = function() {
//   if (window.jQuery) {  
//       // jQuery is loaded  
//       alert("Yeah!");
//   } else {
//       // jQuery is not loaded
//       alert("Doesn't Work");
//   }
// }



// $('#pencil')
//   .popup({
//     position : 'right center',
//     target   : '#pencil',
//     title    : 'My favorite dog',
//     content  : 'My favorite dog would like other dogs as much as themselves'
//   })
// ;