let t,p0,p1,p2,p3,A,B,C,D,E,P
function setup() {
createCanvas(1280, 720)
p0 = {x:400,y:200}
p1 = {x:800,y:500}
p2 = {x:1200,y:200}
t=0
stroke(0)
strokeWeight(10)
}
function draw(){
clear();
t += 0.005
A = {
    x: lerp(p0.x, p1.x, t),
    y: lerp(p0.y, p1.y, t),
  };

  B = {
    x: lerp(p1.x, p2.x, t),
    y: lerp(p1.y, p2.y, t),
  };

  D = {
    x: lerp(A.x, B.x, t),
    y: lerp(A.y, B.y, t),
  };
stroke('black')
line(p0.x,p0.y,p1.x,p1.y);
line(p1.x,p1.y,p2.x,p2.y);
fill('red');
noStroke();
circle(D.x,D.y,10)

if(t>1){
    t=0
 }
}