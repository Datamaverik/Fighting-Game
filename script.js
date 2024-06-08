const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5,
  jumpThreshold = 300,
  speed = 3,
  P1meter = document.getElementById("P1meter"),
  P2meter = document.getElementById("P2meter"),
  timer = document.getElementById("timer"),
  result = document.getElementById("result"),
  playBtn = document.getElementById("playBtn"),
  msg = document.getElementById("msg");

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Assets/background.png",
});
const shop = new Sprite({
  position: {
    x: 620,
    y: 119,
  },
  imageSrc: "./Assets/shop.png",
  scale: 2.8,
  framesMax: 6,
});

const player = new Fighter({
  position: {
    x: 80,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 3,
  },
  color: "blue",
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Assets/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 175,
    y: 155,
  },
  sprite: {
    Idle: {
      imageSrc: "./Assets/samuraiMack/Idle.png",
      framesMax: 8,
      id: "Idle",
    },
    Run: {
      imageSrc: "./Assets/samuraiMack/Run.png",
      framesMax: 8,
      id: "Run",
    },
    Jump: {
      imageSrc: "./Assets/samuraiMack/Jump.png",
      framesMax: 2,
      id: "Jump",
    },
    Fall: {
      imageSrc: "./Assets/samuraiMack/Fall.png",
      framesMax: 2,
      id: "Fall",
    },
    Attack1: {
      imageSrc: "./Assets/samuraiMack/Attack1.png",
      framesMax: 6,
      id: "Attack1",
    },
    Attack2: {
      imageSrc: "./Assets/samuraiMack/Attack2.png",
      framesMax: 6,
      id: "Attack2",
    },
    Take_Hit: {
      imageSrc: "./Assets/samuraiMack/Take_Hit.png",
      framesMax: 4,
      id: "Take_Hit",
    },
    Death: {
      imageSrc: "./Assets/samuraiMack/Death.png",
      framesMax: 6,
      id: "Death",
    },
  },
  attackBox: {
    offset: { x: 175, y: 205 },
    width: 225,
    height: 50,
  },
});
P1meter.value = player.health / 100;

const enemy = new Fighter({
  position: {
    x: 800,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 3,
  },
  color: "red",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./Assets/kenji/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 175,
    y: 168,
  },
  sprite: {
    Idle: {
      imageSrc: "./Assets/kenji/Idle.png",
      framesMax: 4,
      id: "Idle",
    },
    Run: {
      imageSrc: "./Assets/kenji/Run.png",
      framesMax: 8,
      id: "Run",
    },
    Jump: {
      imageSrc: "./Assets/kenji/Jump.png",
      framesMax: 2,
      id: "Jump",
    },
    Fall: {
      imageSrc: "./Assets/kenji/Fall.png",
      framesMax: 2,
      id: "Fall",
    },
    Attack1: {
      imageSrc: "./Assets/kenji/Attack1.png",
      framesMax: 4,
      id: "Attack1",
    },
    Attack2: {
      imageSrc: "./Assets/kenji/Attack2.png",
      framesMax: 4,
      id: "Attack2",
    },
    Take_Hit: {
      imageSrc: "./Assets/kenji/Take_Hit.png",
      framesMax: 3,
      id: "Take_Hit",
    },
    Death: {
      imageSrc: "./Assets/kenji/Death.png",
      framesMax: 7,
      id: "Death",
    },
  },
  attackBox: {
    offset: { x: 15, y: 208 },
    width: 160,
    height: 50,
  },
});
enemy.framesHold = 15;
P2meter.value = enemy.health / 100;

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  player.update();
  enemy.update();

  //    Player movement
  player.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === "a") {
    player.switchSprite("Run");
    if (player.position.x > 0) player.velocity.x = -speed;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.switchSprite("Run");
    if (player.position.x < 905) player.velocity.x = speed;
  } else player.switchSprite("Idle");

  //    jumping
  if (player.velocity.y < 0) player.switchSprite("Jump");
  else if (player.velocity.y > 0) player.switchSprite("Fall");

  //    Enemy movement
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.switchSprite("Run");
    if (enemy.position.x > -37) enemy.velocity.x = -speed;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.switchSprite("Run");
    if (enemy.position.x < 875) enemy.velocity.x = speed;
  } else enemy.switchSprite("Idle");

  //    jumping
  if (enemy.velocity.y < 0) enemy.switchSprite("Jump");
  else if (enemy.velocity.y > 0) enemy.switchSprite("Fall");

  //    detect player attacks & enemy get hits
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.attackBox.position.x + player.attackBox.width >=
      enemy.position.x + enemy.offset.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.offset.x &&
    player.isAttcking &&
    player.currentFrame === 4
  ) {
    playSound("KenjiHits");
    enemy.takesHit(typeOfAttack);
    P2meter.value = enemy.health / 100;
    player.isAttcking = false;
  }

  //    player misses
  if (player.isAttcking && player.currentFrame === 4) player.isAttcking = false;

  //    detect enemy attacks and player gets hit
  if (
    enemy.attackBox.position.x <=
      player.position.x + player.width + player.offset.x &&
    enemy.attackBox.position.x + enemy.attackBox.width >=
      player.position.x + player.offset.x &&
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttcking &&
    enemy.currentFrame === 2
  ) {
    playSound("mackHits", 0.5);
    player.takesHit(typeOfAttack);
    P1meter.value = player.health / 100;
    enemy.isAttcking = false;
  }

  //    enemy misses
  if (enemy.isAttcking && enemy.currentFrame === 2) enemy.isAttcking = false;

  determineResult();
}

