console.log("Welcome to TicTacToe game");
const clickAudio = new Audio("ting.mp3"); 
const clickOverAudio = new Audio("gameover.mp3");
const gameOverAudio =new Audio("music.mp3");
let boxes = document.querySelectorAll(".box");
boxes=Array.from(boxes);
let info = document.querySelector(".info");
let gif = document.querySelector("img");
let btn = document.querySelector(".btn");
let line =document.querySelector(".line");
let windowSize= window.innerWidth;

window.addEventListener("resize", () => {
    windowSize=window.innerWidth;
});


let turn = 'X';
info.innerText="Chance for "+turn;
let gameOver = false;

function changeTurn(){
    if(turn=='X'){
        return 'O'
    }
    else{
        return 'X';
    }
}
checkWin=()=>{
    let winList=[
        [0,1,2,0,5,0,0,10,0],
        [3,4,5,0,15,0,0,30,0],
        [6,7,8,0,25,0,0,50,0],
        [0,3,6,-10,15,90,-20,30,90],
        [1,4,7,0,15,90,0,30,90],
        [2,5,8,10,15,90,20,30,90],
        [0,4,8,0,15,45,0,30,45],
        [2,4,6,0,15,-45,0,30,-45]
    ];
    for(let i=0 ; i<winList.length ; i++){
        let e = winList[i];
        let a = boxes[e[0]].childNodes[0].innerText;
        let b = boxes[e[1]].childNodes[0].innerText;
        let c = boxes[e[2]].childNodes[0].innerText;
        if(a===b && b==c && b!==""){
            gameOver=true;
            info.innerText="Winner: "+a;
            if(windowSize>=750){
                line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
                line.style.width="30vw";
            }
            else{
                line.style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[8]}deg)`;
                line.style.width="60vw";
            }
        }
    }
    if(gameOver){
        clickOverAudio.play();
        gif.style.width="200px";
        gameOverAudio.currentTime=0;
        gameOverAudio.play();

    }
    else{
        turn=changeTurn();
        info.innerText="Chance for "+turn;
        clickAudio.currentTime=0;
        clickAudio.play();
    }

}

for(let i=0 ; i<boxes.length ; i++){
    boxes[i].addEventListener("click",()=>{
        boxes[i].childNodes[0].innerText=turn;
        checkWin();
    })
}

btn.addEventListener("click",()=>{
    if(turn=='X'){
        turn='O';
        info.innerText="Chance for "+turn;
         console.log(turn);
    }
    else{
        turn='X';
        info.innerText="Chance for "+turn;
        console.log(turn);
    }
    for(let i=0 ; i<boxes.length ; i++){
        boxes[i].childNodes[0].innerText="";
    }
    gameOver=false;
    gif.style.width="0vw" 
    line.style.width="0";
    gameOverAudio.pause();
})

