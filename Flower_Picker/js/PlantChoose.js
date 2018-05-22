// https://github.com/processing/p5.js/wiki/Positioning-your-canvas#making-the-canvas-fill-the-window


var canvasW = 1000;
var canvasH = 600;

var buttons = [];

var printX = 210;
var printY = 10;
var cdx = 0;
var crocus, gerbera, hya, narc, poppy, rose, tulip;
var canvas;


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function preload(){
  crocus  = loadImage("img/flowers/crocus.jpg");
  gerbera = loadImage("img/flowers/gerbera.jpg");
  hya     = loadImage("img/flowers/hyacinth.jpg");
  narc    = loadImage("img/flowers/Narcissus.jpg");
  poppy   = loadImage("img/flowers/poppy-3243049_1920.jpg");
  rose    = loadImage("img/flowers/rose-3063284_1920.jpg");
  tulip   = loadImage("img/flowers/tulip-3024741_1920.png"); 
  
  //imageTest = loadImage(";https://lh3.googleusercontent.com/wyxqlG83ccFkFPyieIPGn8xOVpmdzlF5UXNb_BPkqOra1Ryn6s8Xq7G3X1YX-mGtlvIIh0Csd8-oJ_BizHL7Otbz3eygnHdTXxF1VWw=s660");
}

function setup() {
  canvas = createCanvas(canvasW, canvasH);
  centerCanvas();
  background(127, 174, 208);
  //fill(255, 0, 255);
  line(1, 1, 0, canvasW);
  line(1, 1, canvasH, 0);
  
  line(canvasW, canvasH, 0, canvasW);
  //line(canvasW, canvasH, canvasH, 0);  
  
  
  //imageTest = loadImage('about.jpg');
  defineButtons();
  
}


    
    
// Button Type Definition

/*
buttonStates Breakdown
0 - mouseHover
1 - mouseisPressed
2 - mouseHasBeenClicked
*/

var Button = function(x, y, w, h, border, inColor, outColor, text, textSize, photo) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.b = border;
    this.size = textSize;
    
    this.inColor = inColor;
    this.outColor = outColor;
    this.buttonText = text;
    this.buttonStates = [false, false, false];
    
    this.photo = photo;
    this.scaling = photo.width/photo.height;
};

// Drawing the button
Button.prototype.draw = function() {
    noFill();
    
    fill(this.outColor);    
    rect(this.x, this.y, this.w, this.h, 10);
    fill(this.inColor);
    
    rect(this.x + this.b, this.y + this.b, this.w - this.b*2, this.h - this.b*2, 10);
    
    fill(0, 0, 0);
    var l = this.buttonText.length;
    //text("" + l, 200, 250);
    textSize(this.size);
    //textSize( (this.w + this.h)/20 );
    text(this.buttonText, this.x + (this.w)/3 - l , this.y + this.h/1.7);
    

};


// Set button mouse actions
Button.prototype.mouseAction = function() {
    
    var buttonHover = mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    
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
    
    var pw = this.photo.width;
    var ph = this.photo.height;
    
    //text("FOR  " + this.buttonText + " Width: " + pw + "  Height: " + ph + "--Ratio:" + pw/ph , printX, printY);
    printY = printY + 20;
    
    // Mouse Click + Within button + button not changed yet -> Enlarge border
    if(mouseIsPressed && buttonHover && !this.buttonStates[1]){
      this.buttonStates[1] = true;
      this.b = this.b + 4;
      
      this.buttonStates[2] = true;
      
    // Mouse NOT Clicked + button state WAS changed -> Reset border
    }else if (!mouseIsPressed && this.buttonStates[1]){
      this.buttonStates[1] = false;  
      this.b = this.b - 4;
      
    // Mouse is pressed NOT inside button -> Stop displaying picture
    }else if(mouseIsPressed & !buttonHover){
      this.buttonStates[2] = false;  
    }


};


function changeColor(dr, dg, db, da, orgColor ) {
    
  var r = red(orgColor);
  var g = green(orgColor);
  var b = blue(orgColor);
  var a = alpha(orgColor);
  
  return color(r + dr, g + dg, b + db, a + da);
  
}



function defineButtons(){
    var inC  = color(235, 195, 235);
    var outC = color(173, 54, 173);
    var initY = 10;
    
    var narcSelect   = new Button(50, initY,               130, 70, 10, inC, outC, "Narcissus", 15, narc);
    buttons.push(narcSelect);
    
    var poppySelect  = new Button(50, initY + (60 + 20)*1, 130, 70, 10, inC, outC, "Poppy", 15, poppy);
    buttons.push(poppySelect);
    
    var roseSelect   = new Button(50, initY + (60 + 20)*2, 130, 70, 10, inC, outC, "Rose", 15, rose);
    buttons.push(roseSelect);
    
    var tulipSelect  = new Button(50, initY + (60 + 20)*3, 130, 70, 10, inC, outC, "Tulip", 15, tulip);
    buttons.push(tulipSelect);
    
    var crocusSelect = new Button(50, initY + (60 + 20)*4, 130, 70, 10, inC, outC, "Crocus", 15, crocus);
    buttons.push(crocusSelect);
    
    var gerSelect    = new Button(50, initY + (60 + 20)*5, 130, 70, 10, inC, outC, "Gerbera", 15, gerbera);
    buttons.push(gerSelect);
    
    var hyaSelect    = new Button(50, initY + (60 + 20)*6, 130, 70, 10, inC, outC, "Hyacinth", 15, hya);
    buttons.push(hyaSelect);    
}


function draw () {

    background(127, 174, 208);
    
    for(var i = 0; i < buttons.length; i++){
        buttons[i].mouseAction();
        buttons[i].draw();
        
        if(buttons[i].buttonStates[2])
          if(buttons[i].scaling > 2)  
            image(buttons[i].photo, 200, 300, 800, 800/(buttons[i].scaling));  
          else
            image(buttons[i].photo, 200, 20, 600, 600/buttons[i].scaling);  // Default for > 1.9 scale
      //
      
      //text(buttons[1].photo.pixels.length, 100, 100);
    }
    
    printY = 10;
}
/*

function mousePressed() {
  for(var i = 0; i < buttons.length; i++){
      var buttonHover = mouseX > buttons[i].x && 
                        mouseX < buttons[i].x + buttons[i].w && 
                        mouseY > buttons[i].y && 
                        mouseY < buttons[i].y + buttons[i].h;
      image(buttons[i].photo, 200, 200);
    }  
}
*/