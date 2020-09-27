const gameContainer = document.getElementById("game");
const allDivs = document.querySelectorAll(".flipped");
let cardsFlipped = 0;
let card1 = null;
let card2 = null;
let noClicking = false;
//let gamePlaying = false;
//let startButton = document.querySelector('#startButton');

const CANDY = [
'm&m',
'brachs',
'lifesavers', 
'milkyway', 
'wrigleysgum',
'm&m',
'brachs',
'lifesavers', 
'milkyway', 
'wrigleysgum'
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledCandy = shuffle(CANDY);


function createDivsForCandy(candyArray) {
  for (let candy of candyArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(candy);
    newDiv.classList.add("notFlipped");
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}




function handleCardClick(event) { 
  if (noClicking) return; //cannot click
  if(event.target.classList.contains('flipped')) return;

  let currentCard = event.target;
  const imageURL = `url("images/${currentCard.classList[0]}.jpg")`
  currentCard.style.backgroundImage = imageURL;


  if (card1 === null || card2 === null) {
    currentCard.classList.add("flipped");
    currentCard.classList.remove("notFlipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }


if (card1 && card2) {
    noClicking = true;
    let check1 = card1.classList[0];//check that they are the same color
    let check2 = card2.classList;

    if (check1 === check2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false; //if the cards match
  
  } else {
      setTimeout(function() {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1.classList.add("notFlipped");
          card2.classList.add("notFlipped");
          card1 = null;
          card2 = null;
          noClicking = false; //if the cards don't match
      }, 1000)
  }
}

}

// when the DOM loads
createDivsForCandy(shuffledCandy);
