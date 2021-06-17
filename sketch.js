var grid = 50;
var width = 1366;
var carGroup1,logGroup1;
var grassHeight = 100;
var gameState = "play";
var carAnimation1,carAnimation2, logAnimation, playerAnimation;
var school;
var city,cityAnimation;
function preload(){
 carAnimation1=loadAnimation("images/car1.png");
 carAnimation2=loadAnimation("images/car2.png");
 logAnimation=loadAnimation("images/log2.png");
 playerAnimation=loadAnimation("images/Player-03.png");
 cityAnimation=loadAnimation("images/city1.png");
}
function setup() {
  createCanvas(1366,700);
  city=createSprite(width/2,-1595);
 city.addAnimation("city",cityAnimation);
  carGroup1 = new Group();
  logGroup1 = new Group();
  for(var i=0;i<6;i++){
    var bottomGrass1=createSprite(683,height-50-(i*400),width,grassHeight);
    if(i%2===0){
      var road=createSprite(683,height-150-(i*400)-grassHeight,width,300);
      road.shapeColor="black";
    }
    bottomGrass1.shapeColor="grey";
  }
  for(var i=0;i<40;i++){
    cars=new Car(2);
    carGroup1.add(cars.spt);
  }
  for(var i=0;i<40;i++){
    logs=new Log(-2);
    logGroup1.add(logs.spt);
  }
  player=new Player(width/2,height-25);
 }
function draw() {
  background("skyblue");
  translate(0,-player.spt.y+height-150);
  if(gameState==="play"){
  keyPressed();
  }
  if(carGroup1.isTouching(player.spt)){
    player.spt.x=width/2;
    player.spt.y=height-25;
  }
  if(logGroup1.isTouching(player.spt)){
    player.spt.x=player.spt.x-2;
  }else if((player.spt.y>height-1550 && player.spt.y<-1300)||
  (player.spt.y<height-500 && player.spt.y>height-850)||
  (player.spt.y>height)||
  (player.spt.x<0)||
  (player.spt.x>width))
  {
    player.spt.x=width/2;
    player.spt.y=height-25;
  }
  for(var i=1;i<logGroup1.length;i++){
    if(logGroup1[i].x<0){
      logGroup1[i].x=width;
    }
  }
  for(var i=1;i<carGroup1.length;i++){
    if(carGroup1[i].x<0){
      carGroup1[i].x=width;
    }else if(carGroup1[i].x>width){
      carGroup1[i].x=0;
    }
  }
  if(city.isTouching(player.spt)){
      gameState="win";
  }
  if(gameState==="win"){
      stroke("green");
      fill("green");
      textSize(40);
      text("Congratulations! You Made It",width/2-250,-1850);
      carGroup1.destroyEach();
      logGroup1.destroyEach();
  }
  drawSprites();
}
function keyPressed(){
  if(keyDown("UP")){
    player.move(0,-2);
  }else if(keyDown("DOWN")){
    player.move(0,2);
  }else if(keyDown("LEFT")){
    player.move(-2,0);
  }else if(keyDown("RIGHT")){
    player.move(2,0);
  }
}