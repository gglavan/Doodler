// const electron = require('electron');
// const ipcRenderer = electron.ipcMain;

let prevTool = null;
let activeTool;
let activeColor = "#000";

/////////////////////////////////////////////////

const Pencil = {
    body: document.getElementById('pencil'),
    size: 2,
    color: activeColor,
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
    size: 8,
    color: activeColor,
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
    body: document.getElementById('scissors'),
    size: 5,
    active: false
}

Crop.body.addEventListener('click', crop);

function crop() {
    if (prevTool)
        prevTool.body.classList.remove('active-option')
    prevTool = Crop;
    activeTool = Crop;
    Crop.body.classList.add('active-option');
    Crop.active = true;
}

/////////////////////////////////////////////////

const Rotate = {
    body: document.getElementById('rotate'),
    size: 5,
    active: false
}

Rotate.body.addEventListener('click', rotate);

function rotate() {
    if (prevTool)
        prevTool.body.classList.remove('active-option')
    prevTool = Rotate;
    activeTool = Rotate;
    Rotate.body.classList.add('active-option');
    Rotate.active = true;
}

/////////////////////////////////////////////////

const Zoom = {
    body: document.getElementById('zoom'),
    size: 5,
    active: false
}

Zoom.body.addEventListener('click', zoom);

function zoom() {
    if (prevTool)
        prevTool.body.classList.remove('active-option')
    prevTool = Zoom;
    activeTool = Zoom;
    Zoom.body.classList.add('active-option');
    Zoom.active = true;
}




// export default activePencil;
