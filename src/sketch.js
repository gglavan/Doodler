function setup() {
  const canvas = createCanvas(800, 600);
  background(255);
  canvas.parent('sketch-container');
  document.getElementById('paper').addEventListener('click', () => background(255));
  // blendMode(MULTIPLY);
}


// push();

//  	translate(200, 200);
//  	rotate(radians(30));  
//  	scale(0.5);

//   image(schnauzer, 0, 0);

// pop();

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

