const ipcRenderer = require('electron').ipcRenderer;
const canvasBuffer = require('electron-canvas-to-buffer');
const fs = require('fs');

let img;
let cropper;
let cPushArray = new Array();
let cStep = -1;

let prevTool = null;
let activeTool;
let activeColor = "#000";
let prevSidebar = null;
let activeSidebar = 0;

ipcRenderer.on('open-file', (event, file) => {
	img = new Image();
	img.onload = function () {
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);
		cPushArray = new Array();
		cStep = -1;
		if (activeTool)
			activeTool.body.classList.remove('active-option')
		activeTool = null;
	};
	img.src = file;
	resetFilters();
});

ipcRenderer.on('save-file', (event, file) => {
	const buffer = canvasBuffer(canvas, 'image/png')
	fs.writeFile(file, buffer, function (err) {
		if (err) throw err;
		else console.log(`Write of, ${file}, was successful`);
	})
});

ipcRenderer.on('undo-option', (event) => {
	cUndo();	
});

ipcRenderer.on('redo-option', (event) => {
	cRedo();	
});

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
	color: activeColor
}

/////////////////////////////////////////////////

Pencil.body.addEventListener('click', pencilDraw);

function pencilDraw() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	if (prevTool == Crop) cropper.destroy();
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
	color: activeColor
}

/////////////////////////////////////////////////

Line.body.addEventListener('click', lineDraw);

function lineDraw() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	if (prevTool == Crop) cropper.destroy();
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
	color: '#000'
}

Palette.body.addEventListener('click', colorSelector);

function colorSelector() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	if (prevTool == Crop) cropper.destroy();
	prevTool = Palette;
	activeTool = Palette;
	Palette.body.classList.add('active-option');
	Palette.active = true;
	slide();
	tempCanvas.width = canvas.width;
	tempCanvas.height = canvas.height;
	tempCtx.drawImage(canvas, 0, 0);
}

/////////////////////////////////////////////////

const Rubber = {
	body: document.getElementById('rubber'),
	sidebar: document.getElementById('rubber-sidebar'),
	size: 30,
	color: '#fff'
}

Rubber.body.addEventListener('click', erase);

function erase() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	if (prevTool == Crop) cropper.destroy();
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
	color: '#fff'
}

Picker.body.addEventListener('click', pick);

function pick() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	if (prevTool == Crop) cropper.destroy();
	prevTool = Picker;
	activeTool = Picker;
	Picker.body.classList.add('active-option');
	Picker.active = true;
	tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx.drawImage(canvas, 0, 0);
}

/////////////////////////////////////////////////

const Crop = {
	body: document.getElementById('scissors'),
	sidebar: document.getElementById('scissors-sidebar'),
	size: 5
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
	const canvas = document.getElementById('can');
	cropper = new Cropper(can, {
  aspectRatio: NaN,
  crop: function(e) {}
});
}

/////////////////////////////////////////////////

const Rotate = {
	body: document.getElementById('rotate'),
	sidebar: document.getElementById('rotate-sidebar'),
	size: 5
}

Rotate.body.addEventListener('click', rotate);

function rotate() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	if (prevTool == Crop) cropper.destroy();
	prevTool = Rotate;
	activeTool = Rotate;
	Rotate.active = true;

	const tempCanvas = document.createElement("canvas");
	const tempCtx = tempCanvas.getContext("2d");

	tempCanvas.width = canvas.width;
	tempCanvas.height = canvas.height;
	tempCtx.drawImage(canvas, 0, 0);

	canvas.width = tempCanvas.height;
	canvas.height = tempCanvas.width;

	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(90 * Math.PI / 180);
	ctx.drawImage(tempCanvas, -tempCanvas.width * 0.5, -tempCanvas.height * 0.5);
	ctx.restore();
}

/////////////////////////////////////////////////

const Mirror = {
	body: document.getElementById('mirror'),
	sidebar: document.getElementById('mirror-sidebar'),
	size: 1
}

Mirror.body.addEventListener('click', mirror);

function mirror() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	if (prevTool == Crop) cropper.destroy();
	prevTool = Mirror;
	activeTool = Mirror;
	Mirror.body.classList.add('active-option');
	Mirror.active = true;
	slide();
}

/////////////////////////////////////////////////

