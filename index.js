const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const initColor = document.getElementById("init-color");
const mode = document.getElementById("mode");

document.getElementById("get-color").addEventListener("click", (e) => {
  e.preventDefault();
  renderColors();
});

const renderColors = () => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${initColor.value.substring(
      1
    )}&count=5&mode=${mode.value}`
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
  // .then(data => data.map(color => {
  //     document.getElementById('color-container')
  // }))
};
