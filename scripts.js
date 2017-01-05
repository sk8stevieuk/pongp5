
//Define variables
var x = 350;
var y = 200
var xspeed = 5;
var yspeed = 6;
var hit = false;

var player1 = 0;
var player2 = 0;

//Setup the canvas for p5
function setup() {
    createCanvas(710, 400);
    noCursor();
    
    bat = new rectangle(25, 25, 20, 80);
    bat2 = new rectangle(665, 25, 20, 80);
    ball = new circle(20);
}

//What is to be drawn on the p5 canvas
function draw() {
    
    background(0);
    
    stroke(255);
    strokeWeight(10);
    line(width/2,0,width/2,height);
    
    bat.display();
    bat.move();
    bat2.display();
    bat2.move();
    ball.display(x,y);
    ball.move();
    ball.collide();
    ball.collide2();
    
    fill(255);
    textSize(64);
    text(player1.toFixed(0), 275, 64);
    text(player2.toFixed(0), 400, 64);
    
}


//Setting up the bat object
function rectangle(x,y,w,h) {
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hit = false;
    
    this.display = function() {
        noStroke();
        rect(this.x,this.y,this.w,this.h);
    }  
    
    this.move = function() {
        if(keyIsPressed) {
            if(keyCode === DOWN_ARROW) {
                this.y = this.y + 5;
            }else if(keyCode === UP_ARROW) {
                this.y = this.y - 5;
            }
        }
    }
    
}

//Setting up the ball object
function circle(radius) {
    
    this.x = x;
    this.y = y;
    this.radius = radius;
    
    this.move = function() {
        x = x + xspeed;
        y = y + yspeed;
    
        //Detect if player 1 or 2 wins
        if(x > width) {
            fill(255);
            textSize(64);
            stroke(0);
            strokeWeight(2);
            text("Player 1 Wins!", 160,height/2);
            setTimeout(function(){
                clear();
            },3000);
            setTimeout(function(){
                x = 350;
                y = 200;
            },500);
            setTimeout(function(){
                player1 = player1 + 0.0325;
            },1);
        }else if(x < 1) {
            fill(255);
            textSize(64);
            stroke(0);
            strokeWeight(2);
            text("Player 2 Wins!", 160,height/2);
            setTimeout(function(){
                clear();
            },3000);
            setTimeout(function(){
                x = 350;
                y = 200;
            },500);
            setTimeout(function(){
                player2 = player2 + 0.0325;
            },1);
        }
        
        
        //Bounce of the walls at top and bottom
        if(y > height) {
            yspeed = -6;
        }else if(y < 1) {
            yspeed = 6;
        }
    }
    
    this.collide = function() {
        if(this.x === bat.x + bat.w && this.y > bat.y && this.y < bat.y+bat.h) {
            xspeed = 5;
            console.log("hit");
        }
    }
    
    this.collide2 = function() {
        if(this.x === bat2.x - bat2.w && this.y > bat2.y && this.y < bat2.y+bat2.h) {
            xspeed = -5;
            console.log("hit");
        }
    }
    
    this.display = function() {
        this.x = x;
        this.y = y;
        
        noStroke();
        ellipse(this.x,this.y,radius,radius);
    }
    
}