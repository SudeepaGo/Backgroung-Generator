const css = document.querySelector("h3");
const leftColor = document.getElementById("leftGradient");
const rightColor = document.getElementById("rightGradient");
const body = document.body;
const canvas = document.querySelector("canvas");

const setBackground = () => {
  body.style.background = `linear-gradient(to right, ${leftColor.value}, ${
    rightColor.value
  })`;
  setText();
};

const setText = () => {
  if (body.style.background) css.textContent = body.style.background;
  else
    css.textContent = `linear-gradient(to right, rgb(45, 209, 192), rgb(181, 38, 217))`;
};

setText();

leftColor.addEventListener("input", setBackground);

rightColor.addEventListener("input", setBackground);

downloadImage = () => {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const bkgGradient = ctx.createLinearGradient(0, 0, w, h);
  bkgGradient.addColorStop(0, leftColor.value);
  bkgGradient.addColorStop(1, rightColor.value);
  ctx.fillStyle = bkgGradient;
  ctx.fillRect(0, 0, w, h);
  let url = canvas.toDataURL();
  // url = url.replace(/^data:image\/[^;]+/, "data:application/octet-stream");
  // window.open(url);
  // location.href = url;
  // Does not work in IE/Safari/Opera
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "background.png");
  link.click();
};
