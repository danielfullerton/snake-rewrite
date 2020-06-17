"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let snake, candy, interval;
let score = 1;
let turnLock = false;
let start = new Date().getTime();
let dir = "R";
let gameOver = false;

function setSpeed(speed){
  interval = speed;
  init();
}

function makeCandy(){
  function getRandom20(min, max) {
    return getRandomInt(min / 20, max / 20) * 20; // Returns 10, 20, 30, 40 or 50
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  candy.x = getRandom20(0,580);
  candy.y = getRandom20(0,580);
}

function drawCandy(){
  ctx.fillStyle = "#F45B69";
  ctx.beginPath();
  ctx.arc(candy.x + 10, candy.y + 10, 10, 0, 2* Math.PI);
  ctx.fill();
}

function drawSnake() {
  document.getElementById("score").innerHTML = score;
  let current = new Date().getTime();
  let delta = current - start;
  if (delta >= interval) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawCandy();
    for(let i = snake.length - 1; i >= 0; i--){
      if(i !== 0){
        snake[i].dir = snake[i-1].dir;
      }
      else{
        snake[0].dir = dir;
      }
      ctx.fillStyle = "#000";
      ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
      ctx.fillStyle = "#028090";
      ctx.fillRect(snake[i].x + 1, snake[i].y + 1, 18,18);
      if(snake[i].dir === "R"){
        snake[i].x+=20;
      }
      if(snake[i].dir === "L"){
        snake[i].x-=20;
      }
      if(snake[i].dir === "U"){
        snake[i].y-=20;
      }
      if(snake[i].dir === "D"){
        snake[i].y+=20;
      }
    }
    if (snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].x < 0 || snake[0].y >= canvas.height) {
      gameOver = true;
      document.getElementById("gameover").style.display = "block";
    }
    if(snake[0].x === candy.x && snake[0].y === candy.y){
      let index = snake[snake.length-1].index+1;
      if(snake[snake.length-1].dir === "R"){
        let lastx = snake[snake.length-1].x - 20;
        let lasty = snake[snake.length-1].y;
        snake.push({
          x:lastx,
          y:lasty,
          "dir":"R"
        });
      }
      if(snake[snake.length-1].dir === "L"){
        let lastx = snake[snake.length-1].x + 20;
        let lasty = snake[snake.length-1].y;
        snake.push({
          x:lastx,
          y:lasty,
          "dir":"L"
        });
      }
      if(snake[snake.length-1].dir === "U"){
        let lastx = snake[snake.length-1].x;
        let lasty = snake[snake.length-1].y + 20;
        snake.push({
          x:lastx,
          y:lasty,
          "dir":"U"
        });
      }
      if(snake[snake.length-1].dir === "D"){
        let lastx = snake[snake.length-1].x;
        let lasty = snake[snake.length-1].y - 20;
        snake.push({
          x:lastx,
          y:lasty,
          "dir":"D"
        });
      }
      makeCandy();
      score++;
    }
    for(let i = snake.length - 1; i >= 0; i--){
      for(let j = snake.length - 1; j >= 0; j--){
        if((i!==j) && (snake[i].x === snake[j].x) && (snake[i].y === snake[j].y)){
          gameOver = true;
          document.getElementById("gameover").style.display = "block";
        }
      }
    }
    start = new Date().getTime();
    turnLock = false;
  }
  if (gameOver === false) {
    requestAnimationFrame(drawSnake);
  }
}

function init() {
  score = 1;
  document.getElementById("start").style.display = "none";
  document.getElementById("gameover").style.display = "none";
  snake = [{
    x: 0,
    y: 0,
    "dir":"R"
  }];
  candy = {};
  makeCandy();
  drawSnake();
}

document.body.addEventListener('keydown', function(e) {
  //DOWN
  if (e.keyCode == "40" && dir !== "U" && turnLock === false && dir !== "D") {
    dir = "D";
    turnLock = true;
  }
  //UP
  if (e.keyCode == "38" && dir !== "D" && turnLock === false && dir !== "U") {
    dir = "U";
    turnLock = true;
  }
  //RIGHT
  if (e.keyCode == "39" && dir !== "L" && turnLock === false && dir !== "R") {
    dir = "R";
    turnLock = true;
  }
  //LEFT
  if (e.keyCode == "37" && dir !== "R" && turnLock === false && dir !== "L") {
    dir = "L";
    turnLock = true;
  }
  //RESET
  if (e.keyCode == "32") {
    if(document.getElementById("start").style.display === "block"){
      console.log("open");
      setSpeed(interval);
    }
    else if (gameOver === true){
      dir = "R";
      gameOver = false;
      document.getElementById("start").style.display = "block";
    }
  }
});
