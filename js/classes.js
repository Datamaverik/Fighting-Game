class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.currentFrame = 0; // keep track of the current frame
    this.framesElapsed = 0; // keep the count of the number of frames
    this.framesHold = 10; //  number of frames after which the sprite sheet is cropped
    this.offset = offset; //  to adjust the padding around the sprite sheets
  }

  draw() {
    c.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.framesMax), // crop x position
      0, //  crop y position
      this.image.width / this.framesMax, //  crop width
      this.image.height, //  crop height
      this.position.x - this.offset.x, //  image x position
      this.position.y - this.offset.y, //  image y position
      (this.image.width / this.framesMax) * this.scale, //  image width
      this.image.height * this.scale //  image height
    );
  }

  animateFrame() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.currentFrame < this.framesMax - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrame();
  }
}
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color,
    offset = { x: 0, y: 0 },
    imageSrc,
    scale = 1,
    framesMax = 1,
    sprite,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    //  calls the constructor of parent to inherit the properties of parent constructors
    super({
      imageSrc,
      scale,
      framesMax,
      position,
      offset,
    });
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttcking;
    this.health = 100;
    this.sprite = sprite;
    this.dead = false;

    //  extending the sprite object by adding another property which is a HTML image property
    for (const spr in this.sprite) {
      sprite[spr].image = new Image(); //  adding new property to the sprite object
      sprite[spr].image.src = sprite[spr].imageSrc;
      sprite[spr].image.id = sprite[spr].id;
    }

    //  inherited properties
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrame(); //  inherited from Sprite class

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    //  Debugging purposses
    
    // c.fillStyle = "green";
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    // c.fillStyle = "blue";
    // c.fillRect(this.position.x+this.offset.x, this.position.y+this.offset.y, this.width, this.height);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 97)
      this.velocity.y = 0;
    else this.velocity.y += gravity;
  }

  attakc() {
    this.switchSprite(attackArray[randomIntFromRange(0, 3)]);
    this.isAttcking = true;
    return this.image.id;
  }

  takesHit(attack) {
    if (attack === "Attack1") this.health -= 5;
    else if (attack === "Attack2") this.health -= 20;
    if (this.health <= 0) this.switchSprite("Death");
    else this.switchSprite("Take_Hit");
  }

  switchSprite(sprite) {
    if (this.image === this.sprite.Death.image) {
      if (this.currentFrame === this.sprite.Death.framesMax - 1)
        this.dead = true;
      return;
    }
    //Overriding all ohter animations
    if (
      (this.image === this.sprite.Attack1.image ||
        this.image === this.sprite.Attack2.image ||
        this.image === this.sprite.Take_Hit.image) &&
      this.currentFrame < this.framesMax - 1
    )
      return;

    switch (sprite) {
      case "Idle":
        if (this.image !== this.sprite.Idle.image) {
          this.image = this.sprite.Idle.image;
          this.framesMax = this.sprite.Idle.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "Jump":
        if (this.image !== this.sprite.Jump.image) {
          this.image = this.sprite.Jump.image;
          this.framesMax = this.sprite.Jump.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "Run":
        if (this.image !== this.sprite.Run.image) {
          this.image = this.sprite.Run.image;
          this.framesMax = this.sprite.Run.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "Fall":
        if (this.image !== this.sprite.Fall.image) {
          this.image = this.sprite.Fall.image;
          this.framesMax = this.sprite.Fall.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "Attack1":
        if (this.image !== this.sprite.Attack1.image) {
          this.image = this.sprite.Attack1.image;
          this.framesMax = this.sprite.Attack1.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "Attack2":
        if (this.image !== this.sprite.Attack2.image) {
          this.image = this.sprite.Attack2.image;
          this.framesMax = this.sprite.Attack2.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "Take_Hit":
        if (this.image !== this.sprite.Take_Hit.image) {
          this.image = this.sprite.Take_Hit.image;
          this.framesMax = this.sprite.Take_Hit.framesMax;
          this.currentFrame = 0;
        }
        break;
      case "Death":
        if (this.image !== this.sprite.Death.image) {
          this.image = this.sprite.Death.image;
          this.framesMax = this.sprite.Death.framesMax;
          this.currentFrame = 0;
        }
        break;
    }
  }
}
