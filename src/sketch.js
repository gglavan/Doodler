

function setup() {
  const canvas = createCanvas(640, 480);
  background(255);
  canvas.parent('sketch-container');
  document.getElementById('paper').addEventListener('click', () => background(255));
}

// function draw() {
  
// }

function mouseDragged() {
  if(activeTool == Crop) {

  }
  
  if (activeTool) {
    strokeWeight(activeTool.size);
    if(activeTool != Rubber) {
      stroke(activeColor);
    } else {
      stroke(activeTool.color);
    }
    
    line(mouseX, mouseY, pmouseX, pmouseY);
    return false;
  } else {
    return;
  }
}

