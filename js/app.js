
var icons=["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 
var stars=document.getElementsByClassName("stars")[0];
    

var movesContainer=document.getElementsByClassName("moves")[0];
var moves=0;

var deck=document.getElementsByClassName("deck")[0];
var opencard=null;
var matchedCards=0;

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
   for(let i=0;i<cards.length;i++){
    cards[i].classList.add("animate");
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
    }
    else{
        setTimeout( function(card_,opencard_){
            console.log(card_);
            console.log(opencard_);
            card_.classList.toggle("open");
            card_.classList.toggle("show");
            opencard_.classList.toggle("open");
            opencard_.classList.toggle("show");
            console.log("No match");
        },800,card,opencard);
        opencard=null;
    }
}


function init(){
    //icons_=shuffle(icons);
    icons_=icons; //for debugging
    console.log("rebuilding the deck");
    stars.innerHTML="";
    deck.innerHTML="";
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
}

var restartContainer=document.getElementsByClassName("restart")[0];
restartContainer.addEventListener("click",init);
init()
