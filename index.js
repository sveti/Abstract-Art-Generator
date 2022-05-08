let colors = [];
let borderRadius = [];

let rubberDucks = false;
let pleaseJs = false;

let customColorScheme = false;

const schemeTypes = [
  "monochromatic",
  "complementary",
  "split-complementary",
  "double-complementary",
  "analogous",
  "triadic",
];

let buttonAnimation = anime({
  targets: "#generateButton",
  scale: 1.1,
  easing: "linear",
  duration: 500,
  loop: true,
  direction: "alternate",
});
buttonAnimation.play;

function libraryChange(radioButton) {
  while (libraryDependingContent.firstChild) {
    libraryDependingContent.removeChild(libraryDependingContent.firstChild);
  }
  let contentHoler;
  if (radioButton.id == "pleaseJs") {
    pleaseJs = true;
    customColorScheme = false;
    contentHoler =
      '<p>Or</p><div class="formGroup"> <p>Base color:</p> <input class="formControlInput" type="text" name="colorsNumber" id="baseColor" value="" oninput="baseColorEntered()"/> </div>';
  } else {
    pleaseJs = false;
    contentHoler =
      ' <p>Luminosity:</p> <div class="treeCols"> <label class="formControl"> <input type="checkbox" name="luminosity" id="bright" value="bright" checked /> Bright </label> <label class="formControl"> <input type="checkbox" name="luminosity" id="light" value="light" /> Light </label> <label class="formControl"> <input type="checkbox" name="luminosity" id="dark" value="dark" /> Dark </label> </div>';

    let colorButtons = document.getElementsByClassName("colors");
    for (let index = 0; index < colorButtons.length; index++) {
      colorButtons[index].disabled = false;
    }
    colorsCount.disabled = false;
  }
  libraryDependingContent.innerHTML = contentHoler;
}

function baseColorEntered() {
  if (baseColor.value.length > 0) {
    let colorButtons = document.getElementsByClassName("colors");
    for (let index = 0; index < colorButtons.length; index++) {
      colorButtons[index].disabled = true;
    }
    colorsCount.disabled = true;
    customColorScheme = true;
  } else {
    let colorButtons = document.getElementsByClassName("colors");
    for (let index = 0; index < colorButtons.length; index++) {
      colorButtons[index].disabled = false;
    }
    colorsCount.disabled = false;
    customColorScheme = false;
  }
}

function rubberDuckClicked() {
  rubberDucks = !rubberDucks;
  if (rubberDucks) {
    playAudio();
    let shapeButtons = document.getElementsByClassName("shapes");

    for (let index = 0; index < shapeButtons.length; index++) {
      shapeButtons[index].disabled = true;
    }
  } else {
    let shapeButtons = document.getElementsByClassName("shapes");

    for (let index = 0; index < shapeButtons.length; index++) {
      shapeButtons[index].disabled = false;
    }
  }
}

function generateBlocks() {
  let shapes = shapesCount.value;

  const oldBlocks = document.getElementsByClassName("block");
  while (oldBlocks.length > 0) {
    field.removeChild(oldBlocks[0]);
  }

  for (let index = 0; index < Math.max(1, shapes); index++) {
    const block = document.createElement("div");
    block.classList.add("block");
    field.appendChild(block);
  }
}

function generateShapes() {
  borderRadius = [];
  if (document.getElementById("squares").checked) {
    borderRadius.push(["0%", "0%"]);
  }
  if (document.getElementById("squircle").checked) {
    borderRadius.push(["0%", "25%"]);
  }
  if (document.getElementById("circles").checked) {
    borderRadius.push(["0%", "50%"]);
  }
  if (borderRadius.length == 0) {
    borderRadius.push(["0%", "0%"]);
  }
}

function moveBlocks() {
  let width = field.clientWidth;
  let height = field.clientHeight;
  let blockWidth = document.getElementsByClassName("block")[0].clientWidth;
  let blockHeight = document.getElementsByClassName("block")[0].clientHeight;

  anime({
    targets: ".block",
    translateX: function () {
      return anime.random(0, width - blockWidth);
    },
    translateY: function () {
      return anime.random(0, height - blockHeight);
    },
    scale: function () {
      return anime.random(1, 8);
    },
    backgroundColor: function () {
      if (colors.length > 0 && !rubberDucks) {
        return colors[Math.floor(Math.random() * colors.length)];
      } else {
        return "transparent";
      }
    },
    borderRadius: function () {
      return borderRadius[Math.floor(Math.random() * borderRadius.length)];
    },
    boxShadow: function () {
      if (colors.length > 0 && !rubberDucks) {
        return "10px 5px 5px rgba(0, 0, 0, 0.25)";
      } else {
        return null;
      }
    },
  });
}

