
var icons=["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 
var stars=document.getElementsByClassName("stars")[0];
    

var movesContainer=document.getElementsByClassName("moves")[0];
var moves=0;


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

var deck=document.getElementsByClassName("deck")[0];

var opencard=null;
var matchedCards=0;
function addMatchCards(){
    matchedCards+=2;
}

function isOver(){
    if(matchedCards==16)
        return true;
    return false;
}

function addStars(){
    const score=Math.ceil(16/moves*3);
    stars.innerHTML="";
    for(let i=0;i<score;i++){
        var star=document.createElement("li");
        star.innerHTML="<i class=\"fa fa-star show\">S</i>";
        stars.appendChild(star);
    }
}

function updateWon(){
    movesContainer.textContent="You won with "+movesContainer.textContent;
   var cards=document.getElementsByClassName("card");
   for(let i=0;i<cards.length;i++)
    cards[i].classList.add("animate");
}

function click(e){
    card=e.target;
    if(opencard==card){
        return;
    }
    moves+=1;
    movesContainer.innerHTML=moves;
    card.classList.add("open","show","disable","animate-1");
    if(opencard==null){
        opencard=card;
        return; //we are giving a chance if the user reclciked the same card;
    }
    else{
        if(opencard.innerHTML==card.innerHTML  ){
            opencard.classList.add("disable","match");
            card.classList.add("disable","match");
            opencard.removeEventListener("click",click);
            card.removeEventListener("click",click);
            addMatchCards();
            if(isOver()){
                updateWon();
            }
        }
        else{
            tempcard=opencard;
            setTimeout(function(){
                tempcard.classList.remove("disable","show","open","animate-1");
                card.classList.remove("disable","show","open","animate-1");
            },3000);
            
        }
        opencard=null;
    }
}


function init(){
    icons_=shuffle(icons);
    //icons_=icons; //for debugging
    console.log("rebuilding the deck");
    stars.innerHTML="";
    deck.innerHTML="";
    moves=0;
    movesContainer.innerHTML=moves;
    for(let i=0;i<icons.length;i++){
        const card=document.createElement("li");
        card.classList.add("card");
        card.innerHTML="<i class=\""+icons_[i]+"\"></i>";
        deck.appendChild(card);
        card.addEventListener("click",click);
    }
}

var restartContainer=document.getElementsByClassName("restart")[0];
restartContainer.addEventListener("click",init);
init()
