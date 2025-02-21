let points = []; 
let A = {x:0, y:720}, B = {x:1280/2, y:0}, C = {x:0, y:0}; 
let t = 0;
let origo = {x:0,y:0};
let carPos = {x:0,y:720}, oldPos = {x:0,y:0};;
let angle = 90;
let carImg;
let cScale = 1;
let lineAcc = 0;
let accelFactor = 0.2;
let score = 0;
let friction = 0.99;
let ABSlope = 0;
let curveShape = ""
let roadWidth = 100
let debugMode = false
let difX, difY;
function preload(){
    carImg = loadImage('bilbillede.webp');
  }
function setup(){
    createCanvas(1280,720)
    // Vinklerne sættes til at beregnes i grader, da dette skal anvendes i bilens funktion til at dreje den.
    angleMode(DEGREES)
    // Tekst vil automatisk rykke sig til at være i midten 
    textAlign(CENTER,CENTER)
    carVel = createVector(0, 0);
}


function draw(){
    background('lightgrey');
    // Origo sættes til x og y værdier for objekt 'origo'
    translate(origo.x, origo.y);
    if (points.length >= 500){
    deletePoint();
    }
    createBezier();
    drawRoad();
    if(t > 1){
    newCurve();
    }
    car();
    // Hvis musen trykkes vil kurven stå stille
    if(!mouseIsPressed){
    t += 0.006;
    }
    // debugMode viser bézierkurvens tre punkter
    if (debugMode === true){
        fill('white')
        circle(A.x,A.y,30)
        circle(B.x,B.y,30)
        fill('red')
        circle(C.x,C.y,60)
    }
}


function createBezier(){
    // Laver lineær interpolation, som interpoleres igen for at danne en kvadratisk bezier kurve
    // Koordinaterne laves til objekt 'Pg', som sendes i 'points' arrayet
    let dX = lerp(A.x,C.x,t) // Interpolerer mellem A.x og C.x ud fra t
    let dY = lerp(A.y,C.y,t) // Interpolerer mellem A.y og C.y ud fra t
    let eX = lerp(C.x,B.x,t) // Interpolerer mellem C.x og B.x ud fra t
    let eY = lerp(C.y,B.y,t) // Interpolerer mellem C.y og B.y ud fra t
    gX = lerp(dX,eX,t) // Interpolerer yderligere mellem dX og eX ud fra t
    gY = lerp(dY,eY,t) // Interpolerer yderligere mellem dY og eY ud fra t
    Pg = {x:gX, y:gY} // Objekt for bézierkurvens punkter
    // Hvis musen trykkes, vil der ikke tilføjes elementer til arrayet
    if(!mouseIsPressed){
    points.push(Pg)// Sætter objektet i points array
    }
}
function drawRoad(){
    // Tegner en linje mellem points listens index x og y værdier -1 og den nuværende
    for (let i = 1; i < points.length; i++) {
        // Lav retningsvektor
        let slope = createVector(points[i].x - points[i-1].x, points[i].y - points[i-1].y);
        // Ændring i kurvens x og y
        difX = points[i].x-points[i-1].x;
        difY = points[i].y-points[i-1].y;
        stroke('black');
        // Sætter retningsvektorens længde til vejens bredde
        slope.setMag(roadWidth);
        // Laver normalvektorer ved at rotere retningvektoren med 90 grader
        let normL = p5.Vector.rotate(slope, 90);
        let normR = p5.Vector.rotate(slope, -90);
        strokeWeight(25);
        push();
        translate(points[i].x,points[i].y)
        line(0, 0, normL.x, normL.y)
        line(0, 0, normR.x, normR.y)
        pop();
  
// I starten tegnes vejens linjer med lavt interval, men ændres derefter til at være højere
// Det ændres, da det lave interval resulterer i huller i vejens linjer
    if(i<10){
        lineAcc = i
    }else{lineAcc = 10}
 
    // Lav linjer til vejen
    strokeWeight(4)
    // Når segment = 0 er farven (0,255,255), altså cyan i RGB. Derimod vil segment = 1 give (255,255,0), gul. 
    let segment = i / points.length;
    stroke(segment * 255, 255, (1 - segment) * 255);
    slope.setMag(5)    
    let roadL = p5.Vector.rotate(slope, 90)
    let roadR = p5.Vector.rotate(slope,-90)
    line(points[i-lineAcc].x + roadL.x, points[i-lineAcc].y + roadL.y, points[i].x + roadL.x , points[i].y + roadL.y)
    line(points[i-lineAcc].x + roadR.x, points[i-lineAcc].y + roadR.y, points[i].x + roadR.x , points[i].y + roadR.y)
    stroke('white')
    slope.setMag(100)    
    line(points[i-lineAcc].x + normL.x, points[i-lineAcc].y + normL.y, points[i].x + normL.x , points[i].y + normL.y)
    line(points[i-lineAcc].x + normR.x, points[i-lineAcc].y + normR.y, points[i].x + normR.x , points[i].y + normR.y)
    }
}

