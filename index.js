import { generateRandomColors } from "/utils.js";

let dataArr = [];
let randomColor = false;
const initColor = document.getElementById("init-color");
const node = document.createElement("div");
let textnode = document.createElement("p");
const mode = document.getElementById("mode");
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

function handleCopyToClip() {
  dataArr.forEach((element) => {
    const elNameValue = document.getElementById(element.name.value);
    elNameValue.addEventListener("click", () => {
      if (!document.getElementById("copy-div")) {
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

const renderColors = () => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${initColor.value.substring(
      1
    )}&count=5&mode=${mode.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      dataArr = data.colors;
      document.getElementById("color-container").innerHTML = dataArr
        .map((color) => {
          return `<div class='color ${color.name.value}' id="${color.name.value}">
                      <p id="${color.hex.value}">${color.hex.value}</p>
                    </div>`;
        })
        .join("");

      if (randomColor) {
        dataArr.forEach((color) => {
          const elNameVal = document.getElementById(color.name.value);
          elNameVal.addEventListener("click", () => {
            if (!document.getElementById("copy-div")) {
              navigator.clipboard.writeText("#" + newColor);
              const node = document.createElement("div");
              node.setAttribute("id", "copy-div");
              const textnode = document.createElement("p");
              textnode.textContent = `🪄 copied ${newColor} to clipboard `;
              node.appendChild(textnode);
              elNameVal.appendChild(node);
              setTimeout(() => {
                elNameVal.removeChild(node);
              }, 2000);
            }
          });
          const newColor = generateRandomColors(1);
          document.getElementById(color.name.value).style.backgroundColor =
            "#" + newColor;
          document.getElementById(color.hex.value).textContent = "#" + newColor;
        });
      } else {
        handleCopyToClip();
      }
    });
};

renderColors();
