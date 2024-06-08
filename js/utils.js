let playerWon,
  isGameOver = false,
  hasPlayerAttacked = false,
  hasEnemyAttacked = false,
  typeOfAttack;

function determineResult() {
  if (player.health === enemy.health) {
    playerWon = "none";
    msg.textContent = "It's a TIE!!";
  } else if (player.health > enemy.health) {
    playerWon = "P1";
    msg.textContent = "Player1 WINS!!";
  } else {
    playerWon = "P2";
    msg.textContent = "Player2 WINS!!";
  }

  if (duration <= 0 || enemy.health <= 0 || player.health <= 0) {
    clearTimeout(time);
    BGM.pause();
    setTimeout(() => {
      if (!isGameOver) {
        if (enemy.health <= 0 || player.health <= 0) playSound("ko");
        else playSound("timeUp");
      }
      isGameOver = true;
      player.dead = true;
      enemy.dead = true;
      result.style.display = "flex";
    }, 1000);
    playBtn.textContent = "Restart";
  }
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y + rectangle2.offset.y &&
    rectangle1.attackBox.position.y <=
      rectangle2.position.y + rectangle2.height + rectangle2.offset.y
  );
}

let time;
let duration = 120;
function decreaseTimer() {
  if (duration > 0) {
    time = setTimeout(decreaseTimer, 1000);
    duration--;
    timer.textContent = formatTimer(duration);
  }
  determineResult();
}

function formatTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

const attackArray = ["Attack1", "Attack2", "Attack1", "Attack1"];

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function detectSwordClash() {
  //    detecting sword clashes
  if (
    player.attackBox.position.x + player.attackBox.width >=
      enemy.attackBox.position.x &&
    player.attackBox.position.x <=
      enemy.attackBox.position.x + enemy.attackBox.width &&
    player.isAttcking &&
    enemy.isAttcking &&
    player.currentFrame === 4 &&
    enemy.currentFrame === 2
  ) {
    console.log("sword clashed");
  }
}

const sounds = {
  fight: new Audio("./Sound/fight-deep-voice.mp3"),
  ko: new Audio("./Sound/GameOver.mp3"),
  timeUp: new Audio("./Sound/timeUp.mp3"),
  mackAttack1: new Audio("./Sound/Samurai-Mack-Attack1.mp3"),
  mackAttack2: new Audio("./Sound/Mack-Attack2.mp3"),
  KenjiAttack1: new Audio("./Sound/Kenji-Attack-1.mp3"),
  KenjiAttack2: new Audio("./Sound/kenji-Attack2.mp3"),
  KenjiHits: new Audio("./Sound/kenji-hurt1.mp3"),
  mackHits: new Audio("./Sound/mackHurt.mp3"),
  mackJump: new Audio("./Sound/mackJump.mp3"),
  KenjiJump: new Audio("./Sound/kenjiJump.mp3"),
};

function playSound(sound, vol = 1) {
  if (sounds[sound]) {
    const soundClone = sounds[sound].cloneNode();
    soundClone.volume = vol;
    soundClone.play();
  }
}

const kenjiRun = new Audio("./Sound/kenji-run.mp3");
kenjiRun.loop = true; // Make the sound loop
const BGM = new Audio("./Sound/BGM.mp3");
BGM.loop = true; // Make the sound loop
BGM.volume = 0.3;
const mackRun = new Audio("./Sound/mack-run.mp3");
mackRun.loop = true; // Make the sound loop

let isKenjiRunning = false;
let isMackRunning = false;

function playKenjiFoot() {
  if (!isKenjiRunning) {
    kenjiRun.play();
    isKenjiRunning = true;
  }
}
function stopKenjiFoot() {
  if (isKenjiRunning) {
    kenjiRun.pause();
    kenjiRun.currentTime = 0; // Reset the sound to the beginning
    isKenjiRunning = false;
  }
}

function playMackFoot() {
  if (!isMackRunning) {
    mackRun.play();
    isMackRunning = true;
  }
}
function stopMackFoot() {
  if (isMackRunning) {
    mackRun.pause();
    mackRun.currentTime = 0; // Reset the sound to the beginning
    isMackRunning = false;
  }
}
