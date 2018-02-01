
function setup() {
  const canvas = createCanvas(640, 480);
  background(255);
  canvas.parent('sketch-container');
}

// function draw() {
  
// }

function touchMoved() {
  if (activeTool) {
    strokeWeight(activeTool.size);
    stroke(activeTool.color);
    line(mouseX, mouseY, pmouseX, pmouseY);
    return false;
  } else {
    return;
  }
}