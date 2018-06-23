

var x = 0;
var y = 0;
var dx;
var dy;

var w = 100;
var h = w;

var canvasW = 900;
var canvasH = 600;

//var timeCounter = 0;
//var stopGame = false;
var gameRunning = true;
var canvas;

var robots = [];

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
  
  var robot = new Robot(20, 20, 100, 100, color(219, 0, 0));
  robots.push(robot);
  
  //background(0, 67, 90);
}



// Function for moving object
var drawShape = function(nx, ny, nw, nh){

    fill(218, 126, 57);
    rect(nx, ny, nw, nh);
};

// Function for robot
var Robot = function(nx, ny, nw, nh, color){


    this.x = nx;
    this.y = ny;
    
    
    this.w = nw;
    this.h = nh;
    this.l = 0;
    
    this.dx = 0;
    this.dy = 0;
    
    this.isMoving = true;
    this.timeCounter = 0;
    
    this.color = color;

};

Robot.prototype.draw = function() {

    // Bounding rectangle
    //fill(53, 04, 130);
    //rect(this.x , this.y, this.w, this.h);
    
    
    var cx = this.x + this.w/2;
    var cy = this.y + this.h/2;
    this.l = (this.w + this.h)/4 ;

    
    //Arms
    stroke(this.color);
    strokeWeight(this.l/6);
    line(cx, cy-this.l/3, cx-this.l*0.9, cy);
    line(cx, cy-this.l/3, cx+this.l*0.9, cy);
    line(cx+this.l*0.9, cy, cx+this.l*0.9, cy-this.l/3);
    line(cx-this.l*0.9, cy, cx-this.l*0.9, cy-this.l/3);
    
    noStroke();
    fill(this.color);
    arc(cx+this.l*0.9,cy-this.l*(2/5),this.l/3,this.l/4,-45,225);
    arc(cx-this.l*0.9,cy-this.l*(2/5),this.l/3,this.l/4,-45,225);
    
    //Head
    rect(cx - this.l/3, cy-(11*this.l)/10, (2/3)*this.l, this.l/2, 8);
    ellipse(cx,cy-this.l,this.l/2,this.l/2);
    rect(cx-this.l/10, cy-(6*this.l)/10, this.l/5, this.l/10);
    fill(201, 201, 201);
    rect(cx-this.l/6, cy-(9/12)*this.l, this.l/3, this.l/12, 10);
    
    //Body
    fill(this.color);
    rect(cx-this.l/2, cy-this.l/2, this.l, this.l, 8);
    fill(255, 248, 51);
    rect(cx-this.l*(2/6), cy-this.l/3, this.l/3, this.l/10, 4);
    fill(255, 157, 0);
    rect(cx-this.l*(2/6), cy-this.l/6, this.l*(2/3), this.l/20, 4);
    
    fill(209, 209, 209);
    ellipse(cx-this.l/6,cy-(4*this.l)/10, this.l/20, this.l/20);
    ellipse(cx+this.l/6,cy-(4*this.l)/10,this.l/20,this.l/20);
    
    //Legs
    fill(this.color);
    rect(cx-this.l/3, cy+this.l/2, this.l/5, this.l*0.6);
    rect(cx+this.l/3-this.l/5, cy+this.l/2, this.l/5, this.l*0.6);
    rect(cx-this.l/2, cy+this.l, this.l/3, this.l/10, 4);
    rect(cx+this.l/3-this.l/5, cy+this.l, this.l/3, this.l/10, 4);
    
    //Left eye
    fill(255, 255, 255);
    ellipse(cx-this.l/6,cy-(9*this.l)/10, this.l/10, this.l/10);
    fill(255, 166, 0);
    ellipse(cx-this.l/6,cy-(9*this.l)/10, (3/40)*this.l, (3/40)*this.l);
    
    //Right eye
    fill(255, 255, 255);
    ellipse(cx+this.l/6,cy-(9*this.l)/10,this.l/10,this.l/10);
    fill(255, 166, 0);
    ellipse(cx+this.l/6,cy-(9*this.l)/10, (3/40)*this.l, (3/40)*this.l);
    
    this.animate();
    
};

Robot.prototype.animate = function() {

   if(this.isMoving){
       
	 // Changes speed after a certain time
        if(this.timeCounter % 100 === 0){
            this.dx = round(random(-5, 15));
            this.dy = round(random(-5, 15));
        
        // Makes sure ball does not slow down
            if(this.dx >= -1 && this.dx <= 1){
                this.dx = this.dx + 4;
            }
            if(this.dy >= -1 && this.dy <= 1){
                this.dy = this.dy + 4;
            }
        }
   
     // Prevents object from going outside the window
        if(this.x < 0 || this.x + this.dx + this.w > canvasW){
            this.dx = -this.dx;
        }
        
        if(this.y < 0 || this.y + this.dy + this.h > canvasH){
            this.dy = -this.dy;
        }
    
    /*
     x = x + dx;
     y = y + dy;
    */
        this.move(this.dx, this.dy);
        this.timeCounter ++;
    
        // Ensures timeCounter does not get too big
        if(this.timeCounter > 1000){ this.timeCounter = 0; }
    
    }else{ // You won, so stop the game
    }
};