function deletePoint(){
        points.splice(0,1);
}
function updPoints(){
    let ABSlope = (B.y-A.y)/(B.x-A.x)
    let yOnLine = A.y + (C.x - A.x) * ABSlope;
    if (C.y <= yOnLine) {
        curveShape = "shape1";
    }else{curveShape = "shape2"}
    C.x = 2 * B.x - C.x;
    C.y = 2 * B.y - C.y;
    A.x = B.x;
    A.y = B.y;
}

function addWidthRHeight(){
    B.x += width/2;
    B.y += random([height,-height]);  
}
function subWidthRHeight(){
    B.x -= width/2;
    B.y += random([height,-height]);;  
}
function addHeightRWidth(){
    B.x += random([width/2,-width/2]);
    B.y += height;  
}
function subHeightRWidth(){
    B.x += random([width/2,-width/2]);
    B.y -= height;
}
// Når t = 1 skal en ny kurve laves, hvor det følgende vil gælde for punkterne:
    // A opdateres til B
    // C opdateres til at spejle i B
    // B opdateres enten til at have + eller - width / 2, og det samme med + eller - height
function newCurve(){
    t = 0
    updPoints();
//1.
    if(difX > 0 && difY < 0.00001){
        if (curveShape == "shape1"){
                addWidthRHeight();
            }else{
                subHeightRWidth();
            }
            console.log("1")
        }
//2.
        if(difX < 0 && difY < 0){
            if (curveShape == "shape1"){
                subWidthRHeight();
            }else{
                subHeightRWidth();
            } 
            console.log("2")
        }
//3.
        if(difX > 0 && difY > 0.00001){
            if (curveShape == "shape1"){
                addHeightRWidth();
            }else{
                addWidthRHeight();
            }
            console.log("3")
        }
//4.
        if(difX < 0 && difY > 0){
            if (curveShape == "shape1"){
                addHeightRWidth();
            }else{
                subWidthRHeight();
            }   
            console.log("4")
        } 
        console.log(curveShape)
    }




function car(){
// Bilen drejes 2,5 grader med eller mod uret afhængigt af, om man trykker A eller D.
if (keyIsDown(65)){
    angle -= 2.5
  }
if (keyIsDown(68)){
    angle += 2.5
}
// Laver en kraftvektor med en x og y komposant, hvis størrelser afhænger af bilens retning
let force = createVector(0, 0);
if (keyIsDown(87)){
    force = createVector(cos(angle)*accelFactor, sin(angle)*accelFactor);
}
if (keyIsDown(83)){
    force = createVector(cos(angle)*(-accelFactor), sin(angle)*(-accelFactor))
}
// Bilens hastighed tilføjes kraftvektoren og ganges med friktion
carVel.x -= force.x
carVel.y -= force.y
carVel.x *= friction
carVel.y *= friction

push();
translate(carPos.x,carPos.y);
if(angle>360){
    angle = 0
}
momentumDirection = createVector(carVel.x, carVel.y).normalize()
momentumAngle = momentumDirection.heading()
scoreCounter();
rotate(angle);
imageMode(CENTER);
image(carImg, 0, 0, 150, 100);
pop();

carPos.x += carVel.x
carPos.y += carVel.y
stroke('black')
origo.x = -carPos.x+width/2
origo.y = -carPos.y+height/2
accelFactor = 0.1 + dist(carPos.x,carPos.y,gX,gY)/25000
}

function scoreCounter(){
strokeWeight(2)
// Når bilens retning er ortogonal på sin momentum, gives det højeste antal score
// Samtidig afhænger den af bilens hastighed pr. sekund. Dette betyder, at man får score for at lave et drift
if(carOnRoad()){
score += Math.abs(sin(momentumAngle-angle-180)) * dist(0,0,carVel.x,carVel.y)
}
textSize(50)
stroke(255)
fill((1 - (10000 - score) / 10000) * 255, (10000 - score) * 255 / 10000, 0)
text(floor(score),0,-300)
}
function carOnRoad() {
    let minDist = Infinity; // Sættes til høj værdi så enhver ny værdi overskrider den
    // Gennemløb hvert punkt i 'points'-arrayet
    points.forEach(p => {
      let d = dist(carPos.x, carPos.y, p.x, p.y);
      if (d < minDist) {
        minDist = d;
      }
    });
    return minDist < roadWidth;
  }
// p5js har denne indbyggede funktion, som kaldes, når en knap på tastaturet trykkes
function keyPressed(){
    if (key === 'g' || key === 'G'){
        // Vil gå mellem true og false på hvert klik af 'g'
        debugMode = !debugMode
    }
}
// Kilde til bilbillede: https://www.v4b.co.uk/mercedes-benz-car-lease-deals/business/c-class/saloon-c220d-amg-line-premium-pan-roof-4dr-9g-tronic/