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

const downloadImage = () => {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const bkgGradient = ctx.createLinearGradient(0, 0, w, h);
  bkgGradient.addColorStop(0, leftColor.value);
  bkgGradient.addColorStop(1, rightColor.value);
  ctx.fillStyle = bkgGradient;
  ctx.fillRect(0, 0, w, h);
  let url = canvas.toDataURL();
  fromHref(url);
};

// Get image from url by converting image/png type to application/octet-stream
const fromUrl = url => {
  url = url.replace(/^data:image\/[^;]+/, "data:application/octet-stream");
  // Download
  window.open(url);
  // location.href = url;
};

// Get image by creating an anchor tag and setting its href to image url and also setting download attribute
// Does not work in IE/Safari/Opera
const fromHref = url => {
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "background.png");
  link.click();
};

// Get image from Blob
const fromBlob = url => {
  // atob is used to base64 decode the data URI
  const imageData = atob(url.split(",")[1]);
  // Use typed arrays to convert the binary data to a Blob
  const arrayBuffer = new ArrayBuffer(imageData.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < imageData.length; i++) {
    view[i] = imageData.charCodeAt(i) & 0xff;
  }

  let blob;
  try {
    // Recommended method
    blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
  } catch (e) {
    // In old browsers, Blob constructor is not defined so we have to use BlobBuilder API which has now been deprecated
    const builder = new (window.WebkitBlobBuilder || window.MozBlobBuilder)();
    builder.append(arrayBuffer);
    blob = builder.getBlob("application/octet-stream");
  }
  // Use the URL object to create a temporary url
  const imageURL = (window.webkitURL || window.URL).createObjectURL(blob);
  // Download
  location.href = imageURL;
};
