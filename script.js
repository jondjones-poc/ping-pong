const  ball = document.getElementById('ball');
const  paddleOne = document.getElementById('paddle-one');
const  paddleTwo = document.getElementById('paddle-two');
const  scoreOne = document.getElementById('score-one');
const  scoreTwo = document.getElementById('score-two');

const PADDLE_HEIGHT = 150;
const PADDLE_WIDTH = 30;
const BALL_RADIUS = 30;
const SPEED_OF_PADDLE1 = 0;
const SPEED_OF_PADDLE2 = 0;

let halfPaddleHeight = PADDLE_HEIGHT/2;

let positionOfPaddle1 = window.innerHeight / 2;
let positionOfPaddle2 = window.innerHeight / 2;

let topPositionOfBall = window.innerHeight / 2;
let leftPositionOfBall = window.innerWidth / 2;

let topSpeedOfBall = 1;
let leftSpeedOfBall = 0;

let speedOfPaddle1 = 0;
let speedOfPaddle2 = 0;

let playerOneScore = 0;
let playerTwoScore = 0;

const endGame = () => {
    const audio = new Audio('./applause.mp3');
    audio.play();
    startBall()

}
const checkPaddleHit = () => {
    if (leftPositionOfBall <= PADDLE_WIDTH) {
        if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + PADDLE_HEIGHT) {
            leftSpeedOfBall = -leftSpeedOfBall
        } else {
            playerOneScore++;
            endGame();
        }
    } else if (leftPositionOfBall >= window.innerWidth - BALL_RADIUS - PADDLE_WIDTH) {
        if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + PADDLE_HEIGHT) {
            leftSpeedOfBall = -leftSpeedOfBall
        } else {
            playerTwoScore++;
            endGame(); 
        }
    }
}

const refreshScores = () => {
    scoreOne.innerText = playerOneScore;
    scoreTwo.innerText = playerTwoScore;  
}


const startBall = () => {
    let side;

    // reset ball position
    topPositionOfBall = window.innerHeight / 2;
    leftPositionOfBall = window.innerWidth / 2;

    if (Math.random() < 0.5) {
        side = 1;
    } else {
        side = -1;
    }

    leftSpeedOfBall = side * (Math.random() * 10);
    topSpeedOfBall = Math.random() * 10;
}

const stopBallGoingOffScreen = (positionOfBall) => {
    if (positionOfBall <= 10 || positionOfBall >=  window.innerHeight - BALL_RADIUS) {
        topSpeedOfBall = -topSpeedOfBall;
    }
}

const stopPaddleGoingOffScreen = (positionOfPaddle) => {
    if (positionOfPaddle <= 1) {
        return positionOfPaddle = 1
    } else if (positionOfPaddle >= window.innerHeight - PADDLE_HEIGHT) {
        return window.innerHeight - PADDLE_HEIGHT
    }

    return positionOfPaddle;
}

const updateDisplay = () => {

    positionOfPaddle1 += speedOfPaddle1;
    positionOfPaddle2 += speedOfPaddle2;

    topPositionOfBall += topSpeedOfBall;
    leftPositionOfBall += leftSpeedOfBall;

    const currentPosition1 = stopPaddleGoingOffScreen(positionOfPaddle1)
    const currentPosition2 =stopPaddleGoingOffScreen(positionOfPaddle2)

    stopBallGoingOffScreen(topPositionOfBall);
    checkPaddleHit();

    paddleOne.style.top = `${currentPosition1}px`;
    paddleTwo.style.top = `${currentPosition2}px`;

    ball.style.top = `${topPositionOfBall}px`;
    ball.style.left = `${leftPositionOfBall}px`;

    refreshScores();
}

document.addEventListener('keydown', (e) => {

    if (e.key.toLowerCase()  === 'w' ) {           
        speedOfPaddle1 = -10;
    } else if (e.key.toLowerCase()  === 's') {     
        speedOfPaddle1 = 10;
    } else if (e.key  === 'ArrowUp') {     
        speedOfPaddle2 = -10;
    } else if (e.key  === 'ArrowDown') {    
        speedOfPaddle2 = 10;
    } 
})

document.addEventListener('keyup', (e) => {

    if (e.key  === 'w') {           
        speedOfPaddle1 = 0;
    } else if (e.key  === 's') {     
        speedOfPaddle1 = 0;
    } else if (e.key  === 'ArrowUp') {     
        speedOfPaddle2 = 0;
    } else if (e.key  === 'ArrowDown') {    
        speedOfPaddle2 = 0;
    } 
})

document.addEventListener('DOMContentLoaded', () => {
    startBall();
})

window.setInterval(updateDisplay, 1000/60);