"use strict";
import PopUp from "./popup.js";
const CARROT_SIZE = 80;
const CARROT_COUNT = 30;
const BUG_COUNT = 30;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const alertSound = new Audio("sound/alert.wav");
const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const gameWinSound = new Audio("sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickLister(() => {
  startGame();
});

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener("click", (event) => onFieldClick(event));

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  hideGameBtn();
  stopGameTimer();
  gameFinishBanner.showPopUpWithText("Replay❓");
  stopSound(bgSound);
  playSound(alertSound);
}

function finishGame(win) {
  started = false;
  hideGameBtn();
  gameFinishBanner.showPopUpWithText(win ? "YOU WON😎" : "YOU LOST😥");
  stopGameTimer();
  playSound(win ? gameWinSound : alertSound);
  stopSound(bgSound);
}

function showStopBtn() {
  const icon = document.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameBtn() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(false);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  field.innerHTML = "";
  gameScore.innerHTML = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

function onFieldClick(event) {
  if (!started) {
    return;
  }

  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    playSound(carrotSound);
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    playSound(bugSound);
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imagePath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imagePath);
    field.appendChild(item);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
