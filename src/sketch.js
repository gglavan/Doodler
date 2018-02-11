const canvas = document.getElementById('can');
const ctx = canvas.getContext("2d");
const tempCanvas = document.createElement("canvas");
const tempCtx = tempCanvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

ctx.fillStyle="#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let mousePressed = false;
let lastX, lastY;
let stPoint;
let endPoint;
let pickedColor = activeColor;

canvas.addEventListener('mousedown', function (e) {
  mousePressed = true;
  switch (activeTool) {
    case Pencil:
    case Rubber:
      Draw(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, false);
      break;
    case Line:
      mouseDown(e);
      break;
    case Picker:
      activeTool = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      Picker.body.classList.remove('active-option');
      activeColor = pickedColor;
      demoColorPicker.color.hexString = activeColor;
      break;
  }
});

canvas.addEventListener('mousemove', function (e) {
  switch (activeTool) {
    case Pencil:
    case Rubber:
      if (mousePressed) Draw(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true);
      break;
    case Line:
      mouseMove(e);
      break;
    case Picker:
      pickColor(e);
      break;
  }
});

canvas.addEventListener('mouseup', function (e) {
  mousePressed = false;
  cPush();
  if (activeTool == Line)
    mouseUp(e);
});

canvas.addEventListener('mouseout', function (e) {
  mousePressed = false;
  cPush();
  if(activeTool == Picker) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
  }
});

function Draw(x, y, isDown) {
  if (isDown) {
    ctx.beginPath();
    if (activeTool != Rubber)
      ctx.strokeStyle = activeColor;
    else ctx.strokeStyle = activeTool.color;
    ctx.lineWidth = activeTool.size;
    ctx.lineJoin = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }
  lastX = x;
  lastY = y;
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function lineP(stPoint, endPoint) {
  this.stPoint = stPoint;
  this.endPoint = endPoint;
}

function mouseDown(e) {
  mousePressed = true;
  stPoint = new Point(e.layerX, e.layerY);
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx.drawImage(canvas, 0, 0);
}

function mouseMove(e) {
  if (!mousePressed) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
  ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height); //redraw image
  ctx.beginPath();
  ctx.strokeStyle = activeColor;
  ctx.lineWidth = activeTool.size;
  ctx.moveTo(stPoint.x, stPoint.y);
  ctx.lineTo(e.layerX, e.layerY);
  ctx.stroke();
  ctx.closePath();
}

function mouseUp(e) {
  mousePressed = false;
  endPoint = new Point(e.layerX, e.layerY); //get end point
}

function cPush() {
  cStep++;
  if (cStep < cPushArray.length) { cPushArray.length = cStep; }
  cPushArray.push(document.getElementById('can').toDataURL());
}

function cUndo() {
  if (cStep > 0) {
    cStep--;
    var canvasPic = new Image();
    canvasPic.src = cPushArray[cStep];
    canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
  }
}

function cRedo() {
  if (cStep < cPushArray.length-1) {
    cStep++;
    var canvasPic = new Image();
    canvasPic.src = cPushArray[cStep];
    canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
  }
}

// Picker

function pickColor(e) {
  const pos = findPos(canvas);
  const x = e.pageX - pos.x;
  const y = e.pageY - pos.y;
  const c = canvas.getContext('2d');
  const p = c.getImageData(x, y, 1, 1).data; 
  pickedColor = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(x + 15, y + 20, 20, 20);
  ctx.fillStyle = pickedColor;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

function findPos(obj) {
  let curleft = 0, curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return { x: curleft, y: curtop };
  }
  return undefined;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}