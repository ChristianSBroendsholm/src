let Points = []
let A,B,C
function setup(){
    createCanvas(window.innerWidth,window.innerHeight)
    background('lightgrey')
A = {x:width/2, y:height*3/4}; //statisk
B = {x:width/2, y:height*3/4}; //statisk
C = {x:400, y:200}; //dynamisk punkt
}

let t = 0
let IsHolding = false

function draw(){
    console.log(C.x)
    console.log(C.y)
    clear(); 
    strokeWeight(5)
    t+=0.0005;

    if(IsHolding == true){
        C.x = mouseX
        C.y = mouseY
    }

    let dX = lerp(A.x,C.x*cos(frameCount/10),t)
    let dY = lerp(A.y,C.y*sin(frameCount/10),t)
    let eX = lerp(C.x*cos(frameCount/10),B.x,t)
    let eY = lerp(C.y*sin(frameCount/10),B.y,t)
    let gX = lerp(dX,eX,t)
    let gY = lerp(dY,eY,t)
    Pg = {x:gX, y:gY} //det punkt man er interesseret i.
    Points.push(Pg)

    //console.log(Points.length)
   for (let i = 1; i < Points.length; i++) {
    console.log(C.x)
    stroke('red')
    line(Points[i-1].x,Points[i-1].y,Points[i].x,Points[i].y)
   }

   //stroke('black')
   //line(A.x,A.y,C.x,C.y)
   //line(B.x,B.y,C.x,C.y)
   //stroke('blue')
   //line(dX,dY,eX,eY)

   stroke('black')
   strokeWeight(2)
   fill('blue')
   circle(A.x,A.y,10)
   fill('magenta')
   circle(B.x,B.y,10)
   fill('yellow')
   circle(C.x,C.y,10)
   fill('cyan')
   circle(dX,dY,10)
   fill('lightgrey')
   circle(eX,eY,10)
   fill('lightgrey')
   circle(eX,eY,10)
   fill('white')
   circle(gX,gY,10)


   if (t >= 1) {
    t = 0
    Points = []
    clear()
   }
}

function mousePressed(){
    if (mouseButton == "left"){
        IsHolding = true
    }
}

function mouseReleased(){
    if (mouseButton == "left"){
        clear();
        Points = []
        t = 0
        IsHolding = false
    }
}