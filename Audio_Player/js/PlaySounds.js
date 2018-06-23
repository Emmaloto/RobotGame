// https://github.com/processing/p5.js/wiki/Positioning-your-canvas#making-the-canvas-fill-the-window
// Audio_Player

var canvasW = 1000;
var canvasH = 600;

var buttons = [];
var sounds = [];
var songName;

var printX = 210;
var printY = 10;
var cdx = 0;
//var crocus, gerbera, hya, narc, poppy, rose, tulip;
var musicIcon;
var canvas;

var mySound;
var newTile;


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function preload(){
    
    musicIcon = loadImage("img/megaphone.png");
    
    mySound = loadSound('audio/sick-dance-bass.wav');
    sounds.push(mySound);
    
    mySound = loadSound('audio/catchy-instrumental.wav');
    sounds.push(mySound);
    
    mySound = loadSound('audio/triplebel-3.wav');
    sounds.push(mySound);
    
    mySound = loadSound('audio/sydance5-123bpm.wav');
    sounds.push(mySound);
    
    mySound = loadSound('audio/fantasy-orchestra.wav');
    sounds.push(mySound);
    
    mySound = loadSound('audio/groove-music.wav');
    sounds.push(mySound);
    
    mySound = loadSound('audio/strings-piano.wav');
    sounds.push(mySound);
    
    mySound = loadSound('audio/death-disco.wav');
    sounds.push(mySound);
    
    mySound = loadSound('audio/symphony-sounds.wav');
    sounds.push(mySound);    
    
    songName = ["Dance Bass", "Guitar Instrumental", "Happy Bells", "Dance", 
                             "Fantasy Orchestra", "Light Piano", "Piano Strings", "Death Disco", "Symphony"];
  
}

function setup() {
  canvas = createCanvas(canvasW, canvasH);
  centerCanvas();
  background(127, 174, 208);

  setGrid();
}


    
    
// Button Type Definition

/*
buttonStates Breakdown
0 - mouseHover
1 - buttonIsPressed
2 - soundIsPlaying
*/

var MusicTile = function(x, y, w, h, border, inColor, outColor, photo, sound, songName) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.b = border;
    
    this.inColor = inColor;
    this.outColor = outColor;
    
    this.photo = photo;
    this.sound = sound;
    
    this.buttonStates = [false, false, false];
    this.name = songName;
};

// Drawing the button
MusicTile.prototype.draw = function() {

    fill(this.inColor);
    rect(this.x, this.y, this.w, this.h);
    
    image(this.photo, this.x + this.w/2 - this.photo.width/2, this.y + this.h/2 - this.photo.height/2, this.photo.width, this.photo.height);
    
    // Name of File
    fill(50);
    textSize(20);
    text(this.name, this.x + 5, this.y + this.h - 10);
    
    // Duration
    textSize(18);
    text(getTimeString(this.sound.duration()), this.x + this.w - 50, this.y + 20);
    
    // If audio is playing
    if(this.buttonStates[2])
        text(getTimeString(this.sound.currentTime()) + "/", this.x + this.w - 100, this.y + 20);

};


// Set button mouse actions
MusicTile.prototype.mouseAction = function() {
    
    var buttonHover = mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    
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
    
    
    // If button is pressed once, start playing sound
    // Mouse Click + Within button + button not changed yet -> change color, play sound
    if(mouseIsPressed && buttonHover){
      if(!this.buttonStates[1] ){
        this.buttonStates[1] = true;
        this.buttonStates[2] = true;
      
        this.inColor = color(255, 255, 255);
      
        this.sound.setVolume(0.5);
        this.sound.play();
        
      // Button pressed again after 1s, stop playing sound  
      }else if(this.buttonStates[1] && this.sound.currentTime() > 1){
          this.sound.stop();
      }
    
    }

    // If sound stops playing, change color
    // Mouse NOT Clicked + button is pressed + sound not playing -> change color
     if (!mouseIsPressed && this.buttonStates[1] && !this.sound.isPlaying()){
       this.buttonStates[1] = false;  
       this.buttonStates[2] = false;
       this.inColor = color(97, 108, 63);
    }

};


function changeColor(dr, dg, db, da, orgColor ) {
    
  var r = red(orgColor);
  var g = green(orgColor);
  var b = blue(orgColor);
  var a = alpha(orgColor);
  
  return color(r + dr, g + dg, b + db, a + da);
  
}

function getTimeString(time){
    var min  = Math.floor(time/60);
    var secs = (time/60 - Math.floor(time/60)) * 60;
    var separator;
    
    if(secs >= 10)separator = ":";
    else          separator = ":0";
    
    return min + separator + Math.trunc(secs);
}



function setGrid(){
    var inC  = color(63, 255, 182);
    var outC = color(173, 54, 173);

    var lineCol = 3;
    var lineRow = 3;
    
    var xPosChange = canvasW/lineCol;
    var yPosChange = canvasH/lineRow;
    
    var lastSound = sounds[sounds.length - 1];
   
   // Create tiles, and inserts last sound multiple times if sound array is too short
    var arrayPos = 0;
    for(var y = 0; y < lineCol; y++)
        for(var x = 0; x < lineRow; x++){
            var soundInsert = null;
            var clipName = "";
            
            if(arrayPos >= sounds.length) soundInsert = lastSound;
            else                          soundInsert = sounds[arrayPos];
            
            if(arrayPos >= songName.length) clipName = "";
            else                            clipName = songName[arrayPos];         
            
            var newTile = new MusicTile(xPosChange * x, yPosChange * y, canvasW/3, canvasH/3, 1, 
                                            inC, outC, musicIcon, soundInsert, clipName);
                                            
            buttons.push(newTile);
            arrayPos++;
        }
       
}


function draw () {

    background(127, 174, 208);
    for(var b = 0; b < buttons.length; b++){
        buttons[b].mouseAction();
        buttons[b].draw();
    }
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