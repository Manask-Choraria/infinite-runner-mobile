var player,ground,coinsGroup,obstaclesGroup,obstacleImg,coinsImg,groundImg,playerImg,coinScore,gameOver
gameState,gameOverimg,reset,resetImg,coinSound,gameOverSound,resetTap,obstacleTouchingSound;
var playerStop
var score = 0;
function preload(){
  obstacleImg = loadImage("Images/Pad_01_2.png")
  coinsImg = loadImage("Images/Coin_03.png")
  groundImg = loadAnimation("Images/road5.jpg")
  playerImg = loadAnimation("Images/player1.png","Images/player2.png","Images/player3.png",
  "Images/player4.png","Images/player5.png","Images/player6.png")
  playerStop = loadImage("Images/player4.png") 
  gameOverimg = loadImage("Images/gameover.png")
  resetImg = loadImage("Images/reset.png")
  coinSound = loadSound("Images/coinbonus.wav");
  gameOverSound = loadSound("Images/gameOver.wav")
  resetTap = loadSound("Images/mouseclick.wav")
  obstacleTouchsound = loadSound("Images/obstacletouching.wav")




       




}

function setup() {
  createCanvas(displayWidth,displayHeight);
  gameState = "play";
 ground = createSprite(displayWidth/2,displayHeight/2);
 ground.scale =1.5;
 ground.addAnimation("r",groundImg);
 player = createSprite(displayWidth/2, displayHeight-100, 50, 50);
 player.addAnimation("run",playerImg)
 gameOver = createSprite(displayWidth/2,displayHeight/2-100);
 gameOver.visible = false;
 gameOver.addImage(gameOverimg)
 gameOver.scale = 0.5
 reset = createSprite(displayWidth/2,displayHeight/2+50);
 reset.addImage(resetImg);
 reset.visible = false;
 reset.scale = 0.3;
 coinsGroup = new Group()
 obstaclesGroup = new Group();
 coinScore = 0;
 score = 0;

}

function draw() {
  background(0);
  if(gameState === "play"){
  if(ground.y>450){
    ground.y = 200;
  }
  score = score + Math.round(getFrameRate()/60);
  ground.velocityY = 10+score/100;
  generateCoins();
  createObstacles();
    keyPressed();
  if(coinsGroup.isTouching(player)){
    coinScore += 1
    coinsGroup.destroyEach();
    coinSound.play();
    
   }
  
   
   
  if(obstaclesGroup.isTouching(player)){
   gameState = "end";
   obstacleTouchsound.play();
  }}
  if(gameState === "end"){
    gameOver.visible = true
    player.addAnimation("stop",playerStop)
    player.changeAnimation("stop",playerStop);
    ground.velocityY = 0;
    coinsGroup.destroyEach();
    obstaclesGroup.destroyEach();
    reset.visible = true;
      
    if(mousePressedOver(reset)|| touches.length>0){
      gameReset();
      resetTap.play();
  
    }

    
  }

  
  


  
 

  drawSprites();
  fill("aqua");
  text("COINS SCORE: " +coinScore,displayWidth/2+140,110);
  text("DISTANCE: " +score,displayWidth/2+140,150);

}
function gameReset(){
  gameState = "play";
  gameOver.visible = false;
  reset.visible = false;
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  player.changeAnimation("run",playerImg);
  coinScore = 0;
  ground.velocityY = 10;
  score = 0;    
  
}

function keyPressed(){
  if((keyCode ===RIGHT_ARROW||touches[x]===300||touches[x]===450) && player.x<displayWidth/2+150){
    player.x += 150;

  }
  else if((keyCode ===LEFT_ARROW||touches[x]===300||touches[x]===150) && player.x>displayWidth/2-150){
    player.x -= 150;
  }
}   

//coins will be generated through this  function
function generateCoins(){
    if(frameCount%60 === 0){
       coins = createSprite(50,0,10,10);
       coins.addImage(coinsImg);
       var number = Math.round(random(1,3))
       switch(number){
         case 1:coins.x = displayWidth/2-150
         break;
         case 2:coins.x = displayWidth/2
         break;
         case 3:coins.x = displayWidth/2+150
         break;
       }
       coins.velocityY = 20+score/100;
       coins.lifetime = 350;
       coins.scale = 0.1;
       coinsGroup.add(coins)
    
    }
}

function createObstacles(){
  if(frameCount%95 === 0){
    obstacles = createSprite(50,0,20,10);
    obstacles.addImage(obstacleImg);
    var number = Math.round(random(1,3))
    switch(number){
      case 1:obstacles.x = displayWidth/2-150;
      break;
      case 2:obstacles.x = displayWidth/2;
      break;
      case 3:obstacles.x = displayWidth/2+150;
      break;
    }
    obstacles.velocityY = 20+score/100;
    obstacles.lifetime = 350;
    obstacles.scale = 0.1;
    obstaclesGroup.add(obstacles);
  }
}
