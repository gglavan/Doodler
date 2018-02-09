const ipcRenderer = require('electron').ipcRenderer;
const { webFrame } = require('electron');
const canvasBuffer = require('electron-canvas-to-buffer')
const fs = require('fs')
const dialog = require('electron').dialog;

let img;
let degrees = 0;

ipcRenderer.on('open-file', (event, file) => {
	img = new Image();
	img.onload = function () {
		canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
	};
	img.src = file;
});

ipcRenderer.on('save-file', (event, file) => {
	const buffer = canvasBuffer(canvas, 'image/png')
	fs.writeFile(file, buffer, function (err) {
		if (err) throw err;
		else console.log(`Write of, ${file}, was successful`);
	})
});

let prevTool = null;
let activeTool;
let activeColor = "#000";
let prevSidebar = null;
let activeSidebar = 0;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function slide() {
	if (!prevSidebar) {
		prevSidebar = activeTool.sidebar;
		activeTool.sidebar.classList.add('slide');
	} else {
		prevSidebar.classList.remove('slide');
		await sleep(150);
		activeTool.sidebar.classList.add('slide');
		prevSidebar = activeTool.sidebar;
	}
}

/////////////////////////////////////////////////

const Pencil = {
	body: document.getElementById('pencil'),
	sidebar: document.getElementById('pencil-sidebar'),
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
	slide();
}

/////////////////////////////////////////////////

const Line = {
	body: document.getElementById('line'),
	sidebar: document.getElementById('line-sidebar'),
	size: 2,
	color: activeColor,
	active: false
}

/////////////////////////////////////////////////

Line.body.addEventListener('click', lineDraw);

function lineDraw() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	prevTool = Line;
	activeTool = Line;
	Line.body.classList.add('active-option');
	Line.active = true;
	slide();
}

/////////////////////////////////////////////////

const Palette = {
	body: document.getElementById('color-palette'),
	sidebar: document.getElementById('palette-sidebar'),
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
	slide();
}

/////////////////////////////////////////////////

const Rubber = {
	body: document.getElementById('rubber'),
	sidebar: document.getElementById('rubber-sidebar'),
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
	slide();
}

/////////////////////////////////////////////////

const Picker = {
	body: document.getElementById('picker'),
	size: 30,
	color: '#fff',
	active: false
}

Picker.body.addEventListener('click', pick);

function pick() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	prevTool = Picker;
	activeTool = Picker;
	Picker.body.classList.add('active-option');
	Picker.active = true;
	// slide();
}

/////////////////////////////////////////////////

const Crop = {
	body: document.getElementById('scissors'),
	sidebar: document.getElementById('scissors-sidebar'),
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
	slide();
}

/////////////////////////////////////////////////

const Rotate = {
	body: document.getElementById('rotate'),
	sidebar: document.getElementById('rotate-sidebar'),
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

  degrees += 90
  if (degrees >= 360) degrees = 0;
  
  if (degrees === 0 || degrees === 180 ) {
      canvas.width = img.width;
      canvas.height = img.height;
  }
  else {
      canvas.width = img.height;
      canvas.height = img.width;
  }
	ctx.save();
	// you want to rotate around center of canvas
	ctx.translate(canvas.width/2,canvas.height/2);
	
	ctx.rotate(degrees*Math.PI/180);
	ctx.drawImage(img, -img.width*0.5, -img.height*0.5);
	ctx.restore();
}

/////////////////////////////////////////////////

const Zoom = {
	body: document.getElementById('zoom'),
	sidebar: document.getElementById('zoom-sidebar'),
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
	slide();
}

/////////////////////////////////////////////////

const Mirror = {
	body: document.getElementById('mirror'),
	sidebar: document.getElementById('mirror-sidebar'),
	size: 1,
	active: false
}

Mirror.body.addEventListener('click', mirror);

function mirror() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	prevTool = Mirror;
	activeTool = Mirror;
	Mirror.body.classList.add('active-option');
	Mirror.active = true;
	slide();
}