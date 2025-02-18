let points = []; 
let A = {x:0, y:720}, B = {x:1280/2, y:0}, C = {x:0, y:0}; 
let origo = {x:0,y:0};
let carPos = {x:0,y:720}, oldPos = {x:0,y:0};;
let angle = 90;
let carImg;
let upd = {x:0, y:0};
let accel = 0;
let cScale = 1;
let lineAcc = 0;
let ABSlope = 0;
let curveShape = ""
let roadWidth = 100
let debugMode = false
let friction = 0.99
let accelFactor = 0.2;
function preload(){
    carImg = loadImage('bilbillede.webp');
  }
function setup(){
    createCanvas(1280,720)
    angleMode(DEGREES)
    textAlign(CENTER,CENTER)
carVel = createVector(0, 0);
}

//document.addEventListener('contextmenu', event => event.preventDefault());
let t = 0
let IsHolding = false

function draw(){
    background('lightgrey');
    translate(origo.x, origo.y);
    deletePoint();
    createBezier();
    drawRoad();
    newCurve();
    car();
    if(!mouseIsPressed){
    t += 0.006;
    }
    if (debugMode === true){
        fill('white')
        circle(A.x,A.y,30)
        circle(B.x,B.y,30)
        fill('red')
        circle(C.x,C.y,60)
    }
}

function keyPressed(){
    if (key === 'g' || key === 'G'){
        debugMode = !debugMode
    }
}

function createBezier(){
    // Laver lineær interpolation for at danne en kvadratisk bezier kurve, hvis koordinater laves til et objekt som sendes i 'points' arrayet
    let dX = lerp(A.x,C.x,t)
    let dY = lerp(A.y,C.y,t)
    let eX = lerp(C.x,B.x,t)
    let eY = lerp(C.y,B.y,t)
    gX = lerp(dX,eX,t)
    gY = lerp(dY,eY,t)
    Pg = {x:gX, y:gY} // Objekt for bezierkurvens punkter
    if(!mouseIsPressed){
    points.push(Pg)// Sætter objektet i points array
    }
}
function drawRoad(){
    // Tegner en linje mellem points listens index x og y værdier -1 og den nuværende
    for (let i = 1; i < points.length; i++) {
        // Lav retningsvektor
        let slope = createVector(points[i].x-points[i-1].x, points[i].y-points[i-1].y)
        difX = points[i].x-points[i-1].x
        difY = points[i].y-points[i-1].y
        curveSpeed = dist(0, 0, difX, difY)
        stroke(0)
        slope.setMag(roadWidth)
        let normL = p5.Vector.rotate(slope,90)
        let normR = p5.Vector.rotate(slope,-90)
        strokeWeight(25)
        line(points[i].x, points[i].y, points[i].x + normL.x , points[i].y + normL.y)
        line(points[i].x, points[i].y, points[i].x + normR.x , points[i].y + normR.y)
    // Lav gule linjer til vejen
    strokeWeight(4)
    let segment = i / points.length;
    stroke(segment * 255, 255, (1 - segment) * 255);
    slope.setMag(5)
    let roadL = p5.Vector.rotate(slope,90)
    let roadR = p5.Vector.rotate(slope,-90)


// I starten tegnes vejens linjer med lavt interval, men ændres til at være højere da det lave interval resulterer i huller
if(i<10){
    lineAcc = 1
 }else{lineAcc = 10
}
        line(points[i-lineAcc].x + roadL.x, points[i-lineAcc].y + roadL.y, points[i].x + roadL.x , points[i].y + roadL.y)
        line(points[i-lineAcc].x + roadR.x, points[i-lineAcc].y + roadR.y, points[i].x + roadR.x , points[i].y + roadR.y)
   stroke(255)
        slope.setMag(100)
    let roadBL = p5.Vector.rotate(slope,90)
    let roadBR = p5.Vector.rotate(slope,-90)     
        line(points[i-lineAcc].x + roadBL.x, points[i-lineAcc].y + roadBL.y, points[i].x + roadBL.x , points[i].y + roadBL.y)
        line(points[i-lineAcc].x + roadBR.x, points[i-lineAcc].y + roadBR.y, points[i].x + roadBR.x , points[i].y + roadBR.y)
    }
}

