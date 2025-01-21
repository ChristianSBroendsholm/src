let t,p0,p1,p2,p3,A,B,C,D,E,P
function setup() {
createCanvas(1280, 720)
p0 = {x:400,y:200}
p1 = {x:800,y:500}
p2 = {x:1200,y:200}



stroke(0)
strokeWeight(10)
}
function draw(){
background(255)
t =+ 0.005
A = lerp(p0,p1,t)
B = lerp(p1,p2,t)
D = lerp(A,B,t)

line(p0.x,p0.y,p1.x,p1.y)
line(p1.x,p1.y,p2.x,p2.y)
fill('red')
circle(p0.x*t,p0.y*t,10)
circle(D)

if(t>1){
    t=0
}
}