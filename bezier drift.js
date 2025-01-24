let points = []; let rootPoints = []; let newLayerList = [];
let listOfLists = [];
let allPPoints = [];
let checkClick;
let scrollSpeed = 1
//gør så man kan højreklikke uden en contextmenu popup
document.addEventListener('contextmenu', event => event.preventDefault());

function setup(){
    createCanvas(window.innerWidth,window.innerHeight)
}


let t = 0
let IsHolding = false
function draw(){
    t+=1/60*0.25;

translate(0,height-scrollSpeed)
clear(); 
lerpPoints();
    
    strokeWeight(5)
    if (mouseIsPressed){
    checkClick = true
    }
    if(checkClick == true){
if(!mouseIsPressed){
    rootPoints.push({x:floor(mouseX),y:floor(mouseY)});
    console.log(allPPoints)
        checkClick = false
        clear();
        allPPoints = []
        t=0
 }
}
for(let i = 0; i<rootPoints.length; i++){
    stroke(0)
    fill(0)
    circle(rootPoints[i].x, rootPoints[i].y,10)
}
for(let i = 1; i<rootPoints.length; i++){
    stroke(0)
    fill(0)
    line(rootPoints[i-1].x,rootPoints[i-1].y,rootPoints[i].x,rootPoints[i].y)
}


if (t >= 1) {
    t=1
    if(mouseButton===LEFT){
    t = 0
    clear();
    allPPoints = []
}
   }
for (let i = 1; i < allPPoints.length; i++) {
    let segment = i / allPPoints.length;
    stroke(segment * 255, 0, (1 - segment) * 255);
    strokeWeight(5)
    line(allPPoints[i-1].x,allPPoints[i-1].y,allPPoints[i].x,allPPoints[i].y)
   }
}
function lerpPoints(){

if (rootPoints.length < 3) return;
let layersLeft = rootPoints.length-1;
let points = rootPoints;
newLayerList = [];
while (layersLeft > 0){
    for(let i = 1; i < points.length; i++){
        let Px = lerp(points[i-1].x, points[i].x, t);
        let Py = lerp(points[i-1].y, points[i].y, t);
let P = {x:Px, y:Py};
newLayerList.push(P);
stroke(0,0,180,25)
strokeWeight(5)
line(points[i-1].x,points[i-1].y,points[i].x,points[i].y)
noStroke()
fill(0,0,0,50)
circle(points[i-1].x,points[i-1].y,10)
circle(points[i].x,points[i].y,10)
  }
  listOfLists.push(newLayerList)
  points = newLayerList
  newLayerList = []
  layersLeft--
 }
 if (points.length === 1) {
 allPPoints.push({x:points[0].x,y:points[0].y})
 }
}