//fruit array
const fruits = [
  "apple.png",
  "broccoli.png",
  "carrot.png",
  "cherries.png",
  "grapes.png",
  "watermelon.png",
  "orange.png",
  "chili.png",
  "salad.png",
  "strawberry.png",
  "apple.png",
  "broccoli.png",
  "carrot.png",
  "cherries.png",
  "grapes.png",
  "watermelon.png",
  "orange.png",
  "chili.png",
  "salad.png",
  "strawberry.png"
];

//number of moves
let moves = 0;

//number of uncovered pairs
let pairs = 0;

window.onload = (function() {
  //mix array of fruits
  const fruitsMix = fruits.sort(function(a, b) {
    return 0.5 - Math.random();
  });

  const cards = document.querySelectorAll(".fruit");
  cards.forEach(card => card.addEventListener("click", uncover));

  //number of uncovered cards
  let cardsUncovered = [];

  function uncover(e) {
    //variable use to check if card is cover or uncover
    let isCover = e.target.dataset.iscover;

    //id of card
    let id = e.target.id;

    //div with card
    let card = document.querySelector(`[id="${e.target.id}"]`);

    //add card to cardsUncovered
    cardsUncovered.push(id);

    //one card is picked
    if (cardsUncovered.length === 1) {
      //show card
      card.style.background = `url("img/${fruitsMix[id]}")`;
      card.style.backgroundSize = "cover";

      //remove listener to not allow to hide card by clicking on it
      card.removeEventListener("click", uncover);

      moves++;
      document.getElementById("moves").innerHTML = moves;

      return;
    }

    //two cards were picked
    if (cardsUncovered.length === 2) {
      //remove listener to not allow to hide card by clicking on it
      card.removeEventListener("click", uncover);

      //show card
      card.style.background = `url("img/${fruitsMix[id]}")`;
      card.style.backgroundSize = "cover";

      //check if cards are the same
      let cardOne = fruitsMix[cardsUncovered[0]];
      let cardTwo = fruitsMix[cardsUncovered[1]];

      //cards are the same
      if (cardOne === cardTwo) {
        //add 1 to variable pairs
        pairs++;
        document.getElementById("selectedCards").innerHTML = pairs + "/10";

        //show card
        document.querySelector(
          `[id="${cardsUncovered[0]}"]`
        ).style.background = `url("img/y${fruitsMix[cardsUncovered[0]]}")`;
        document.querySelector(
          `[id="${cardsUncovered[0]}"]`
        ).style.backgroundSize = "cover";

        document.querySelector(
          `[id="${cardsUncovered[1]}"]`
        ).style.background = `url("img/y${fruitsMix[cardsUncovered[1]]}")`;
        document.querySelector(
          `[id="${cardsUncovered[1]}"]`
        ).style.backgroundSize = "cover";

        //remove listeners from that pair of cards to keep them uncover
        document
          .querySelector(`[id="${cardsUncovered[1]}"]`)
          .removeEventListener("click", uncover);

        if (pairs === 10) {
          timerPause();
          win();
        }

        cardsUncovered.pop();
        cardsUncovered.pop();
        cardsUncovered.pop();
      } else {
        setTimeout(hide, 700);

        function hide() {
          //hide cards
          document.querySelector(
            `[id="${cardsUncovered[0]}"]`
          ).style.background = `url("img/fruits.png")`;
          document.querySelector(
            `[id="${cardsUncovered[1]}"]`
          ).style.background = `url("img/fruits.png")`;
          document.querySelector(
            `[id="${cardsUncovered[0]}"]`
          ).style.backgroundSize = "cover";
          document.querySelector(
            `[id="${cardsUncovered[1]}"]`
          ).style.backgroundSize = "cover";

          //add listener uncover
          document
            .querySelector(`[id="${cardsUncovered[0]}"]`)
            .addEventListener("click", uncover);
          document
            .querySelector(`[id="${cardsUncovered[1]}"]`)
            .addEventListener("click", uncover);

          cardsUncovered.pop();
          cardsUncovered.pop();
          cardsUncovered.pop();
          console.log(cardsUncovered);
        }
      }
    }
  }
})();

function startAgain() {
  location.reload();
}

let sec = 0;
let min = 0;
let seconds = 0;
let minutes = 0;
var timer;
time();

function time() {
  timer = setInterval(startTimer, 1000);

  function startTimer() {
    sec++;

    if (sec === 60) {
      min++;
      sec = 0;
    }

    if (sec < 10) {
      seconds = "0" + sec;
    } else {
      seconds = sec;
    }

    if (min < 10) {
      minutes = "0" + min;
    } else {
      minutes = min;
    }
    document.querySelector("#time").innerHTML = minutes + " : " + seconds;
    if (min === 60) {
      alert("Oops! You run out of time!");
      timerPause();
      document.querySelector(
        ".btn-timer"
      ).innerHTML = `<button  onclick="" class="aside-btn btn-disable zegar" style="cursor: not-allowed" ><span class="glyphicon glyphicon-play" aria-hidden="true"></span> play timer</button>`;
    }
  }
}

function timerPlay() {
  document.querySelector(
    ".btn-timer"
  ).innerHTML = `<button  onclick="timerPause()" class="aside-btn zegar" id="zegar"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span> pause timer </button> `;
  time();
}

function timerPause() {
  clearInterval(timer);
  document.querySelector(
    ".btn-timer"
  ).innerHTML = `<button  onclick="timerPlay()" class="aside-btn zegar" ><span class="glyphicon glyphicon-play" aria-hidden="true"></span> play timer</button>`;
}

function win() {
  document.querySelector("#overlay").style.display = "block";

  document.querySelector("#popup").innerHTML = `
<div id="close" onclick="hideWin()">X</div><h2>Congratulations!</h2>
   <br><p>You found all pairs<br><br>
   Your time: <span class="b"> ${minutes + " : " + seconds}</span><br>
   Number of moves: <span class="b"> ${moves} </span></p>
   <button class="aside-btn zegar" onclick="startAgain()">play again</button>`;
}

function hideWin() {
  document.querySelector("#overlay").style.display = "none";
}
