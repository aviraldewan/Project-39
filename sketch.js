const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine,world;

var Play = 1;
var End = 0;
var gameState = Play;
var car,cari,bgi,pa,pa2,pa3,obj,oGroup,car_col;

function preload()
{
  bgi = loadImage("track.png");
  cari = loadImage("car.png");
  obj = loadImage("o3.png");
  car_col = loadImage("c.png");
}

function setup() {
	createCanvas(displayWidth,displayHeight);
	engine = Engine.create();
	world = engine.world;

 car = createSprite(780,displayHeight,30,30);
 car.addImage(cari);
 car.scale = 0.06;
 car.setCollider("rectangle",0,0,400,car.height);
 car.debug = false;

 pa = createP('Suprised to see the length of road?<br>Answer: LIFE is short but we think that it is long just like this road');
 pa2 = createP('Road ,here, represents life and car ,here, represents you');
 pa3 = createP('I hope you got my point!<br>Thanks for your precious time');

 oGroup = createGroup();

	Engine.run(engine);
}
 
function draw() {
  background(0);
  image(bgi, 0,-displayHeight*4,displayWidth, displayHeight*5.3);

  camera.position.x = displayWidth/2;
  camera.position.y = car.y;

  o();

  if (gameState === Play)
  {
    if (keyIsDown(UP_ARROW))
    {
      car.y -= 15;
    }
    else if (keyDown('right_arrow'))
    {
      car.x += 10;
    }
    else if (keyDown('left_arrow'))
    {
      car.x -= 10;
    }
  }

  if (oGroup.isTouching(car))
  {
    gameState = End;
  }

  if (gameState === End)
  {
    oGroup.destroyEach();
    oGroup.setLifetimeEach(-1);
    car.addImage(car_col);
    car.scale = 1;
    textSize(30);
    stroke('black');
    fill('white');
    text("Game Ended",car.x,car.y - 120);
  }

  if (car.y <= -3531)
  {
    textSize(30);
    stroke('black');
    fill('white');
    text("You Won",car.x,car.y - 120);
    car.visible = false;
  }

  drawSprites();
 
}

function o()
{
  if (frameCount % 40 === 0)
  {
    var ob =  createSprite(random(car.x - 450 ,car.x + 600),car.y,30,30);
    ob.addImage(obj);
    ob.scale = 0.6;
    ob.lifetime = 200;
    oGroup.add(ob);
  }
}