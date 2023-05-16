//configuration
const words = ['ad', 'mom', 'table', 'prize', 'apple', 'lemon', 'sunny', 'print', 'actor', 'price', 'peace', 'money'];
 
//elements
const inputLetterElement = document.getElementById("input-letter-id");
const inputNumberElement = document.getElementById("input-number-id");
const goButtonElement = document.getElementById("go-id");
const resultMessageElement = document.getElementById("game-result");
const playAgainButtonElement = document.getElementById("play-again-id");

//global variables
let allActionCounter = 0;
let rightActionCounter = 0;
let maxMovesNum = 0;
let wordCounter = 0;

function game(word) {
    const letter = inputLetterElement.value.toUpperCase();
    const num = inputNumberElement.value;
    const rightLetter = word.charAt(num - 1).toUpperCase();
    const squareElement = document.getElementById(`square-${num}-id`);
    if (checkLetter(letter) && checkNumber(num)) {
        if (rightLetter == squareElement.value) {
            alert("this letter is already correct");
        }
        else {
            squareElement.value = letter;
            squareElement.innerHTML = letter;
            if (rightLetter == letter) {
                squareElement.style.backgroundColor = "green";
                rightCounter++;
            } else if (word.toUpperCase().includes(letter)) {
                squareElement.style.backgroundColor = "gold";
            } else {
                squareElement.style.backgroundColor = "grey";
            }
            allCounter++;
            if (allCounter == maxMovesNum || rightCounter == word.length) {
                finishGame(word);
            }
        }
    } else {
        if (!checkLetter(letter)) {
            alert("In first line should be one letter");
        }
        if (!checkNumber(num)) {
            alert(`In second line should be number in range 1 - ${word.length}`);
        }
    }
    inputLetterElement.value = '';
    inputNumberElement.value = '';
}

function checkLetter(letter) {
    return typeof letter == 'string' && !/\d/.test(letter);
}

function checkNumber(num) {
    return typeof num != 'number' && num > 0 && num < word.length;
}

function startGame(word) {
    allCounter = 0;
    rightCounter = 0;
    goButtonElement.disabled = false;
    inputLetterElement.readOnly = false;
    inputNumberElement.readOnly = false;
    playAgainButtonElement.hidden = true;

    for (let index = 0; index < word.length; index++) {
        document.getElementById(`square-${index + 1}-id`).style.backgroundColor = "snow";
    }
    inputLetterElement.value = '';
    inputNumberElement.value = '';
    resultMessageElement.innerHTML = '';
}

function finishGame(word) {
    goButtonElement.disabled = true;
    inputLetterElement.readOnly = true;
    inputNumberElement.readOnly = true;
    playAgainButtonElement.hidden = false;
    wordId.innerHTML = '';
    resultMessageElement.innerHTML = rightCounter == word.length ? 'Congratulations, you won!' : `Game is over, you lose, write answer was ${word}`;
}

function getNextWord() {
    if (wordCounter === words.length) {
        wordCounter = 0;
    }
    let word = words[wordCounter++];
    maxMovesNum = word.length + 1;
    return word;
}

function setSquares(numberOfSquares) {
    let res = [];
    res.length = numberOfSquares;
    return [...res].
        map((v, index) => `<div id="square-${index + 1}-id" class="square"> </div>`).join("");
}

//Actions
let word = getNextWord();
wordId.innerHTML = setSquares(word.length);
goButtonElement.addEventListener("click", () => game(word));

playAgainButtonElement.addEventListener("click", () => {
    word = getNextWord();
    wordId.innerHTML = setSquares(word.length);
    goButtonElement.addEventListener("click", () => game(word));
    startGame(word);
});

startGame(word);