const Scale = {
	body: document.getElementById('scale'),
	sidebar: document.getElementById('scale-sidebar'),
	size: 1
}

Scale.body.addEventListener('click', scale);

function scale() {
	if (prevTool)
		prevTool.body.classList.remove('active-option')
	if (prevTool == Crop) cropper.destroy();
	prevTool = Scale;
	activeTool = Scale;
	Scale.body.classList.add('active-option');
	Scale.active = true;
	slide();
	cw = canvas.width;
  ch = canvas.height;
  tempCanvas.width = cw;
  tempCanvas.height = ch;
  tempCtx.drawImage(canvas, 0, 0);
  
	document.getElementById('width-size').innerHTML = canvas.width;
	document.getElementById('height-size').innerHTML = canvas.height;
	document.getElementById('scale-size').innerHTML = (Number(document.getElementById('scale-size-slider').value) / 50).toFixed(2);
}

const moveModeOption = document.getElementById('move-mode');
const cropModeOption = document.getElementById('crop-mode');
const zoomInOption = document.getElementById('zoom-in');
const zoomOutOption = document.getElementById('zoom-out');
const moveLeftOption = document.getElementById('move-left');
const moveRightOption = document.getElementById('move-right');
const moveUpOption = document.getElementById('move-up');
const moveDownOption = document.getElementById('move-down');
const cropOption = document.getElementById('crop');
const clearOption = document.getElementById('clear');
const resetOption = document.getElementById('reset');
const exitOption = document.getElementById('exit');

moveModeOption.addEventListener('click', () => cropper.setDragMode('move'));
cropModeOption.addEventListener('click', () => cropper.setDragMode('crop'));
zoomInOption.addEventListener('click', () => cropper.zoom(0.1));
zoomOutOption.addEventListener('click', () => cropper.zoom(-0.1));
moveLeftOption.addEventListener('click', () => cropper.move(10, 0));
moveRightOption.addEventListener('click', () => cropper.move(-10, 0));
moveUpOption.addEventListener('click', () => cropper.move(0, 10));
moveDownOption.addEventListener('click', () => cropper.move(0, -10));
cropOption.addEventListener('click', () => {
	const croppedData = cropper.getData();
	tempCanvas.width = croppedData.width;
	tempCanvas.height = croppedData.height;
	tempCtx.drawImage(canvas, croppedData.x, croppedData.y, croppedData.width, croppedData.height, 0, 0, tempCanvas.width, tempCanvas.height);
	canvas.width = tempCanvas.width;
	canvas.height = tempCanvas.height;
	cropper.destroy();
	ctx.drawImage(tempCanvas, 0, 0);
});
clearOption.addEventListener('click', () => cropper.clear());
resetOption.addEventListener('click', () => cropper.reset());
exitOption.addEventListener('click', () => cropper.destroy());

const widthSizeInput = document.getElementById('width-size-input');
const heightSizeInput = document.getElementById('height-size-input');
const applyScaleBtn = document.getElementById('scale-button');

applyScaleBtn.addEventListener('click', () => {
	const cw = canvas.width;
	const ch = canvas.height;
	tempCanvas.width = cw;
	tempCanvas.height = ch;
	tempCtx.drawImage(canvas, 0, 0);
	canvas.width = Number(widthSizeInput.value);
	canvas.height = Number(heightSizeInput.value);
	document.getElementById('width-size').innerHTML = canvas.width;
	document.getElementById('height-size').innerHTML = canvas.height;
	ctx.drawImage(tempCanvas, 0, 0, cw, ch, 0, 0, Number(widthSizeInput.value), Number(heightSizeInput.value));
});

function resizeTo(canvas, pct){
	canvas.width = tempCanvas.width;
	canvas.height = tempCanvas.height;
	canvas.width *= pct;
  canvas.height *= pct;
  ctx.drawImage(tempCanvas, 0, 0, cw, ch, 0, 0, cw * pct, ch * pct);
}

const scaleSizeSlider = document.getElementById('scale-size-slider');
const scaleSize = document.getElementById('scale-size');

scaleSize.innerHTML = scaleSizeSlider.value;
scaleSizeSlider.oninput = function() {
	const scaleValue = (Number(this.value) / 50).toFixed(2);
	scaleSize.innerHTML = scaleValue;
	resizeTo(canvas, scaleValue);
}