addEventListener("keydown", (e) => {
  if (!player.dead) {
    switch (e.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        playMackFoot();
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        playMackFoot();
        break;
      case "w":
        if (player.position.y >= jumpThreshold) {
          playSound("mackJump");
          player.velocity.y = -15;
        }
        break;
      case " ":
        typeOfAttack = player.attakc();
        if (typeOfAttack === "Attack1") playSound("mackAttack1");
        else playSound("mackAttack2");
        // hasPlayerAttacked = true;
        break;
    }
  }

  if (!enemy.dead) {
    switch (e.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        playKenjiFoot();
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        playKenjiFoot();
        break;
      case "ArrowUp":
        if (enemy.position.y >= jumpThreshold) {
          playSound("KenjiJump");
          enemy.velocity.y = -15;
        }
        break;
      case "ArrowDown":
        typeOfAttack = enemy.attakc();
        if (typeOfAttack === "Attack1") playSound("KenjiAttack1");
        else playSound("KenjiAttack2");
        break;
    }
  }
});

const ins = document.getElementById("instruction");

addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      if (keys.a.pressed) player.lastKey = "a";
      else stopMackFoot();
      break;
    case "a":
      keys.a.pressed = false;
      if (keys.d.pressed) player.lastKey = "d";
      else stopMackFoot();
      break;
    case " ":
      kenjiHits = false;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      if (keys.ArrowLeft.pressed) enemy.lastKey = "ArrowLeft";
      else stopKenjiFoot();
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      if (keys.ArrowRight.pressed) enemy.lastKey = "ArrowRight";
      else stopKenjiFoot();
      break;
    case "ArrowLeft":
      hasEnemyAttacked = false;
      break;
  }
});

window.onload = () => {
  ins.style.display = "flex";
  result.style.display = "flex";
  P1meter.style.display = 'none';
  P2meter.style.display = 'none';
  timer.style.display = 'none';
};

playBtn.addEventListener("click", () => {
  result.style.display = "none";
  ins.style.display = "none";
  P1meter.style.display = "flex";
  P2meter.style.display = "flex";
  timer.style.display = "flex";
  BGM.play();
  playSound("fight");
  c.clearRect(0, 0, canvas.width, canvas.height);
  if (msg.innerText === "") {
    animate();
    decreaseTimer();
  } else {
    window.location.reload();
  }
});
