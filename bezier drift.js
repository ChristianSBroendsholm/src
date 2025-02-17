let points = []; 
let A = {x:0, y:720}; //statisk
let B = {x:1280, y:720/2}; //statisk
let C = {x:0, y:0}; //dynamisk punkt
let dragA, dragB;
let acc = {x:0, y:0}
let origX = 0; let origY = 0;
let carPos = {x:1280/2,y:720-200}
function setup(){
    createCanvas(1280,720)
}

document.addEventListener('contextmenu', event => event.preventDefault());
let t = 0
let IsHolding = false

function draw(){
    background('lightgrey')
    strokeWeight(5)
    t += 0.003;
    //origX--
    //origY++
    translate(origX, origY);
//B.y=1280*sin(frameCount)

  
    if(IsHolding == true){
        C.x = mouseX
        C.y = mouseY
    }
    //Hvis man holder venstreklik kan man rykke punkterne

//for (let t = 0; t<=1; t+=0.003){
    let dX = lerp(A.x,C.x,t)
    let dY = lerp(A.y,C.y,t)
    let eX = lerp(C.x,B.x,t)
    let eY = lerp(C.y,B.y,t)
    let gX = lerp(dX,eX,t)
    let gY = lerp(dY,eY,t)
    Pg = {x:gX, y:gY} //objekt for bezierkurvens punkter
    points.push(Pg)//sætter x og y værdier i et array
//}
    //tegner en linje mellem points listens index x og y værdier -1 og den nuværende
   for (let i = 8; i < points.length; i++) {
    let slope = createVector(points[i].x-points[i-1].x, points[i].y-points[i-1].y)
    stroke(80)
    angleMode(DEGREES)
    slope.setMag(80)
    //line(points[i].x, points[i].y, points[i].x + slope.x , points[i].y + slope.y)
    let normL = p5.Vector.rotate(slope,90)
    let normR = p5.Vector.rotate(slope,-90)
    strokeWeight(40)
    line(points[i].x, points[i].y, points[i].x + normL.x , points[i].y + normL.y)
    line(points[i].x, points[i].y, points[i].x + normR.x , points[i].y + normR.y)
    //lav gule linjer til vejen
    strokeWeight(4)
    stroke('yellow')
    let segment = i / points.length;
    stroke(segment * 255, 255, (1 - segment) * 255);
    slope.setMag(5)
    //line(points[i].x, points[i].y, points[i].x + slope.x , points[i].y + slope.y)
    let roadL = p5.Vector.rotate(slope,90)
    let roadR = p5.Vector.rotate(slope,-90)
        line(points[i-8].x + roadL.x, points[i-8].y + roadL.y, points[i].x + roadL.x , points[i].y + roadL.y)
        line(points[i-8].x + roadR.x, points[i-8].y + roadR.y, points[i].x + roadR.x , points[i].y + roadR.y)
   stroke(255)
        slope.setMag(90)
    let roadBL = p5.Vector.rotate(slope,90)
    let roadBR = p5.Vector.rotate(slope,-90)     
        line(points[i-8].x + roadBL.x, points[i-8].y + roadBL.y, points[i].x + roadBL.x , points[i].y + roadBL.y)
        line(points[i-8].x + roadBR.x, points[i-8].y + roadBR.y, points[i].x + roadBR.x , points[i].y + roadBR.y)
    }

if(t>1){
    A.x = width
    A.y = height
}
car();
function car(){ 

if (keyIsDown(65)){
    carPos.x -= 20
  }
    if (keyIsDown(68)){
    carPos.x += 20
  }
  if (keyIsDown(87)){
    carPos.y -= 20
  }
    if (keyIsDown(83)){
    carPos.y += 20
  }
rect(carPos.x-origX,carPos.y,40,100)
}




   stroke('black')
   //line(A.x,A.y,C.x,C.y)
   //line(B.x,B.y,C.x,C.y)
   stroke('blue')
   //line(dX,dY,eX,eY)

   stroke('black')
   strokeWeight(2)
   fill('white')
   //circle(A.x,A.y,10)
   //circle(B.x,B.y,10)
   //circle(C.x,C.y,10)
   fill('black')
   //circle(dX,dY,10)
   //circle(eX,eY,10)
   fill('white')
   //circle(gX,gY,10)


   if (t >= 1) {
    //t = 0
    //points = []
    //clear()
   }
}