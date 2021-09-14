let road = document.getElementById('road');
let lane1= document.getElementById('lane1');
let lane2= document.getElementById('lane2');
let lane3= document.getElementById('lane3');
let score = 0;
let carLeftSpace;
let carBottomSpace = 20;
let lane1left = 0 + 43;
let lane2left = 156 + 43;
let lane3left = 312 + 43;
let laneArray = [lane1left,lane2left,lane3left];
let carCount = 2;
let obstacles = [];
//let obstacleLeftSpace = laneArray[Math.floor(Math.random()*3 )];



function createCar(){
    let car = document.createElement('div');
    car.setAttribute('id','car');
    road.appendChild(car);
    car.style.bottom = carBottomSpace; 
    carLeftSpace = lane2left;
    car.style.left = carLeftSpace;
}

function scoreArea(){
    let scoreDiv = document.createElement('div');
    scoreDiv.setAttribute('id','score');
    road.appendChild(scoreDiv);
    scoreDiv.style.bottom = 476 + 'px';
    scoreDiv.style.left = lane2left;
    scoreDiv.innerHTML = score;
}
function moveLeft(){
    if(carLeftSpace>=lane2left){
        carLeftSpace-=156;
        car.style.left = carLeftSpace;

    }
}
function moveRight(){
    if(carLeftSpace<=lane2left){
    carLeftSpace+=156;
    car.style.left = carLeftSpace;
    }

}

function control(e){
    if(e.key==="ArrowLeft"){
        moveLeft();
    }else if(e.key==="ArrowRight"){
        moveRight();
    }
    
}

class obstacle{
    constructor(obstacleBottomSpace){
        this.bottom = obstacleBottomSpace;
        this.left = laneArray[Math.floor(Math.random()*3 )];
        this.obsCar = document.createElement('div');
        let obsCar = this.obsCar;
        obsCar.setAttribute('class','obstacle');
        obsCar.style.left = this.left;
        obsCar.style.bottom = this.bottom;
        road.appendChild(obsCar);
    }
}

function createObstacles(){
    for(i=0;i<carCount;i++){
    let carGap = 338;//576/carCount;
    let obstacleBottomSpace = 500 + i*carGap;
    let newObstacle = new obstacle(obstacleBottomSpace)
    
    obstacles.push(newObstacle);
    //console.log(obstacles);
    }
}
function moveObstacles(){
    
    obstacles.forEach(function(car){
        car.bottom-=15;
        let visual = car.obsCar;
        visual.style.bottom = car.bottom;

        if(car.bottom<=-130){
        
            visual.removeAttribute('class');
            obstacles.shift();
            score++;
            document.getElementById('score').innerHTML= score;
            let newObstacle = new obstacle(576);
            obstacles.push(newObstacle);
            
        }
        if(carLeftSpace<=car.left+70
            &&carBottomSpace<=car.bottom+100
            &&carBottomSpace+100>=car.bottom
            &&carLeftSpace>=car.left){
                gameOver();
        }
    })
}
function restart(){
    window.location.reload();
}
function gameOver(){
    let grid = document.getElementById("grid")
    let body = document.querySelector('body')
    grid.style.visibility = "hidden";
    body.setAttribute("id","gameOver");
    body.innerHTML = 'score: '+ score + '<br><button id = "reset">Reset</button>';
    //body.innerHTML(score)
    let s =  document.querySelector('#reset');       //restart button
    s.addEventListener('click',restart);
}

function start(){
    createCar();
    scoreArea();
    document.addEventListener('keydown',control);
    createObstacles();
    setInterval(moveObstacles,30);


}
start();
 
       
    