const demoColorPicker = new iro.ColorPicker("#colorWheelDemo", {
  width: 200,
  height: 200,
  color: "rgb(255, 0, 0)",
  markerRadius: 6,
  padding: 0,
  // sliderMargin: 8,
  sliderHeight: 14,
  borderWidth: 1,
  borderColor: "#fff",
  anticlockwise: true,
});

const colorHex = document.getElementById('color-value');
const colorForm = document.querySelector('#color-form');

colorForm.addEventListener('submit', function(e) {
  e.preventDefault();
  demoColorPicker.color.hexString = colorHex.value;
}, false);

demoColorPicker.on("color:change", function(color, changes) {
  activeColor = color.hexString;
  colorHex.value = color.hexString;
});

