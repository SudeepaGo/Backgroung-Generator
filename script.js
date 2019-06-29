const css = document.querySelector("h3");
const leftColor = document.getElementById("leftGradient");
const rightColor = document.getElementById("rightGradient");
const body = document.body;

const setBackground = () => {
  body.style.background = `linear-gradient(to right, ${leftColor.value}, ${
    rightColor.value
  })`;
  setText();
};

const setText = () => {
  css.textContent = body.style.background;
};

setText();

leftColor.addEventListener("input", setBackground);

rightColor.addEventListener("input", setBackground);

var a = 1;

function change() {
  a = 2;
  console.log(a);
}
change();
console.log(a);
