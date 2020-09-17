//600x600 => 30x30

//give a unit of space (square)
let box = 20;

//Load canvas
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext('2d');
//Give relative length of canvas
LEN = {x: cvs.width/box,y: cvs.height/box };
//Creates food location
function newFood(){
    let food = {
        x: Math.floor(Math.random() * LEN.x) * box,
        y: Math.floor(Math.random() * LEN.y) * box};
    return food;
}

//Record direction
function getDirection(event){
    if(event.keyCode == 37 && direction != "RIGHT"){
        direction = "LEFT";
    }else if(event.keyCode == 38 && direction != "DOWN"){
        direction = "UP";
    }else if(event.keyCode == 39 && direction != "LEFT"){
        direction = "RIGHT";
    }else if(event.keyCode == 40 && direction != "UP"){
        direction = "DOWN";
    }
}

function move(){
    //Positions for the head of the snake
    newX = snake[0].x;
    newY = snake[0].y;
    console.log(newX, newY)
    
    //If snake eats food, increment score and generate new food
    //And leave the tail as snake should grow
    if(newX == food.x && newY == food.y){
        score++;
        food = newFood();
    }else 
        snake.pop();

    //Give new positon for head of snake
    if(direction == "LEFT") newX -= box;
    else if(direction == "RIGHT") newX += box;
    else if(direction == "UP") newY -= box;
    else if(direction == "DOWN") newY += box;
    newHead = {x: newX, y: newY};
    
    //Game stops if snake crosses the border
    if (newX < 0 || newX >= (LEN.x) * box || newY < 0 || newY >= (LEN.y) * box){
        console.log('game over')
        clearInterval(game)
    }

    snake.unshift(newHead);
}

function draw(){
    
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "white";
    ctx.font = "30px Changa One";
    ctx.fillText(score, 2*box, 1.6*box)
    move();
}
let score = 0;
let direction;
let snake = []
snake[0] = {x: 10*box, y: 10*box};

food = newFood();
document.addEventListener("keydown", getDirection);
game = setInterval(draw, 100);
