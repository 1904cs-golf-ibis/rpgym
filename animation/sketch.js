let spritesheet
let spritedata

let animation = []

let bombs = []

function preload() {
  spritedata = loadJSON('bomb.json')
  spritesheet = loadImage('bomb.png')
}

function setup() {
  createCanvas(640, 480)
  let frames = spritedata.frames
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h)
    animation.push(img)
  }

  // for (let i = 0; i < 5; i++) {
  //   bombs[i] = new Sprite(animation, 0, i * 75, random(0.1, 0.4));
  // }
}

function draw() {
  background(0)

  // for (let bomb of bombs) {
  //   bomb.show();
  //   bomb.animate();
  // }

  image(animation[frameCount], 0, 0)
}
