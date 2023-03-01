import { generateRandomColors } from "/utils.js";

let dataArr = [];
let randomColor = false;
let textnode = document.createElement("p");
const node = document.createElement("div");
const mode = document.getElementById("mode");
const initColor = document.getElementById("init-color");
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

document.getElementById("get-color").addEventListener("click", (e) => {
  e.preventDefault();
  renderColors();
  randomColor = false;
});

document.getElementById("get-random").addEventListener("click", () => {
  randomColor = true;
  renderColors();
});

function handleRandomCopyToClip() {
  dataArr.forEach((element) => {
    const elNameValue = document.getElementById(element.name.value);
    elNameValue.addEventListener("click", () => {
      if (!document.getElementById("copy-div")) {
        initColor.setAttribute("value", "#" + newColor);
        navigator.clipboard.writeText("#" + newColor);
        const node = document.createElement("div");
        node.setAttribute("id", "copy-div");
        const textnode = document.createElement("p");
        textnode.textContent = `🪄 copied #${newColor} to clipboard `;
        node.appendChild(textnode);
        elNameValue.appendChild(node);
        setTimeout(() => {
          elNameValue.removeChild(node);
        }, 2000);
      }
    });
    const newColor = generateRandomColors(1);
    document.getElementById(element.name.value).style.backgroundColor =
      "#" + newColor;
    document.getElementById(element.hex.value).textContent = "#" + newColor;
  });
}

function handleCopyToClip() {
  dataArr.forEach((element) => {
    const elNameValue = document.getElementById(element.name.value);
    elNameValue.addEventListener("click", () => {
      if (!document.getElementById("copy-div")) {
        initColor.setAttribute("value", element.hex.value);
        node.setAttribute("id", "copy-div");
        textnode.textContent = `🪄 copied ${element.hex.value} to clipboard `;
        node.appendChild(textnode);
        elNameValue.appendChild(node);
        navigator.clipboard.writeText(element.hex.value);
        setTimeout(() => {
          elNameValue.removeChild(node);
        }, 2000);
      }
    });
    elNameValue.style.backgroundColor = element.hex.value;
    document.getElementById(element.hex.value).textContent = element.hex.value;
  });
}

async function renderColors() {
  const res = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${initColor.value.substring(
      1
    )}&count=5&mode=${mode.value}`
  );
  const data = await res.json();
  dataArr = data.colors;
  document.getElementById("color-container").innerHTML = dataArr
    .map((color) => {
      return `<div class='color ${color.name.value}' id="${color.name.value}">
                      <p id="${color.hex.value}">${color.hex.value}</p>
                    </div>`;
    })
    .join("");
  if (randomColor) {
    handleRandomCopyToClip();
  } else {
    handleCopyToClip();
  }
}

renderColors();
