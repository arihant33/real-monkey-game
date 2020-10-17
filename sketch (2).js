
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var bananaScore =0,score =0;
var gameState=PLAY
var PLAY=1
var END=0


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png",
                                            "sprite_2.png","sprite_3.png",
                                            "sprite_4.png","sprite_5.png",
                                            "sprite_6.png","sprite_7.png",
                                            "sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
 
   obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  
  
   monkey = createSprite(80,230,10,10);
  monkey.scale = 0.1;
  monkey.addAnimation( "moving",monkey_running);

  
  
  ground = createSprite(600,390,600,10);
  ground.scale = 1;
  ground.visible = true
  
  
  invisiGround = createSprite(300,370,600,7);
  invisiGround.visible = false;
  ground.velocityX=-3
 ground.x= ground.width/2 

  
}
  

function draw() {
  
   background("lightblue")
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")) {
      monkey.velocityY = -12; 
    }
  monkey.velocityY= monkey.velocityY+2

  
  monkey.collide(invisiGround)
         
  
   obstacles();
  bananas();

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);

   if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
  
 if (gameState === PLAY){
  
    score = score + Math.round(getFrameRate()/100);
    
    ground.velocityX = -(8+score*25/100);
  
    
  
   
    
  
    
    if ( obstaclesGroup.isTouching(monkey)){
      ground.velocityX=0
      monkey.velocityY=0
    }
    
  }
  
if (monkey.isTouching(obstacleGroup)){
      gameState = END;
  
  
    }
     
     
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
   
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);    
  
     
  } 
  
  
  
drawSprites()  
}







function obstacles() {
  if(frameCount % 100 === 0) {
    obstacle = createSprite(800,360,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}






function bananas(){
  if (frameCount%100 === 0){
    
    banana = createSprite(600,250, 50, 50 )
    banana.y =random(120,200)
    banana.velocityX =-5
     banana.lifetime = 220;
    banana.addImage( bananaImage);
   banana.scale = 0.1;
             
    banana.lifetime = 220;
    bananaGroup.add(banana);

  } 
  
}