function rubberDuck() {
  let allBlocks = document.getElementsByClassName("block");

  for (let index = 0; index < allBlocks.length; index++) {
    const duckSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const duck = document.createElementNS("http://www.w3.org/2000/svg", "path");
    duckSvg.setAttribute("viewBox", "0 0 850 850");
    duckSvg.setAttribute("width", "100%");
    duckSvg.setAttribute("height", "100%");
    duck.setAttribute(
      "fill",
      colors[Math.floor(Math.random() * colors.length)]
    );
    duck.setAttribute("fill-opacity", "1");
    duck.setAttribute("fill-rule", "nonzero");
    duck.setAttribute("stroke", "none");
    duck.setAttribute(
      "d",
      "M 219.84375 1 C 213.054688 3.132812 206.859375 9.535156 204.863281 16.53125 C 203.527344 21.066406 203.929688 27 205.863281 31.601562 C 207.523438 35.40625 213.652344 42 220.378906 47.140625 L 225.242188 50.871094 L 220.441406 53.46875 C 213.183594 57.402344 199.804688 66.40625 191.945312 72.671875 C 183.621094 79.273438 164.710938 98.078125 158.382812 106.007812 C 141.003906 127.8125 126.953125 155.878906 120.292969 181.949219 C 116.765625 195.8125 114.105469 215.148438 114.035156 228.085938 C 114.035156 229.617188 113.636719 229.953125 111.238281 230.550781 C 107.042969 231.621094 102.449219 234.820312 96.054688 241.085938 C 92.527344 244.484375 89.199219 247.085938 87.265625 247.953125 C 80.144531 251.019531 66.160156 252.617188 47.113281 252.6875 C 41.253906 252.6875 34.398438 252.890625 31.863281 253.15625 L 27.273438 253.554688 L 26.007812 256.550781 C 23.945312 261.152344 24.542969 267.753906 27.539062 273.421875 C 30.269531 278.554688 39.324219 288.023438 45.121094 291.691406 C 60.902344 301.757812 75.949219 304.492188 88.199219 299.492188 C 94.460938 296.957031 98.054688 296.15625 98.054688 297.421875 C 98.054688 297.890625 90.59375 305.757812 81.539062 314.960938 C 68.089844 328.558594 64.761719 332.296875 63.761719 334.828125 C 62.296875 338.828125 63.09375 341.292969 66.960938 344.09375 C 79.277344 353.027344 106.914062 350.960938 131.015625 339.292969 C 134.679688 337.558594 139.609375 334.828125 141.9375 333.160156 L 146.265625 330.296875 L 149.992188 335.292969 C 152.054688 338.09375 156.1875 343.09375 159.117188 346.425781 L 164.507812 352.429688 L 161.710938 359.425781 C 149.058594 390.832031 127.15625 417.898438 99.855469 435.769531 C 79.679688 448.96875 71.21875 455.707031 57.171875 469.773438 C 41.390625 485.570312 31.667969 499.039062 21.679688 518.976562 C 12.222656 537.910156 6.363281 556.777344 2.769531 580.046875 C 0.570312 594.046875 0.570312 620.652344 2.769531 634.71875 C 9.492188 678.519531 27.671875 714.660156 58.636719 745.792969 C 84.9375 772.328125 118.496094 791.398438 156.050781 801.265625 C 166.242188 803.996094 193.007812 809.199219 207.59375 811.332031 C 221.640625 813.464844 226.773438 814.132812 236.558594 815.332031 C 260.726562 818.265625 278.707031 819.867188 306.808594 821.53125 C 325.320312 822.667969 394.039062 822.667969 412.683594 821.53125 C 497.183594 816.398438 562.90625 804.800781 624.769531 784.0625 C 711.53125 754.992188 774.589844 711.257812 813.011719 653.382812 C 830.523438 627.050781 843.578125 593.515625 849.097656 560.710938 C 851.898438 544.109375 852.699219 533.710938 852.761719 513.042969 C 852.898438 454.4375 843.773438 424.035156 800.027344 337.359375 C 775.320312 288.425781 773.257812 284.621094 768.796875 280.15625 C 760.402344 271.621094 745.355469 267.890625 733.167969 271.222656 C 719.386719 275.089844 709.535156 285.621094 694.617188 312.359375 C 685.296875 329.160156 681.632812 334.828125 675.308594 342.425781 C 665.917969 353.695312 659.191406 358.363281 637.753906 368.5625 C 597.597656 387.632812 589.675781 390.496094 563.171875 395.363281 C 556.980469 396.5 537.003906 400.699219 518.890625 404.699219 C 469.015625 415.699219 464.421875 416.503906 454.902344 415.835938 C 438.585938 414.632812 427.265625 406.496094 424.335938 393.898438 C 421.675781 382.164062 428.332031 366.832031 440.25 357.226562 C 447.175781 351.625 462.828125 335.691406 469.21875 327.695312 C 494.253906 296.359375 509.234375 260.023438 512.964844 221.484375 C 513.964844 211.417969 513.367188 188.679688 511.902344 178.683594 C 510.433594 169.011719 506.441406 152.878906 503.242188 144.277344 C 499.914062 135.277344 491.925781 118.875 486.996094 111.078125 C 469.417969 83.007812 444.3125 60.539062 414.015625 45.667969 C 385.113281 31.472656 361.808594 26.203125 326.117188 25.667969 C 298.417969 25.269531 287.765625 24.800781 280.171875 23.671875 C 265.921875 21.671875 254.136719 16.734375 245.550781 9.269531 C 243.019531 7.066406 239.6875 4.464844 238.222656 3.53125 C 233.097656 0.199219 225.839844 -0.800781 219.84375 1 Z M 219.84375 1 "
    );
    duckSvg.appendChild(duck);
    allBlocks[index].appendChild(duckSvg);
  }
}

