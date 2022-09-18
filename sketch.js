var running,runningImg
var rock,rockGroup,rockImg
var invisibleGround
var score
var gameOver,gameOverImg
var background1,backgroundImg
var gameState = "play";
createEdgeSprites();

function preload(){

runningImg = loadImage("ship03.jpg");
rockImg = loadImage("ship08.jpg")
gameOverImg = loadImage("game_over.png")
backgroundImg = loadImage("background.jpg")
}

function setup() {
createCanvas(windowWidth, windowHeight) 

running = createSprite(50,height-60, 20, 50);
running.addImage("running", runningImg)
running.x = 50
running.scale = 0.3

background1 = createSprite(850,420,400,20);
 background1.addImage("background",backgroundImg);
 background1.scale = 2.9

 gameOver = createSprite(855,480 );
 gameOver.addImage(gameOverImg);
 gameOver.scale = 7.9

 invisibleGround = createSprite (300,height-30,600,4);
invisibleGround.visible = false

score = 0;

rockGroup = new Group();
}

function draw() {
background("white") ;
drawSprites();
text("score: "+score,1600,20);

if (gameState == "play" ){
    gameOver.visible = false
    background.depth = running.depth;
    running.depth = running.depth +1;

    if(keyDown("up")){
      running.y = running.y - 5;
    }
    if(keyDown("down")){
      running.y = running.y + 5;
    }

      background1.velocityX = -3
      if (background1.x < 0){
        background1.x = background1.width/2;
      }
    
   
      drawRock();

      score = score + Math.round(getFrameRate()/60);

      if (rockGroup.isTouching(running)){
        gameState = "end";
      }     
}

else if(gameState == "end") {
    gameOver.visible = true
    rockGroup.setVelocityXEach(0);
background1.velocityX = 0;
running.velocityY = 0;
running.depth = gameOver.depth;
    gameOver.depth = gameOver.depth +1;
rock.depth = gameOver.depth;
    gameOver.depth = gameOver.depth +1;

if (keyDown("space")){
    gameState = "play"
    score = 0
  rockGroup.destroyEach();
  }
  
  
running.collide(invisibleGround);
}
}

function drawRock() {
  if(frameCount % 100 == 0){
    rock = createSprite(1650,height-5,50,20)
    rock.y = Math.round(random(90,820));
    rock.addImage(rockImg)
    rock.velocityX = -3.2
    rock.scale = 0.25
    rock.rotation = 180
    background.depth = rock.depth;
    rock.depth = rock.depth +1;
    rock.lifeTime = 200;
    rockGroup.add(rock);
  }
}