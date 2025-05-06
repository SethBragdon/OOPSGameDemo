//alert('hello world!');

let canvas = document.getElementById('canvas');
canvas.height = 400;
canvas.width = 400;

let brush = canvas.getContext('2d');
brush.fillStyle = 'black';
brush.fillRect(0, 0, canvas.width, canvas.height);

class sprite {
    constructor(height, width, color, xPos, yPos, xSpeed, ySpeed, image = null){
        this.height = height;
        this.width = width;
        this.color = color;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.image = image;
        
        if(this.image != null){
            this.image = document.createElement('img');
            this.image.width = this.width;
            this.image.height = this.height;
            this.image.src = image;
        }
        //alert('constructor');
    }
    
    draw(){
        //alert('drawn');
        brush.fillStyle = this.color;
        if(this.image == null){
            brush.fillRect(this.xPos, this.yPos, this.width, this.height);
        } else {
            brush.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
        }
    }
    
    update(){
        this.draw();
        this.xPos += this.xSpeed;
        this.yPos = this.yPos + this.ySpeed;
    }
}

function rectangularCollision(x1, x2, y1, y2, h1, h2, w1, w2)
{
    return x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2;
}

let jump = true;

let sprite1 = new sprite(50, 50, 'teal', 0, 0, 0, 0, 'https://codehs.com/uploads/875052b0046aa59debf01887ae443a49');
let josh = new sprite(20, 100, 'black', 300, 380, 0, 0);
let jim = new sprite(20, 10, 'blue', 30, 48, 0.5, 1);

let sprites = [sprite1, josh, jim];

function mainLoop(){
    brush.clearRect(0, 0, canvas.width, canvas.height);
    
    brush.fillStyle = 'pink';
    brush.fillRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < sprites.length; i++){
        sprites[i].update();
    }
    //sprite1.update();
    //josh.update();
    
    sprite1.ySpeed += 0.2;
    
    if(rectangularCollision(sprite1.xPos, josh.xPos, sprite1.yPos, josh.yPos, sprite1.height, josh.height, sprite1.width, josh.width)){
        sprite1.xPos = 0;
        sprite1.yPos = 0;
    }
    
    if(sprite1.yPos < 0){
        sprite1.yPos = 0;
    }
    
    if(sprite1.yPos + sprite1.height > 400){
        sprite1.yPos = 400 - sprite1.height;
        sprite1.ySpeed = 0;
        jump = true;
    }
    
    if(sprite1.xPos < 0){
        sprite1.xPos = 0;
    }
    
    if(sprite1.xPos + sprite1.width > 400){
        sprite1.xPos = 400 - sprite1.width;
    }

    window.requestAnimationFrame(mainLoop);
}

mainLoop();

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'ArrowDown':
            sprite1.ySpeed = 2;
            break;
        case 'ArrowUp':
            if(jump){
                sprite1.ySpeed = -10;
                jump = false;
            }
            break;
        case 'ArrowLeft':
            sprite1.xSpeed = -2;
            break;
        case 'ArrowRight':
            sprite1.xSpeed = 2;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        //case 'ArrowDown':
          //  sprite1.ySpeed = 0;
            //break;
        //case 'ArrowUp':
          //  sprite1.ySpeed = 0;
            //break;
        case 'ArrowLeft':
            sprite1.xSpeed = 0;
            break;
        case 'ArrowRight':
            sprite1.xSpeed = 0;
            break;
    }
});
