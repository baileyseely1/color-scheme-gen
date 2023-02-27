const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

let dataArr = [];

const initColor = document.getElementById("init-color");
const mode = document.getElementById("mode");

document.getElementById("get-color").addEventListener("click", (e) => {
  e.preventDefault();

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${initColor.value.substring(
      1
    )}&count=5&mode=${mode.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      dataArr = data.colors;
    });
  renderColors();
});

const renderColors = () => {
  const dataHtml = dataArr
    .map((color) => {
      return `<div class="color" id="${color.name.value}">
      <img class="color-img" src="${color.image.named}"></img>
      <p>${color.hex.value}</p>
      </div>`;
    })
    .join();
  document.getElementById("color-container").innerHTML = dataHtml;
};
