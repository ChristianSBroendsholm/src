let Points = []; 
let A = {x:0, y:600}; //statisk
let B = {x:600, y:500}; //statisk
let C = {x:0, y:0}; //dynamisk punkt
let dragA, dragB;
let scrollSpeed = 0
function setup(){
    createCanvas(window.innerWidth,window.innerHeight)
    background('lightgrey')
}
document.addEventListener('contextmenu', event => event.preventDefault());
let t = 0
let IsHolding = false

function draw(){
    clear(); 
    strokeWeight(5)
    t+=0.005;
  scrollSpeed +=1
  A.x = -scrollSpeed;A.y = scrollSpeed;
  B.x = -scrollSpeed;B.y = scrollSpeed;
  C.x = -scrollSpeed;C.y = scrollSpeed;
  translate(scrollSpeed,0)
  if (keyIsDown(65)){
    B.y += 20
  }
    if (keyIsDown(68)){
    B.y -= 20
  }
  
    if(IsHolding == true){
        C.x = mouseX
        C.y = mouseY
    }
    //Hvis man holder venstreklik kan man rykke punkterne
    if(mouseIsPressed && mouseX > A.x - 10 / 2 &&
        mouseX < A.x + 10 / 2 &&
        mouseY > A.y - 10 / 2 &&
        mouseY < A.y + 10 / 2 ){
dragA = true
        }
        if(dragA === true){
            A.x = mouseX
            A.y = mouseY
            if(!mouseIsPressed){
                dragA=false;
            }
        }
        if(mouseIsPressed && mouseX > B.x - 10 / 2 &&
            mouseX < B.x + 10 / 2 &&
            mouseY > B.y - 10 / 2 &&
            mouseY < B.y + 10 / 2 ){
    dragB = true
            }
            if(dragB==true){
                B.x = mouseX
                B.y = mouseY
                if(!mouseIsPressed){
                    dragB=false;
                }
            }

    let dX = lerp(A.x,C.x,t)
    let dY = lerp(A.y,C.y,t)
    let eX = lerp(C.x,B.x,t)
    let eY = lerp(C.y,B.y,t)
    let gX = lerp(dX,eX,t)
    let gY = lerp(dY,eY,t)
    Pg = {x:gX, y:gY} //objekt for bezierkurvens punkter
    Points.push(Pg)//sætter x- og y værdier i et array

    //tegner en linje mellem Points listens index x og y værdier -1 og den nuværende
   for (let i = 1; i < Points.length; i++) {
    stroke('red')
    line(Points[i-1].x,Points[i-1].y,Points[i].x,Points[i].y)
   }

   stroke('black')
   line(A.x,A.y,C.x,C.y)
   line(B.x,B.y,C.x,C.y)
   stroke('blue')
   //line(dX,dY,eX,eY)

   stroke('black')
   strokeWeight(2)
   fill('white')
   circle(A.x,A.y,10)
   circle(B.x,B.y,10)
   circle(C.x,C.y,10)
   fill('black')
   circle(dX,dY,10)
   circle(eX,eY,10)
   fill('white')
   circle(gX,gY,10)


   if (t >= 1) {
    //t = 0
    //Points = []
    //clear()
   }

function mousePressed(){
    if (mouseButton == "right"){
        IsHolding = true
    }
}

function mouseReleased(){
    if (mouseButton == "right"){
        clear();
        Points = []
        t = 0
        IsHolding = false
    }
  }
}