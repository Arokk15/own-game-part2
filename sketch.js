var bg, bgImg;
var player, shooterImg, shooter_shooting;
var inwall=[]
var bulletlimg,bulletrimg
var bullet,bulletg
var nob=10
var gameover,goimg
var fly,en,enimg1,enimg2,enimg3,enimg4,flyimg,flydimg
var enemyg
var score=0

function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  bulletlimg=loadImage("assets/bulletl.png")
  bulletrimg=loadImage("assets/bulletr.png")
  goimg=loadImage("assets/gameover.jpg")

  enimg1=loadAnimation("assets/en1.gif")
  enimg2=loadAnimation("assets/en2.gif")
  enimg3=loadAnimation("assets/en3.gif")
  enimg4=loadAnimation("assets/en4.gif")




}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(windowWidth / 2 - 20, windowHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  gameover = createSprite(windowWidth / 2 - 20, windowHeight / 2 - 40, 20, 20)
  gameover.addImage(goimg)
  gameover.scale = 2
  gameover.visible=false

  //creating the player sprite
  player = createSprite(windowWidth/2, windowHeight/2+100, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 500)

  inwall0=createSprite(0,windowHeight/2+250,5,500)
  inwall1=createSprite(windowWidth,windowHeight/2+250,5,500)
  inwall2=createSprite(windowWidth/2,windowHeight/2,width,5)
  inwall3=createSprite(windowWidth/2,windowHeight-1,width,5)

  inwall=[inwall0,inwall1,inwall2,inwall3]

  bulletg=new Group()
  enemyg=new Group()

  

}

function draw() {
  background(0);




  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 30
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)
    bullet=createSprite(player.x,player.y-25)
    bullet.addImage("bullet",bulletrimg)
    bullet.scale=0.1
    bullet.velocityX=50
    bullet.debug=true
    bulletg.add(bullet)
    nob=nob-1

  }
  if(nob<=0){
    player.destroy()
    bulletg.destroyEach()
    enemyg.destroyEach()
    gameover.visible=true
    bg.visible=false
    nob=0

  }
  

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }

  for(var i=0;i<inwall.length;i++){
    player.collide(inwall[i])
    inwall[i].visible=false
  }

  for(var i=0;i<bulletg.length;i++){

    for(var g=0;g<enemyg.length;g++){
      if(enemyg[g].isTouching(bulletg[i])){
        enemyg[g].destroy()
        score=score+1
        bulletg[i].destroy()
      }
    }
  }

  
  enemy()

  drawSprites();
  fill("red")
  textSize(20)
  text("Av blt :"+nob,width/2-100,50)

  fill("red")
  textSize(20)
  text("kill rate :"+score,width/2-500,50)

}

function enemy(){
  if(frameCount%100==0){

    en=createSprite(width+100,Math.round(random(height/3+250,height-50)))
    en.debug=true
    en.setCollider("rectangle",0,0,100,200)
    var randomen=Math.round(random(1,4))

    en.scale=0.5
    switch(randomen){
      case 1:en.addAnimation("e1",enimg1);en.scale=0.250;en.setCollider("rectangle",0,0,150,400);break;
      case 2:en.addAnimation("e1",enimg2);break;
      case 3:en.addAnimation("e1",enimg3);break;
      case 4:en.addAnimation("e1",enimg4);break;
    }
    
    en.velocityX=-5
    enemyg.add(en)
  }
}
