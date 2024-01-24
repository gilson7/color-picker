  const colorBox = document.getElementById('color-box');
  const hueRange = document.getElementById('hue-range');
  const brightnessRange = document.getElementById('brightness-range');
  const saturationRange = document.getElementById('saturation-range');
  const opacityRange = document.getElementById('opacity-range');
  var typeSelected = "rgb"
  function updateColor() {
    const hue = hueRange.value;
    const saturation = saturationRange.value;
    const brightness = brightnessRange.value;
    const opacity = opacityRange.value / 100;

    const hslColor = `hsla(${hue}, ${saturation}%, ${brightness}%, ${opacity})`;
    const hexColor = hslToHex(hue, saturation, brightness);
    const rgbaColor = hslToRGBA(hue, saturation, brightness, opacity);
    const cmykColor = rgbToCmyk(rgbaColor.r,rgbaColor.g,rgbaColor.b)

    colorBox.style.backgroundColor = hslColor;
    brightnessRange.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${50}%, ${1})`
    saturationRange.style.backgroundColor = `hsla(${hue}, ${100}%, ${brightness}%, ${1})`
    saturationRange.style.background=`linear-gradient(90deg , hsla(${hue}, ${0}%, ${brightness}%, ${1}) 0%,hsla(${hue}, ${100}%, ${brightness}%, ${1}) 100%)`
    opacityRange.style.background = `linear-gradient(90deg,  rgba(0,0,0,0) 0%,hsla(${hue}, ${saturation}%, ${brightness}%, ${1})  100%)`
   
    document.getElementById("rgb").value = `rgb`+ (rgbaColor.a<1?"a":"")+`(${rgbaColor.r},${rgbaColor.g},${rgbaColor.b}`+(rgbaColor.a<1?`,${rgbaColor.a})`:")")
    document.getElementById("cmyk").value = cmykColor
    document.getElementById("hex").value = hexColor
    document.getElementById("hsl").value = "hsl"+(opacity<1?"a":"" )+`(${hue}, ${saturation}%, ${brightness}%`+ (opacity <1 ? `, ${opacity})`: ")" )
    getType()
  }
hueRange.addEventListener('input', updateColor);
brightnessRange.addEventListener('input', updateColor);
saturationRange.addEventListener('input', updateColor);
opacityRange.addEventListener('input', updateColor);

let myArray = document.getElementById("valores").children
for (let index = 0; index < myArray.length; index++) {
  const element = myArray[index];
  element.onclick = e =>{
    e.stopPropagation()
    for (let index = 0; index < myArray.length; index++) {
      const element = myArray[index];
      element.className = "input-txt"
    }

  console.log(e)
  element.className = "input-txt active"
  typeSelected = element.children[1].id
  getType()
  }
  
}
function getType(){
  const color = document.getElementById(`${typeSelected}`).value
  document.getElementById("copy").innerHTML = "copiar:"+color
}
document.getElementById("copy").onclick = e=>{
  document.getElementById(`${typeSelected}`).select()
  document.execCommand('copy');
  document.getElementById("copy").innerHTML = document.getElementById("copy").textContent.replace("copiar","copiado")
}
  // Initial update
updateColor();
function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hslToRGBA(h, s, l, a) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return  {r:Math.round(r * 255),g:Math.round(g * 255),b:Math.round(b * 255),a:a}
}

function rgbToCmyk(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  const cmyk = {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };

  return `cmyk(${cmyk.c>0?cmyk.c:0}%, ${cmyk.m>0?cmyk.m:0}%, ${cmyk.y>0?cmyk.y:0}%, ${cmyk.k}%)`;
}
