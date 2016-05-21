/*
   Flash Card Application
   By John French
   ADD AUTHOR STUFF HERE
*/

/*
   NOTES:
   1. First, build without using AJAX.
   Just use local object for now and then find out a way to make use
   AJAX or some other technology as users would be able to edit, change,
   or upload their own cards and decks.  Step 1 is getting the
   functionality right and then implementing that later.
*/

// Create the testing deck object (Eventually this will be contained elsewere)
var deckOne = [
   ["a", "a"],
   ["I", "I"],
   ["am", "am"],
   ["at", "at"],
   ["can", "can"],
   ["ran", "ran"],
   ["had", "had"],
   ["in", "in"],
   ["it", "it"],
   ["big", "big"],
   ["did", "did"],
   ["will", "will"],
   ["him", "him"],
   ["not", "not"],
   ["on", "on"],
   ["run", "run"],
   ["up", "up"],
   ["but", "but"],
   ["is", "is"],
   ["as", "as"],
   ["his", "his"],
   ["red", "red"],
   ["get", "get"],
   ["well", "well"],
   ["yes", "yes"]
];

// Card bin arrays
var correctAnswers = [];
var incorrectAnswers = [];

// Button Variables
var beginButton = document.getElementById("beginButton");
var nextButton = document.getElementById("nextButton");
var correctAnswer = document.getElementById("correctAnswer");
var incorrectAnswer = document.getElementById("incorrectAnswer");

// Display the front side of a card
var flashCardActions = function() {

   // Generate a random card fron the deckOne (because of the max variable)
   var min = 0;
   var max = deckOne.length - 1;
   var randomCard = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
   };

   // Card Variables
   // Randomly picking the array number
   var cardNumber = randomCard(min, max);
   // Applying the random array number to deckOne
   var getCard = deckOne[cardNumber];
   var front = 0;
   var back = 1;
   var card = document.getElementById("card");

   // Card Counter
   var cardTotal = deckOne.length;
   var cardCounter = document.getElementById("cardCounter");

   // Deck check (to see if all cards have been viewed)
   if (deckOne.length === 0) {
      // If there are incorrectAnswers to go over...
      if (incorrectAnswers.length > 0) {
         var maxIncorrect = incorrectAnswers.length;
         var cardNumberIncorrect = randomCard(min, maxIncorrect);
         var getCardIncorrect = incorrectAnswers[cardNumberIncorrect];

         // cardCounter vars for the incorrectAnswers deck
         cardTotal = incorrectAnswers.length;

         // Display the cardCounter
         cardCounter.style.display = "block";
         // Display "cards" or "card"
         if (cardTotal > 1) {
            cardCounter.innerHTML = cardTotal + " cards to review";
         } else { cardCounter.innerHTML = cardTotal + " card to review"; }


         // Cycle through the incorrectAnswers
         card.innerHTML = getCardIncorrect[0][front];
         nextButton.style.display = "block";
         nextButton.onclick = function() {
            card.innerHTML = getCardIncorrect[0][back];
            // Hide the nextButton
            nextButton.style.display = "none";
            // Show the correctAnswer Button
            correctAnswer.style.display = "block";
            // On correctAnswer click:
            correctAnswer.onclick = function() {
               // Move the current card to the correctAnswers array
               correctAnswers.push( incorrectAnswers.splice(cardNumber, 1) );
               // Hide the buttons
               correctAnswer.style.display = "none";
               incorrectAnswer.style.display = "none";
               // Trigger the next card
               flashCardActions();
               // Show the nextButton
               nextButton.style.display = "block";
            };
            // Show the incorrectAnswer Button
            incorrectAnswer.style.display = "block";
            // On incorrectAnswer click:
            incorrectAnswer.onclick = function() {
               // Move the current card to the incorrectAnswers array
               // incorrectAnswers.push( deckOne.splice(cardNumber, 1) );
               // Hide the anser buttons
               correctAnswer.style.display = "none";
               incorrectAnswer.style.display = "none";
               // Trigger the next card
               flashCardActions();
               // Show the nextButton
               nextButton.style.display = "block";
            };
         };
      } else {
         card.style.display = "none";
         cardCounter.style.display = "none";
         document.getElementById("endMessage").style.display = "block";
      }
   }

   // Puts the contents of the card to the HTML
   card.innerHTML = getCard[front];

   // Display the cardCounter
   cardCounter.style.display = "block";
   // Display "cards" or "card"
   if (cardTotal > 1) {
      cardCounter.innerHTML = cardTotal + " cards left";
   } else { cardCounter.innerHTML = cardTotal + " card left"; }

   // Card Actions
   nextButton.onclick = function() {
      // Logic for if back is blank
      if (getCard[back] === "") {
         card.innerHTML = "(blank)";
      } else {
         // Display the back of the card.
         card.innerHTML = getCard[back];
      }

      // Hide the nextButton
      nextButton.style.display = "none";
      // Show the correctAnswer Button
      correctAnswer.style.display = "block";
      // On correctAnswer click:
      correctAnswer.onclick = function() {
         // Move the current card to the correctAnswers array
         correctAnswers.push( deckOne.splice(cardNumber, 1) );
         // Hide the buttons
         correctAnswer.style.display = "none";
         incorrectAnswer.style.display = "none";
         // Trigger the next card
         flashCardActions();
         // Show the nextButton
         nextButton.style.display = "block";
      };
      // Show the incorrectAnswer Button
      incorrectAnswer.style.display = "block";
      // On incorrectAnswer click:
      incorrectAnswer.onclick = function() {
         // Move the current card to the incorrectAnswers array
         incorrectAnswers.push( deckOne.splice(cardNumber, 1) );
         // Hide the anser buttons
         correctAnswer.style.display = "none";
         incorrectAnswer.style.display = "none";
         // Trigger the next card
         flashCardActions();
         // Show the nextButton
         nextButton.style.display = "block";
      };
   };
};

// Start the game
beginButton.onclick = function() {
   // Make beginButton dissapear
   beginButton.style.display = "none";
   // Make card appear
   card.style.visibility = "visible";
   // Make nextButton appear
   nextButton.style.display = "block";
   // Run the app
   flashCardActions();

};
