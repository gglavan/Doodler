Filters = {};

Filters.getPixels = function () {
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

Filters.filterImage = function (filter, var_args) {
  const args = [this.getPixels()];
  for (let i = 2; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return filter.apply(null, args);
};

Filters.grayscale = function (pixels, args) {
  var d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    d[i] = d[i + 1] = d[i + 2] = v;
  }
  ctx.putImageData(pixels, 0, 0);
};

Filters.brightness = function (pixels, adjustment) {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] += adjustment;
    d[i + 1] += adjustment;
    d[i + 2] += adjustment;
  }
  ctx.putImageData(pixels, 0, 0);;
};

Filters.contrast = function (pixels, adjustment) {
  const d = pixels.data;
  const factor = (259 * (adjustment + 255)) / (255 * (259 - adjustment));
  for (let i = 0; i < d.length; i += 4) {
    d[i] = factor * (d[i] - 128) + 128;
    d[i + 1] = factor * (d[i + 1] - 128) + 128;
    d[i + 2] = factor * (d[i + 2] - 128) + 128;
  }
  ctx.putImageData(pixels, 0, 0);
};

Filters.saturation = function (pixels, adjustment) {
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.globalCompositeOperation = "saturation";
  ctx.fillStyle = `hsl(0,100%,${adjustment}%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";
};

Filters.invert = function (pixels) {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 255 - d[i];
    d[i + 1] = 255 - d[i + 1];
    d[i + 2] = 255 - d[i + 2];
  }
  ctx.putImageData(pixels, 0, 0);
};


Filters.threshold = function (pixels) {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 127) ? 255 : 0;
    d[i] = d[i + 1] = d[i + 2] = v
  }
  ctx.putImageData(pixels, 0, 0);
};


const contrastValueSlider = document.getElementById('contrast-value-slider');
const contrastValue = document.getElementById('contrast-value');
const brightnessValueSlider = document.getElementById('brightness-value-slider');
const brightnessValue = document.getElementById('brightness-value');
const saturationValueSlider = document.getElementById('saturation-value-slider');
const saturationValue = document.getElementById('saturation-value');
const grayscale = document.getElementById('grayscale');
const invert = document.getElementById('invert');
const threshold = document.getElementById('threshold');


let activeFilter = null;

contrastValue.innerHTML = contrastValueSlider.value;
contrastValueSlider.oninput = function () {
  if (activeFilter != 'Contrast') {
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);
    activeFilter = 'Contrast';
  }
  contrastValue.innerHTML = this.value;
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
  Filters.filterImage(Filters.contrast, 0, Number(this.value));
}

brightnessValue.innerHTML = brightnessValueSlider.value;
brightnessValueSlider.oninput = function () {
  if (activeFilter != 'Brightness') {
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);
    activeFilter = 'Brightness';
  }
  brightnessValue.innerHTML = this.value;
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
  Filters.filterImage(Filters.brightness, 0, Number(this.value));
}

saturationValue.innerHTML = saturationValueSlider.value;
saturationValueSlider.oninput = function () {
  if (activeFilter != 'Saturation') {
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);
    activeFilter = 'Saturation';
  }
  saturationValue.innerHTML = this.value;
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
  Filters.filterImage(Filters.saturation, 0, Number(this.value));
}

grayscale.onchange = function () {
  if (grayscale.checked) {
    Filters.filterImage(Filters.grayscale, 0);
  } else {
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
  }
}

invert.onchange = function () {
  if (invert.checked) {
    Filters.filterImage(Filters.invert, 0);
  } else {
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
  }
}

threshold.onchange = function () {
  if (threshold.checked) {
    Filters.filterImage(Filters.threshold, 0);
  } else {
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
  }
}

function resetFilters() {
	contrastValueSlider.value = 0;
	contrastValue.innerHTML = 0;
	brightnessValueSlider.value = 0;
	brightnessValue.innerHTML = 0;
	saturationValueSlider.value = 0;
	saturationValue.innerHTML = 0;
  grayscale.checked = false;
  invert.checked = false;
  threshold.checked = false;
}