
score = 0;
cross = true;
audioGameOver = new Audio('gameOver.mp3');
audioFlyBird = new Audio('fly_bird.mp3');

document.onkeydown  = function(e){
audioFlyBird.play();
setTimeout(() => {
    audioFlyBird.pause();
}, 500);

// console.log(`Key code is: ${e.keyCode}`)
if(e.keyCode == 38){
    //Up Arrow key
    const piku = document.querySelector('.piku');
    piku.classList.add('animatePiku');
    setTimeout(() =>{
        piku.classList.remove('animatePiku'); 
    },700)
}
if(e.keyCode == 39){
    //right arrow key
    piku = document.querySelector('.piku');
    pikuX = parseInt(window.getComputedStyle(piku,null).getPropertyValue('left'));
    piku.style.left = pikuX+112+'px';
}
    if(e.keyCode == 37){
    //right arrow key
    piku = document.querySelector('.piku');
    pikuX = parseInt(window.getComputedStyle(piku,null).getPropertyValue('left'));
    piku.style.left = pikuX-112+'px';
}
if(e.keyCode == 13 && (!obstacle.classList.contains('active'))){
    window.location.reload();
}
}
setInterval(() =>{
piku = document.querySelector('.piku');
gameOver = document.querySelector('.gameOver');
obstacle = document.querySelector('.obstacle');

px = parseInt(window.getComputedStyle(piku,null).getPropertyValue('left'));
py = parseInt(window.getComputedStyle(piku,null).getPropertyValue('top'));

ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

offsetX = Math.abs(ox-px);
offsetY = Math.abs(oy-py);
console.log(`offsetX ${offsetX} , offsetY ${offsetY}`);
if(offsetX<90 && offsetY>40 && cross) {
    console.log('score up')
    score+=1;
    cross = false; 
    updateScore(score);
    setTimeout(() => {
        cross = true;
    }, 200);
    
    aniDuration = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
    if(aniDuration > 2.00){
        setTimeout(() =>{
            newDuration = aniDuration - 0.01;
            obstacle.style.animationDuration = newDuration+'s';
        }, 300)
    }
    
}else if(offsetX< 25 && offsetY< 40){
    obstacle.classList.remove('animateObstacle');
    obstacle.classList.remove('active');
    score = 0;
    gameOver.innerHTML= 'Game Over: Play Again';
    audioGameOver.play();
    updateScore(score);


    setTimeout(() => {
    audioFlyBird.pause();
    audioGameOver.pause();
    gameOver.innerHTML = 'Press Enter for restart the game!'
    if(KeyboardEvent.keyCode == 13){
    window.location.reload();
}
    }, 1000);
    
} 

},200);

function upgradeObstacle(score){
if(score>10){
    if(obstacle.classList.contains('md')){
        obstacle.classList.remove('md');
    }
    if(obstacle.classList.contains('sm')){
        obstacle.classList.remove('sm');
    }
    obstacle.classList.add('lg');
}else if(score<=10 && score>5){
    if(obstacle.classList.contains('sm')){
        obstacle.classList.remove('sm');
    }
    obstacle.classList.add('md');
}else{
    obstacle.classList.add('sm');
}
}

function updateScore(score){ 
scoreCont.innerHTML = `Your Score: ${score}`;
upgradeObstacle(score);
}