function deletePoint() {
    if(points.length>=500){
        points.splice(0,1)
    }
}
 


// I intervaller af width skal en ny kurve laves, hvor det følgende gælder for punkterne:
    //A = B, når t = 1
    //C = ymax/min eller xmax/min vha. hældning
    //B = et punkt i et af 'hjørnerne', hvor A vil ligge på en af siderne
function newCurve(){
    if(t>1){
        // Hvis kurven er for hurtig, gør cScale lavere for at gøre kurven langsommere
    if (curveSpeed > 10){
        cScale = 0.8
    }
        t=0
        console.log(difY)
//1.
    if(difX > 0 && difY < 0.00001){
        updPoints();
        if (curveShape == "shape1"){
            B.x += width/2
            B.y += random([height,-height])
        }else{
            B.x += random([width/2,-width/2])
            B.y -= height
        }
        console.log("1")
    }
//2.
        if(difX < 0 && difY < 0){
            updPoints();
            if (curveShape == "shape1"){
                B.x -= width/2
                B.y += random([height,-height])
                console.log(curveShape)
            }else{
                B.x += random([width/2,-width/2])
                B.y -= height
            } 
            console.log("2")
        }
//3.
        if(difX > 0 && difY > 0.00001){
            updPoints(); 
            if (curveShape == "shape2"){
                B.x += width/2
                B.y += random([height,-height])
                console.log(curveShape)
            }else{
                B.x += random([width/2,-width/2])
                B.y += height
            }
            console.log("3")
        }
//4.
        if(difX < 0 && difY > 0){
            updPoints();
            if (curveShape == "shape2"){
                B.x -= width/2
                B.y += random([height,-height])
            }else{
                B.x += random([width/2,-width/2])
                B.y += height
            }   
            console.log("4")
        } 
        console.log(curveShape)
    }
}

function updPoints(){
    let ABSlope = (B.y-A.y)/(B.x-A.x)
    let yOnLine = A.y + (C.x - A.x) * ABSlope;
    if (C.y <= yOnLine) {
        curveShape = "shape1"
    }else{curveShape = "shape2"}
    C.x = B.x + cScale * (B.x - C.x);
    C.y = B.y + cScale * (B.y - C.y);
    A.x = B.x;
    A.y = B.y;
    cScale = 1;
}
function car(){

    if (keyIsDown(65)){
        angle -= 2.5
      }
    if (keyIsDown(68)){
        angle += 2.5
    }
    let force = createVector(0, 0);
    if (keyIsDown(87)){
        force = createVector(cos(angle)*accelFactor, sin(angle)*accelFactor);
    }
    if (keyIsDown(83)){
        force = createVector(cos(angle)*(-accelFactor), sin(angle)*(-accelFactor))
    }
    carVel.x -= force.x
    carVel.y -= force.y
    carVel.x *= friction
    carVel.y *= friction
        upd.x -= cos(angle) * accelFactor * accel
        upd.y -= sin(angle) * accelFactor * accel
    
    push();
    translate(carPos.x,carPos.y);
    if(angle>360){
        angle = 0
    }
    momentumDirection = createVector (carVel.x, carVel.y).normalize()
    momentumAngle = momentumDirection.heading()
    rotate(angle);
    rectMode(CENTER);
    
    imageMode(CENTER);
    image(carImg, 0, 0, 150, 100);
    pop();
    
    carPos.x += carVel.x
    carPos.y += carVel.y
    stroke(0)
    upd = {x:0, y:0}
    origo.x = -carPos.x+width/2
    origo.y = -carPos.y+height/2
    accelFactor = 0.1 + dist(carPos.x,carPos.y,gX,gY)/25000
    
}
