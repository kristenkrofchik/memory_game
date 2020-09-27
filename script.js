const gameContainer = document.getElementById("game");
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
'babyruth',
'kitkat',
'marsbar',
'nestle',
'penguin',
'm&m',
'brachs',
'lifesavers', 
'milkyway', 
'wrigleysgum',
'babyruth',
'kitkat',
'marsbar',
'nestle',
'penguin'
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
    newDiv.style.backgroundColor = '#ffba30';
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // if there is a background image, the image will be clicked on, not the div
  if (!event.target.style.backgroundImage) {
    // if this is the 1st of a pair clicked, set image
    if (!card1) {
      // update score to reflect that the user just made a valid move
      card1 = event.target;
      const imageURL = `url("images/${card1.className}.jpg")`;
      card1.style.backgroundImage = imageURL;
    }
    // if this is the 2nd of a pair clicked, set image and compare with 1st
    else if (!card2) {
      // update score to reflect that the user just made a valid move
      card2 = event.target;
      const imageURL = `url("images/${card2.className}.jpg")`;
      card2.style.backgroundImage = imageURL;
      
      // if images are same, keep the images on and reset vars. for new pair
      if (card1.className === card2.className) {
        card1 = null;
        card2 = null;
      }
      // if images are different, clear images and reset vars. after a second
      else {
        setTimeout(function() {
          card1.style.backgroundImage = null;
          card2.style.backgroundImage = null;
          card1 = null;
         card2 = null;
        }, 1000);
      }
    }
  }
}


document.addEventListener("DOMContentLoaded", createDivsForCandy(shuffledCandy));
