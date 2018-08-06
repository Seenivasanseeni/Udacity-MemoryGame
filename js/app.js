/*
 * Create a list that holds all of your cards
 */
var icons=["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 

var movesContainer=document.getElementsByClassName("moves")[0];
var moves=0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Shuffle function from http://stackoverflow.com/a/2450976
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

//icons_=shuffle(icons);
icons_=icons; //for debugging
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

function click(e){
    card=e.target;
    if(opencard==card){
        return;
    }
    moves+=1;
    movesContainer.innerHTML=moves;
    card.classList.add("open","show","disable");
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
                alert("Game Over");
            }
        }
        else{
            opencard.classList.remove("disable","show","open");
            i=0;
            card.classList.remove("disable","show","open");
        }
        opencard=null;
    }
}
function init(){
    deck.innerHTML="";
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
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
