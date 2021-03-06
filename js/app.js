
var icons=["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"]; 
icons=icons.concat(icons);

var stars=document.getElementsByClassName("stars")[0];    

const movesContainer=document.getElementsByClassName("moves")[0];
var moves=0;

const deck=document.getElementsByClassName("deck")[0];
var opencard=null;
var matchedCards=0;
var startTimer=new Date();
var endTimer=0;

const displayPanel=document.getElementsByClassName("display-panel")[0];

const timer=document.getElementsByClassName("timer")[0];

var timerid=0;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function findScore(n){
    if(n<=16)
        return 3;
    if(n <=20)
        return 2;
    return 1;

}
function addStars(){
    const score=findScore(moves);
    stars.innerHTML="Stars:";
    for(let i=0;i<score;i++){
        var star=document.createElement("li");
        star.innerHTML="<i class=\"fa fa-star show\"></i>";
        stars.appendChild(star);
    }
    return stars.outerHTML;
}


function updateMatch(){
    matchedCards+=2;
}

function isWon(){
    if(matchedCards==16)
        return true;
    return false;
}


function calculateTime(){
    endTimer=new Date();
    var totalSeconds=Math.floor((endTimer-startTimer)/1000);
    var hours=Math.floor(totalSeconds/(60*60));
    totalSeconds=totalSeconds%(60*60);
    var minutes=Math.floor(totalSeconds/(60));
    totalSeconds=totalSeconds%60;
    var seconds=totalSeconds;
    return hours+":"+minutes+":"+seconds;
}

function updateTimer(){
    const time=calculateTime();
    timer.textContent="Time:"+time;
}

function addScorePanel(){
    displayPanel.innerHTML="";
    displayPanel.classList.toggle("display-panel-style");
    var head="<h1>Congratulations </h1><h1>You Won!...</h1>";
    var movesText="<p>You won with "+moves+" moves</p>";
    var timerText="<p>Time "+calculateTime()+"</p>";
    var starsText=addStars();
    displayPanel.innerHTML=head+movesText+starsText+timerText;
}

function updateWon(){
    window.clearInterval(timerid);
    console.log("You won");
    console.log("You won with "+moves+" moves");
    movesContainer.textContent="You won with "+movesContainer.textContent;
    addStars();
    addScorePanel();
    var cards=document.getElementsByClassName("card");
   for(let i=0;i<cards.length;i++){
    cards[i].classList.add("animate"); //its not working may be css doent allow two animations
   }
}

function updateMoves(){
    moves+=1;
    movesContainer.innerHTML=moves;
}

function click(e){
    card=e.target;
    if(opencard!=null && opencard.id==card.id){
        console.log("Same card is being clicked");
        return;
    }
    //valid move 
    updateMoves();
    card.classList.toggle("open");
    card.classList.toggle("show");
    card.classList.toggle("animate-1");
    if(opencard==null){
        console.log("open card is null ");
        opencard=card;
        return;
    }
    if(card.firstElementChild.classList.toString()==opencard.firstElementChild.classList.toString()){
        console.log("Match");
        card.classList.toggle("match");
        opencard.classList.toggle("match");
        
        card.removeEventListener('click',click);
        opencard.removeEventListener('click',click);
        
        opencard=null;
        updateMatch();
        if(isWon()){
            updateWon();
        }
    }
    else{
        setTimeout( function(card_,opencard_){
            console.log(card_);
            console.log(opencard_);
            card_.classList.toggle("open");
            card_.classList.toggle("show");
            card_.classList.toggle("animate-1");
            opencard_.classList.toggle("open");
            opencard_.classList.toggle("show");
            opencard_.classList.toggle("animate-1");
            console.log("No match");
        },800,card,opencard);
        opencard=null;
    }
}


function init(){
    icons_=shuffle(icons);
    //icons_=icons; //for debugging
    console.log("rebuilding the deck");
    stars.innerHTML="";
    deck.innerHTML="";
    displayPanel.innerHTML="";
    timer.innerHTML="Time:0:0:0";
    displayPanel.classList.remove("display-panel-style");
    moves=0;
    opencard=null;
    matchedCards=0;
    movesContainer.innerHTML=moves;
    for(let i=0;i<icons.length;i++){
        const card=document.createElement("li");
        card.id=i;
        card.classList.add("card");
        card.innerHTML="<i class=\""+icons_[i]+"\"></i>";
        deck.appendChild(card);
        card.addEventListener("click",click);
    }
    startTimer=new Date();
    timerid= setInterval(updateTimer,1000);
}

var restartContainer=document.getElementsByClassName("restart")[0];
restartContainer.addEventListener("click",init);
init()
