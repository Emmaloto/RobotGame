

var x = 0;
var y = 0;
var dx;
var dy;

var w = 100;
var h = w;

var canvasW = 900;
var canvasH = 600;

var timeCounter = 0;
var stopGame = false;
var canvas;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

// Set canvas size
function setup() {
  canvas = createCanvas(canvasW, canvasH);
  //canvas.parent('sketch-holder');
  centerCanvas();
  line(1, 1, 0, canvasW);
  line(1, 1, canvasH, 0);
}



// Function for moving object
var drawShape = function(nx, ny, nw, nh){

    fill(218, 126, 57);
    rect(nx, ny, nw, nh);
};

// Function for robot
var drawRobot = function(nx, ny, nw, nh){

    var l = (nw + nh)/4 ;

	var x = nx + w/2;
    var y = ny + h/2;
	
    //Arms
    stroke(219, 0, 0);
    strokeWeight(l/6);
    line(x, y-l/3, x-l*0.9, y);
    line(x, y-l/3, x+l*0.9, y);
    line(x+l*0.9, y, x+l*0.9, y-l/3);
    line(x-l*0.9, y, x-l*0.9, y-l/3);
    
    noStroke();
    fill(219, 0, 0);
    arc(x+l*0.9,y-l*(2/5),l/3,l/4,-45,225);
    arc(x-l*0.9,y-l*(2/5),l/3,l/4,-45,225);
    
    //Head
    rect(x - l/3, y-(11*l)/10, (2/3)*l, l/2, 8);
    ellipse(x,y-l,l/2,l/2);
    rect(x-l/10, y-(6*l)/10, l/5, l/10);
    fill(201, 201, 201);
    rect(x-l/6, y-(9/12)*l, l/3, l/12, 10);
    
    //Body
    fill(219, 0, 0);
    rect(x-l/2, y-l/2, l, l, 8);
    fill(255, 248, 51);
    rect(x-l*(2/6), y-l/3, l/3, l/10, 4);
    fill(255, 157, 0);
    rect(x-l*(2/6), y-l/6, l*(2/3), l/20, 4);
    
    fill(209, 209, 209);
    ellipse(x-l/6,y-(4*l)/10, l/20, l/20);
    ellipse(x+l/6,y-(4*l)/10,l/20,l/20);
    
    //Legs
    fill(219, 0, 0);
    rect(x-l/3, y+l/2, l/5, l*0.6);
    rect(x+l/3-l/5, y+l/2, l/5, l*0.6);
    rect(x-l/2, y+l, l/3, l/10, 4);
    rect(x+l/3-l/5, y+l, l/3, l/10, 4);
    
    //Left eye
    fill(255, 255, 255);
    ellipse(x-l/6,y-(9*l)/10, l/10, l/10);
    fill(255, 166, 0);
    ellipse(x-l/6,y-(9*l)/10, (3/40)*l, (3/40)*l);
    
    //Right eye
    fill(255, 255, 255);
    ellipse(x+l/6,y-(9*l)/10,l/10,l/10);
    fill(255, 166, 0);
    ellipse(x+l/6,y-(9*l)/10, (3/40)*l, (3/40)*l);
};

var debugText = function(){
    fill(0, 34, 255);
    text("x: " + x, 100, 100);
    text("y: " + y, 100, 120);
    text("dx: " + dx, 100, 140);
    text("dy: " + dy, 100, 160);
    
    //text(x < 0 && x + dx + w/2 > 400, 200, 200);
    
    text("Counter: " + timeCounter, 100, 200);
    text(stopGame, 100, 220);
    text(!stopGame, 100, 240);
};

var restart = function() {
    fill(144, 214, 90);
    rect(100,100,100,100);
    if(true){
        draw();
        
    }

};


draw = function() {
   
   background(0, 67, 90);
   fill(78, 64, 230);
   rect(4, 4, canvasW-4, canvasH-4);
   
   
   if(!stopGame){
     
	 // Changes speed after a certain time
     if(timeCounter % 100 === 0){
        dx = round(random(-10, 10));
        dy = round(random(-10, 10));
        
        // Makes sure ball does not slow down
        if(dx >= -1 && dx <= 1){
            dx = dx + 4;
        }
        if(dy >= -1 && dy <= 1){
            dy = dy + 4;
        }
     }
   
     // Prevents object from going outside the window
     if(x < 0 || x + dx + w > canvasW){
        dx = -dx;
     }
        
     if(y < 0 || y + dy + h > canvasH){
        dy = -dy;
     }
    
     x = x + dx;
     y = y + dy;
    
    
    
     // If you catch the box
     if(mouseIsPressed && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
        dx = 0; 
        dy = 0;
        stopGame = true;
     }
    
     timeCounter ++;
    
    // Ensures timeCounter does not get too big
    if(timeCounter > 1000){ timeCounter = 0; }
    
   }else{ // You won, so stop the game
       fill(92, 214, 88);
       strokeWeight(7);
       rect( canvasW/2 - 80*2, canvasH/2 - 75, 310, 110);
       
       strokeWeight(1);
       fill(7, 117, 60);
       textSize(46);
       text("YOU WON!!", canvasW/2 - 66*2,canvasH/2 );
       
	   // Play Again - border, fill, text
       fill(255, 0, 0);       
       rect( canvasW/2 - 73*2, canvasH/1.6 , 280, 60);
	   fill(255, 130, 0);       
       rect( canvasW/2 - 73*2 + 2, canvasH/1.6 + 2, 280-4, 60-4);
	   fill(191, 0, 78);
	   text(" PLAY AGAIN ",canvasW/4.2 + 83, canvasH/1.45 + 2);
	   
	   // CONTINUE - border, fill, text
       fill(255, 0, 0);       
       rect( canvasW/2 - 73*2, canvasH/1.2 , 280, 60);
	   fill(78, 130, 230);       
       rect( canvasW/2 - 73*2 + 2, canvasH/1.2 + 2, 280-4, 60-4);
	   fill(191, 0, 78);
	   text(" CONTINUE ",canvasW/3.8 + 60, canvasH/1.1 + 2);
	   
	   // Play Game Again
	   if(mouseIsPressed   &&   
	      mouseX > canvasW/2 - 73*2 && mouseX < canvasW/2 - 73*2 + 280  &&  
		  mouseY > canvasH/1.6      && mouseY < canvasH/1.6 + 60)
         stopGame = false;	   
	   
	   
	   // Continue Game
	   if(mouseIsPressed   &&   
	      mouseX > canvasW/2 - 73*2 && mouseX < canvasW/2 - 73*2 + 280  &&  
		  mouseY > canvasH/1.2      && mouseY < canvasH/1.2 + 60)
         stopGame = false;
		 
		 
   }
   
   
   fill(78, 130, 230);
   //drawShape(x, y, w, h);
   drawRobot(x, y, w, h);
   //debugText();
   
   
       
};



//restart();

