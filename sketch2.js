let p0,p1,p2
function setup() {
createCanvas(1280, 720)
stroke(0)
strokeWeight(10)
p0 = createVector(width/4, height/2);
p2 = createVector(width*3/4, height/2)
}
function draw(){
p1 = createVector(mouseX, mouseY);
background(255)
for(let t=0;t<=1;t+=0.001){
    let x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
    let y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
    point(x, y);
 }
 strokeWeight(15);
 stroke(255, 0, 0);
 point(p0.x, p0.y);
 point(p1.x, p1.y);
 point(p2.x, p2.y);

 strokeWeight(2);
 //line(p0.x, p0.y, p1.x, p1.y);
 //line(p1.x, p1.y, p2.x, p2.y);
}