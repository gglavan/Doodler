const demoColorPicker = new iro.ColorPicker("#colorWheelDemo", {
  width: 200,
  height: 200,
  color: "#fff",
  markerRadius: 6,
  padding: 0,
  // sliderMargin: 8,
  sliderHeight: 14,
  borderWidth: 1,
  borderColor: "#fff",
  anticlockwise: true,
});

demoColorPicker.on("color:change", function(color, changes) {
  activeColor = color.hexString;
  console.log(activeColor)
});