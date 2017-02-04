(function() {
    console.clear();
    "use strict";

    const BlackjackModule = function() {

        const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        let allCardsDealt = [];
        let cardSum = 0;
        let dealer = null;
        let ttlAces = 0;

        let display = document.getElementById('cards');
        let cardContainer = document.getElementById('cards-container');
        let dealerDisplay = document.getElementById('dealer');
        let message = document.getElementById('message');
        const hitBtn = document.getElementById('.hit');
        const standBtn = document.getElementById('.stand');

        function dealDealer() {

            dealer = Math.floor(Math.random() * 21) + 1;

            while (dealer < 16) {
                dealer += (Math.floor(Math.random() * 11) + 1);
            }
            dealerDisplay.classList.add('card-back');
            dealerDisplay.textContent = dealer;
            console.log('dealer: ', dealer);

        } //end dealDealer

        function getCards() {

            card1 = String(Math.round(Math.random() * (cards.length - 1)));
            card2 = String(Math.round(Math.random() * (cards.length - 1)));

            allCardsDealt.push(cards[card1]);
            allCardsDealt.push(cards[card2]);

            for (let i in allCardsDealt) {
                let newCard = document.createElement('p');
                newCard.textContent = allCardsDealt[i];
                display.appendChild(newCard);
                newCard.classList.add('card-front');
            }
            cardValues();

        } //end getCards


        function cardValues() {

            cardSum = 0;

            allCardsDealt.forEach((card) => {
                if (Number(card)) {
                    cardValue = Number(card);
                    console.log('numbercard', card);

                } else if (card === 'J' || card == 'Q' || card === 'K') {
                    cardValue = 10;
                    console.log('facecard', cardValue);
                } else if (card === 'A') {
                    cardValue = 0;
                    ttlAces++;
                }
                cardSum += cardValue;
            }); //end allCardsDealt forEach

            isAce(ttlAces);

            function isAce(ttlAces) {
                if (ttlAces >= 1) {
                    cardSum = cardSum <= 10 ? cardSum += 11 : cardSum += 1;
                }

            } //end isAce

            if (cardSum === 21) {
                message.textContent = `21!  You win! Dealer had ${dealer}.`;
                dealerDisplay.className = 'card-front lose';
                display.classList.add('win');
            }
        } //end cardValues

        function checkResult(standing, hitting) {
            console.log('cardSum @ checkResult: ', cardSum);

            if ((cardSum === 21) && dealer != 21) {
                message.textContent = `21!  You win! Dealer had ${dealer}.`;
                dealerDisplay.className = 'card-front lose';
                display.classList.add('win');


            } else if (dealer > 21 && standing) {
                message.textContent = `Dealer busted!  You win!  Dealer had ${dealer}`;
                dealerDisplay.className = 'card-front lose';
                display.classList.add('win');


            } else if ((cardSum < dealer && standing) && !hitting) {
                message.textContent = `Dealer wins. Dealer had ${dealer}.`;
                dealerDisplay.className = 'card-front win';
                display.classList.add('lose');


            } else if ((cardSum === dealer && standing) && !hitting) {
                message.textContent = `Push! Dealer had ${dealer}.`;
                dealerDisplay.className = 'card-front';


            } else if (((cardSum < 21) && (cardSum > dealer) && standing) || allCardsDealt.length >= 5) {
                message.textContent = `You win! Dealer had ${dealer}.`;
                dealerDisplay.className = 'card-front lose';
                display.classList.add('win');


            } else if (cardSum > 21) {
                message.textContent = `You Bust. Dealer had ${dealer}.`;
                dealerDisplay.className = 'card-front win';
                display.classList.add('lose');
            }
        } //end checkResult

        function hit() {

            let hitCard = String(Math.round(Math.random() * (cards.length - 1)));

            allCardsDealt.push(cards[hitCard]);

            let newCard = document.createElement('p');
            display.appendChild(newCard);
            newCard.classList.add('card-front');
            newCard.textContent = allCardsDealt[allCardsDealt.length - 1];

            cardValues(cards[hitCard]);

        } //end hit


        function listenForInput() {

            document.getElementById('stand').addEventListener('click', function() {
                checkResult(true, false);
            });

            document.getElementById('hit').addEventListener('click', function() {
                hit();
                checkResult(false, true);
            });
        } //end eventlistener

        function init() {
            dealDealer();
            getCards();
            listenForInput();
        } //end init

        return {
            begin: init
        }; //end return

    }; //end HangmanModule

    const game = new BlackjackModule();
    game.begin();

})(); //end iife







//UNUSED CODE

// for (let i = 0; i < allCardsDealt.length; i++) {
//   cardSum = cardSum + allCardsDealt[i];
//   console.log('card total: ', cardSum);
// }

// checkResult(false, true);        /**
//  * Check the result of the current cards and alert the game result
//  *
//  * @param  {Boolean} standing  Whether or not the player is standing
//  * @param  {Boolean} hitting   Whether or not the player is hitting
//  * @return {void}
//  */

// display.innerHTML = '';
// card = Math.round(Math.random() * cards.length);
// display.innerHTML = cards[card];
