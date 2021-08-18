var canvas, bgIMG;
var sonic, ring, spike;
var sonicIMG, ringIMG, spikeIMG;
var rings, spikes;
var test1;

var score = 0;


function preload() {

  bgIMG = loadImage("sprites/track.jpg");
  sonicIMG = loadImage("sprites/sonic_running.gif");
  ringIMG = loadImage("sprites/ring.png");
  spikeIMG = loadImage("sprites/spike.png");
}


function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 320);

  sonic = createSprite(190, 380, 50, 50);
  sonic.shapeColor = "blue";
  sonic.velocityX = 20;

  rings = createGroup();
  spikes = createGroup();
}


function draw() {
  background("white");
  image(bgIMG, 0, 0);

  //moving the camera with the player and moving the player
  camera.position.x = sonic.position.x + 760;
  //camera.position.x = 950;
  //camera.velocityX = 20;
  camera.position.y = 380;
  camera.velocityX = 20;
  sonic.y = World.mouseY;
  /*if(camera.position.x > 6500) {
    sonic.position.x = 500;
  }*/

  //spawn rings
  if(frameCount % 30 == 0) {
    ring = createSprite(camera.position.x + 940, random(170,600), 40, 40);
    ring.shapeColor = "green";
    ring.visible = true;
    ring.lifetime = 84;
    rings.add(ring);
  }

  //gaining rings
  if(rings.isTouching(sonic)) {
    score++;
  }

  //spawn obstacles
  if(frameCount % 45 == 0) {
    spike = createSprite(camera.position.x + 940, random(170,600), 40, 40);
    spike.shapeColor = "red";
    spike.lifetime = 100;
    spikes.add(spike);
  }

  //taking damage
  if(spikes.isTouching(sonic)) {
    score = 0;
  }

  drawSprites();

  fill("black");
  stroke("black");
  strokeWeight(2);
  textSize(40);
  textFont("Courier New");
  text("Rings: "+ score, sonic.position.x - 100, 77);
}