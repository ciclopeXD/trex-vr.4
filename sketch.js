var muerto;
var trex, trex_running, edges;
var groundImage,ground;
var clowdImage;
var clowdGroup;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstaclesGroup;
var marcador=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var salto;
var dead;
var checkpoint;
var gameOverPng;
var restart;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  muerto = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png")
  clowdImage=loadImage("nube.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
salto = loadSound("jump.mp3");
dead = loadSound("die.mp3");
checkpoint=loadSound("checkpoint.mp3");
restartImg = loadImage("restart.png");
gameOverPng = loadImage("gameOver.png");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //crear sprite de Trex
  trex = createSprite(50,height-50,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",muerto);
  edges = createEdgeSprites();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50

  trex.setCollider("circle",0,0,50)

  trex.debug=false;

  ground=createSprite(200,height-30,400,20);
  ground.addImage("suelo",groundImage);
  invisibleGround=createSprite(200,height-20,400,18);
  invisibleGround.visible=false;
  clowdGroup=new Group();
  obstacleGroup=new Group();
  gameOver=createSprite(width/2,height/2);
  gameOver.addImage(gameOverPng);
  gameOver.scale=0.7;
  gameOver.visible=false;
  restart=createSprite(width/2,height/2-50);
  restart.addImage(restartImg);
  restart.visible=false;
}


function draw(){
  //establecer color de fondo.
  background("white");
  
  if(gameState === PLAY){
    text(marcador + " marcador",width-90,50);
   if(frameCount %2 === 0){
    marcador=marcador+1;
   }
   if(marcador %100 === 0){
     checkpoint.play();
   }
    ground.velocityX=-(5+marcador/300);
   
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(touches.length>0||keyDown("space")&& trex.y>=height-60){
      trex.velocityY = -10;
      touches=[];
      salto.play();
    }
    
    trex.velocityY = trex.velocityY + 0.5;
    clowds();
    obstacles();
    

    trex.collide(invisibleGround);
  if(obstacleGroup.isTouching(trex)){
    gameState=END;
   dead.play();
  }
  }else if(gameState === END){
gameOver.visible=true;
restart.visible=true;
trex.changeAnimation("collided",muerto);
    text(marcador + " marcador",width-90,50);

trex.changeAnimation("collided", muerto);

obstacleGroup.setLifetimeEach(-1)
clowdGroup.setLifetimeEach(-1)
if(touches.length>0||keyDown("space")){
 
  touches=[];

}
ground.velocityX=0;
trex.velocityY=0;
obstacleGroup.setVelocityXEach(0)
clowdGroup.setVelocityXEach(0);
text("enter para reiniciar",width/2-50,height/2+50);


if(keyDown("enter")||mousePressedOver(restart)||mousePressedOver(gameOver)){
  obstacleGroup.destroyEach();
  clowdGroup.destroyEach();
 marcador=0
 gameOver.visible=false;
 restart.visible=false;
  gameState=PLAY;
  trex.changeAnimation("running",trex_running);
  
}
  }
  
  
 
 
  drawSprites();
}

function clowds(){
 var numeros;
numeros=Math.round(random(height-200,height-120)) 
  if(frameCount %60 === 0){
    clowd=createSprite(width,numeros,40,10);
  clowd.addImage(clowdImage);
  clowd.scale=0.2;
 clowd.velocityX=-3;
 clowd.depth=trex.depth;
 trex.depth=trex.depth+3;
 clowdGroup.add(clowd);
 clowd.lifetime=450;
  }
}
function obstacles(){
  var numeros;
  var posicion=[80,100,60,40];
numeros=Math.round(random(posicion)) 
  if(frameCount %numeros === 0){
obstacle=createSprite(width,height-40,10,40);
obstacle.velocityX=-(5+marcador/300);
obstacleGroup.add(obstacle);
switch(Math.round(random(1,6))){
  case 1: obstacle.addImage(obstacle1);break;
  case 2: obstacle.addImage(obstacle2);break;
  case 3: obstacle.addImage(obstacle3);break;
  case 4: obstacle.addImage(obstacle4);break;
  case 5: obstacle.addImage(obstacle5);break;
  case 6: obstacle.addImage(obstacle6);break;
  default:break;
}

obstacle.scale=0.5;
obstacle.lifetime=470;
  }
}