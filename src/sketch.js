let mousePressed = false;
let lastX, lastY;

const canvas = document.getElementById('can');
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

canvas.addEventListener('mousedown', function (e) {
  mousePressed = true;
  Draw(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, false);
});

canvas.addEventListener('mousemove', function (e) {
  if (mousePressed) {
    Draw(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true);
  }
});

canvas.addEventListener('mouseup', function (e) {
  mousePressed = false;
});

canvas.addEventListener('mouseout', function (e) {
  mousePressed = false;
});

function Draw(x, y, isDown) {
  if (isDown) {
    ctx.beginPath();
    ctx.strokeStyle = activeColor;
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