function playAudio() {
  audio.play();
}

function getCheckedCheckBoxes(checkedName) {
  var checkboxes = document.querySelectorAll(
      'input[name="' + checkedName + '"]:checked'
    ),
    values = [];
  Array.prototype.forEach.call(checkboxes, function (el) {
    values.push(el.value);
  });
  return values;
}

function randomColorPalette() {
  let colorsAsText = getCheckedCheckBoxes("colors");
  let luminosity = getCheckedCheckBoxes("luminosity");
  let numberOfColors = Math.max(1, colorsCount.value);

  if (colorsAsText.length == 0) return;

  if (numberOfColors > colorsAsText.length) {
    for (let index = 0; index < colorsAsText.length; index++) {
      const element = randomColor({
        hue: colorsAsText[index],
        luminosity: luminosity[Math.floor(Math.random() * luminosity.length)],
      });

      colors.push(element);
    }
    numberOfColors -= colorsAsText.length;
  }

  for (let index = 0; index < numberOfColors; index++) {
    const element = randomColor({
      hue: colorsAsText[Math.floor(Math.random() * colorsAsText.length)],
      luminosity: luminosity[Math.floor(Math.random() * luminosity.length)],
    });
    colors.push(element);
  }
}

function pleaseJsPalette() {
  let colorsAsText = getCheckedCheckBoxes("colors");
  let numberOfColors = Math.max(1, colorsCount.value);

  if (customColorScheme) {
    let color = document.getElementById("baseColor").value;
    let hsvColor = Please.HEX_to_HSV(color);
    colors = [];
    colors = Please.make_scheme(
      {
        h: hsvColor.h,
        s: hsvColor.s,
        v: hsvColor.v,
      },
      {
        scheme_type:
          schemeTypes[Math.floor(Math.random() * schemeTypes.length)],
        format: "hex",
      }
    );
    return;
  }

  if (colorsAsText.length == 0) return;
  const index = colorsAsText.indexOf("monochrome");

  if (index !== -1) {
    colorsAsText[index] = "grey";
  }
  colors = [];
  if (numberOfColors > colorsAsText.length) {
    for (let index = 0; index < colorsAsText.length; index++) {
      const element = Please.make_color({
        golden: false,
        base_color: colorsAsText[index],
      });

      colors.push(element);
    }
    numberOfColors -= colorsAsText.length;
  }
  for (let index = 0; index < numberOfColors; index++) {
    const element = Please.make_color({
      golden: false,
      base_color: colorsAsText[Math.floor(Math.random() * colorsAsText.length)],
    });
    colors.push(element);
  }
}

generateButton.onclick = function () {
  colors = [];
  buttonAnimation.pause();
  if (pleaseJs) {
    pleaseJsPalette();
  } else {
    randomColorPalette();
  }
  generateShapes();
  generateBlocks();
  if (rubberDucks && colors.length) {
    rubberDuck();
  }
  moveBlocks();
};
