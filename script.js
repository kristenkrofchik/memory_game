const gameContainer = document.getElementById("game");
let cardsFlipped = 0;
let card1 = null;
let card2 = null;
let noClicking = false;
let gamePlaying = false;
let startButton = document.querySelector('#startButton');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
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

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = 'white';
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}




function handleCardClick(event) { 
  if(noClicking) {
    return;
  }; //cannot click
  
  //if(e.target.classList.contains("flipped")) {
   // return;
  //}; //already flipped a match, cannot click again

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  currentCard.classList.add('flip');

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard; //if there is a card1, keep it. if not, make it the current card
    card2 = currentCard === card1 ? null : currentCard; //card2 is currentCard if card1 is not
  }

if (card1 && card2) {
    noClicking = true;
    let check1 = card1.classList[0];//check that they are the same color
    let check2 = card2.classList[0];

    if (check1 === check2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false; //if the cards match
  } else {
      setTimeout(function() {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1.classList.add("flip-back");
          card2.classList.add("flip-back");
          card1.style.backgroundColor = "white";
          card2.style.backgroundColor = "white";
          card1 = null;
          card2 = null;
          noClicking = false; //if the cards don't match
      }, 1000)
  }
}
  console.log("you just clicked", event.target);
}





  


// when the DOM loads
createDivsForColors(shuffledColors);