Robot.prototype.mouseAction = function() {
    
    var buttonHover = mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    
    /*
    // For highlighting buttons when passed over
    // Within button + button not highlighted -> highlight button
    if(buttonHover && !this.buttonStates[0]){
      this.buttonStates[0] = true;
      
      var col = changeColor(0, 0, 0, -50, this.inColor);
      this.inColor = col;
      
    // NOT Within button + button highlighted -> UN-highlight button  
    }else if (!buttonHover && this.buttonStates[0]){
      this.buttonStates[0] = false;  
      
      var col = changeColor(0, 0, 0, 50, this.inColor);
      this.inColor = col;
    }
    */
    
    // If button is pressed once, start playing sound
    // Mouse Click + Within robot + robot not stopped yet -> stop robot
    if(mouseIsPressed && buttonHover){
        this.dx = 0; 
        this.dy = 0;
        this.isMoving = false;
      
    }
    

};


function draw () {
   
   background(0, 67, 90);
   
   textSize(20);
   fill(255, 255, 255);
   text("Level " + robots.length, canvasW - 100, 20 );
   text("Wait for all robots to start moving...",5, canvasH - 7);
   
   
   gameRunning = false;
   for(var i = 0; i < robots.length; i++){
       gameRunning = gameRunning || robots[i].isMobile();
   }
   
   
    if(gameRunning){
        
        
       
       
        for(var i = 0; i < robots.length; i++){
            robots[i].draw();
            robots[i].mouseAction();
        }   
        
    }else if(robots.length != 8){  // Game is not running, all robots have stopped

       fill(92, 214, 88);
       strokeWeight(7);
       rect(canvasW/2 - 80*2, canvasH/2 - 75, 310, 110);
       
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
         restart();	   
	   
	   
	   // Continue Game
	   if(mouseIsPressed   &&   
	      mouseX > canvasW/2 - 73*2 && mouseX < canvasW/2 - 73*2 + 280  &&  
		  mouseY > canvasH/1.2      && mouseY < canvasH/1.2 + 60)
         proceed();	
		 
		 
        // Set limit for robots
   }else{
        fill(141, 188, 188);
        rect(25, 25, canvasW - 50, canvasH - 50);
        
        
        // Text
        
        var initX = 50;
        var initY = 55;
        fill(color(round(random(0, 256)), round(random(0, 256)), round(random(0, 256))));
        text("CONGRATULATIONS!", initX , initY);
        fill(95, 59, 123);
        text("You've reached the end of the game!", initX , initY+40*1);
        text("You can keep on playing in endless mode by clicking the button below.", initX , initY + 40*2);
        text("However, be warned that the speed at which the robots move will be decreased", initX , initY + 40*3);
        text("greatly as the number of robots on the screen increases.", initX , initY + 40*4);
        
        text("THANK YOU FOR PLAYING!", initX + 90, initY + 40*7);
        
        // CONTINUE button
        fill(78, 75, 93);       
        rect( canvasW/2 - 73*2, canvasH/1.2 , 280, 60);
	    fill(27, 225, 210);       
        rect( canvasW/2 - 73*2 + 2, canvasH/1.2 + 2, 280-4, 60-4);
	    fill(27, 62, 178);
        textSize(23);
	    text(" CONTINUE ",canvasW/2.4, canvasH/1.11);
        
        
        if(mouseIsPressed   &&   
	      mouseX > canvasW/2 - 73*2 && mouseX < canvasW/2 - 73*2 + 280  &&  
		  mouseY > canvasH/1.2      && mouseY < canvasH/1.2 + 60)
          proceed();	
   }
       
};





Robot.prototype.move = function(dx, dy) {

    this.x = this.x + dx;
    this.y = this.y + dy;
    
};

Robot.prototype.isMobile = function() {

    return this.isMoving;
    
};

Robot.prototype.energize = function() {

    this.isMoving = true;
    
};

Robot.prototype.getX = function() {

    return this.x;
    
};

Robot.prototype.getY = function() {

    return this.y;
    
};



Robot.prototype.getWidth = function() {

    return this.w;
    
};

Robot.prototype.getHeight = function() {

    return this.h;
    
};

Robot.prototype.changeSize = function(newSize) {

    this.w = newSize;
    this.h = newSize;
    
};

/*
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
*/

var restart = function() {
    //fill(144, 214, 90);
    //rect(100,100,100,100);
    
    
   for(var i = 0; i < robots.length; i++){
       robots[i].energize();
       robots[i].changeSize(100 - 5 * robots.length);
   }
   
   gameRunning = true;

};

var proceed = function() {
    var newX = round(random(50, canvasW - 110));
    var newY = round(random(50, canvasH - 110));
    var col = color(round(random(0, 256)), round(random(0, 256)), round(random(0, 256)));
    
    var newRobot = new Robot(newX, newY, 100, 100, col);
    robots.push(newRobot);
    
    restart();

};



//restart();

