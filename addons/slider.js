const pencilSizeSlider = document.getElementById('pencil-size-slider');
const pencilSize = document.getElementById('pencil-size');

const lineSizeSlider = document.getElementById('line-size-slider');
const lineSize = document.getElementById('line-size');

const rubberSizeSlider = document.getElementById('rubber-size-slider');
const rubberSize = document.getElementById('rubber-size');

pencilSize.innerHTML = pencilSizeSlider.value;
pencilSizeSlider.oninput = function() {
  pencilSize.innerHTML = this.value;
  activeTool.size = this.value;
}

lineSize.innerHTML = lineSizeSlider.value;
lineSizeSlider.oninput = function() {
  lineSize.innerHTML = this.value;
  activeTool.size = this.value;
}

rubberSize.innerHTML = rubberSizeSlider.value;
rubberSizeSlider.oninput = function() {
  rubberSize.innerHTML = this.value;
  activeTool.size = this.value;
}