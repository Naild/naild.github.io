/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("click", draw);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function drawPattern() {
  let s = Math.round(Math.random() * 3) + 2;
  let size = Math.min(w, h) / (s * 2 + 1);
  let xOffset = (w - size * (s * 2 + 1)) / 2;
  let yOffset = (h - size * (s * 2 + 1)) / 2;
  for(let col = 0; col < s; col++) {
    for(let row = 0; row < s; row++) {
      let x = col * size * 2 + size + xOffset;
      let y = row * size * 2 + size + yOffset;
      drawFigure(x + size / 2, y+ size / 2, col, row, size);
    }
  }
}

function drawFigure(x, y, col, row, size) {
  ctx.save();
  let innerRadiusFactor = Math.random() * 0.7 + 0.1;
  let r1 = size * innerRadiusFactor;
  let r2 = size * 0.9;
  let offsetR = Math.random() * (r2 - r1);
  let offsetAngle = Math.random() * Math.PI * 2;
  let xOffset = Math.cos(offsetAngle) * offsetR;
  let yOffset = Math.sin(offsetAngle) * offsetR;
  let sign = Math.random() > 0.5 ? -1 : 1;
  let angleOffset = Math.PI * 0.6 * Math.random() * sign;
  ctx.translate(x, y);
  if(Math.random() > 0.99) {
    // Haha!
    ctx.beginPath();
    ctx.arc(0, 0, r2, 0, Math.PI * 2);
    ctx.fillStyle = "gray";
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(xOffset, yOffset, r1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, r2, 0, Math.PI * 2);
    ctx.stroke();

    let nrOfLines = Math.round(Math.random() * 50) + 4;
    for(let i = 0; i < nrOfLines; i++) {
      let angle1 = Math.PI * 2 * i / nrOfLines;
      let angle2 = angle1 + angleOffset;
      let x1 = Math.cos(angle1) * r1 + xOffset;
      let y1 = Math.sin(angle1) * r1 + yOffset;
      let x2 = Math.cos(angle2) * r2;
      let y2 = Math.sin(angle2) * r2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  drawPattern();
}

setup();
draw();