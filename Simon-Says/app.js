let body = document.querySelector("body");
let btns = document.querySelectorAll(".btn")
let gameSeq = [];
let userSeq = [];
let para=document.querySelector("p");
let highScore=0;
let score = document.querySelector(".score")



let gameStarted = false;
let level = 0;

let btnsColor=["pink","orange","cyan","Periwinkle-Blue"];

let generateRandomBtnClass = function(){
    let randomIdx = Math.floor(Math.random()*4)+0;
    return(btnsColor[randomIdx]);
}

document.addEventListener("keydown",function(){
    if(gameStarted==false){
        console.log("game is started");
        gameStarted=true;
        levelUp();
    }    
});

let gameFlash = function(btnClass){
     let btn = document.querySelector("."+btnClass);
     btn.classList.add("flash-white");
     setTimeout(function(){
        btn.classList.remove("flash-white")
     },200);
}
let userFlash = function(btnClass){
     let btn = document.querySelector("."+btnClass);
     btn.classList.add("flash-green");
     setTimeout(function(){
        btn.classList.remove("flash-green")
     },200);
}

let levelUp = function(){
    level++;
    if(level>highScore){
        highScore=level;
        score.innerText=`Highest Score: ${highScore}`;
    }
    para.innerText="Level "+String(level);
    let btnClass=generateRandomBtnClass();
    gameFlash(btnClass);
    gameSeq.push(btnClass);
    console.log("gameSeq",gameSeq);
    userSeq=[];
}
let reset = function(){
    body.classList.add("flash-red");
    setTimeout(function(){
        body.classList.remove("flash-red");
    },150);
    userSeq=[];
    gameSeq=[];
    level=0;
    gameStarted=false;
}

let check = function(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(function(){
                levelUp();
            },1000)
        }
    }
    else{
        para.innerText=`Game Over: Your score was ${level}, Press any key to restart a game`;
        reset();
    }
}

let btnPress = function(pointerEvent){
    userFlash(pointerEvent.target.classList[1]);
    userSeq.push(pointerEvent.target.classList[1]);
    console.log("userSeq",userSeq);
    check(userSeq.length-1);
}

for(let btn of btns){
    btn.addEventListener("click",btnPress)
}
