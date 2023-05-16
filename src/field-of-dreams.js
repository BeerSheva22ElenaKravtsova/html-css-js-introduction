//configuration
const words = [
    ['programming', 'What is the process of creating and implementing computer programs called?'],
    ['war', 'What is a prolonged conflict between nations or groups?'],
    ['table', 'What is a piece of furniture with a flat top and legs used for various purposes?'],
    ['computer', 'What is a complex electronic device capable of performing various tasks?'],
    ['cat', 'What is a domesticated carnivorous mammal with retractable claws?'],
    ['music', 'What is the organized sound or combination of sounds that evoke emotion or express an idea?'],
    ['book', 'What is a written or printed work consisting of pages glued or bound together?'],
    ['mathematics', 'What is the abstract study of numbers, quantity, structure, and change?'],
    ['planet', 'What is a celestial body that orbits around a star, is not a satellite, and is spherical in shape?'],
    ['oxygen', 'What is the chemical element with the symbol "O" and atomic number 8?'],
    ['photography', 'What is the art, process, or practice of creating durable images by recording light or other electromagnetic radiation?'],
    ['philosophy', 'What is the study of fundamental questions about existence, knowledge, values, reason, and more?'],
    ['algorithm', 'What is a step-by-step procedure or set of rules for solving a problem or completing a task?'],
    ['biology', 'What is the branch of science that studies living organisms and their interactions with the environment?'],
    ['architecture', 'What is the art and science of designing and constructing buildings and other physical structures?'],
    ['entrepreneur', 'What is a person who organizes and operates a business, taking on financial risks in the hope of profit?'],
    ['galaxy', 'What is a vast system of stars, gas, dust, and other celestial objects held together by gravitational forces?'],
    ['neuroscience', 'What is the scientific study of the nervous system, including the brain, spinal cord, and nerves?'],
    ['quantum', 'What is the branch of physics that deals with phenomena at the atomic and subatomic levels?'],
    ['sustainability', 'What is the practice of using resources in a way that preserves the environment for future generations?']
    ];

//elements
const inputLetterElement = document.getElementById("input-letter-id");
const inputWordElement = document.getElementById("input-word-id");
const goButtonElement = document.getElementById("go-id");
const resultMessageElement = document.getElementById("game-result");
const playAgainButtonElement = document.getElementById("play-again-id");
const wrongLettersElement = document.getElementById("wrong-letters");
const counterWinLoseElement = document.getElementById("counterWinLose");
// const wordElement = document.getElementById("wordId");
// const wordElement = document.getElementById("wordId");
const squareElements = document.querySelectorAll(".square");

//global variables
let letterActionCounter = 0;
let maxLetterActionCounter = 0;
let wordCounter = 0;
let wonCounter = 0;
let loseCounter = 0;

function game(word) {
    const letter = inputLetterElement.value.toUpperCase();
    const playerWord = inputWordElement.value.toUpperCase();
    word = word.toUpperCase();
    if (letter != '') {
        if (letter.length == 1) {
            if (word.includes(letter)) {
                fillLetters(letter, word);
            }
            else {
                setWrongLettersElement(letter);
            }
            letterActionCounter++;
            checkLetterCounter();
        }
        else {
            alert("There should be just one letter!");
            inputLetterElement.value = '';
        }
    }
    if (playerWord != '') {
        fillWord(playerWord, word);
    }
    inputLetterElement.value = '';
    inputWordElement.value = '';
}

function setWrongLettersElement(letter) {
    wrongLettersElement.innerHTML = wrongLettersElement.innerHTML === ''
        ? `Wrong letters that you tried are : ${letter}`
        : `${wrongLettersElement.innerHTML}, ${letter}`;
}

//у массива promt - на массив
function fillLetters(letter, word) {
    word.split('').map((l, index) => {
        if (l == letter) {
            fillLetter(index, l);
        }
    });
}

function fillWord(playerWord, word) {
    res = false;
    if (playerWord == word) {
        res = true;
        playerWord.split('').map((letter, index) => {
            fillLetter(index, letter);
        });
    }
    setTimeout(function () { finishGame(res, word); }, 1000);
}

function fillLetter(index, letter) {
    let squareElement = document.getElementById(`square-${index + 1}-id`);
    squareElement.innerHTML = letter;
    setColor(squareElement, "snow");
}

function setColor(element, color) {
    element.style.backgroundColor = "transparent";
    setTimeout(function () {
        element.style.backgroundColor = color;
    }, 100);
}

function checkLetterCounter() {
    if (letterActionCounter == maxLetterActionCounter) {
        alert("Over trying to guess the letters, guess the word");
        inputLetterElement.style.backgroundColor = 'grey';
        inputLetterElement.readOnly = true;
    }
}

function startGame(word) {
    letterActionCounter = 0;
    goButtonElement.disabled = false;
    inputLetterElement.readOnly = false;
    inputWordElement.readOnly = false;
    word.split('').map((l, index) => {
        document.getElementById(`square-${index + 1}-id`).style.backgroundColor = "black";
    });
    inputLetterElement.value = '';
    inputWordElement.value = '';
    resultMessageElement.innerHTML = '';
}

function finishGame(res, word) {
    goButtonElement.disabled = true;
    inputLetterElement.readOnly = true;
    inputWordElement.readOnly = true;
    inputLetterElement.style.backgroundColor = 'white';

    wordId.innerHTML = ''; 
    questionId.innerHTML = '';
    wrongLettersElement.innerHTML = '';
    if (res) {
        wonCounter++;
        res = 'Congratulations, you won!';
    } else {
        loseCounter++;
        res = `Game is over, you lose, write answer was ${word}`;
    }
    resultMessageElement.innerHTML = res;
    counterWinLoseElement.innerHTML = `You won ${wonCounter} times, you lose ${loseCounter} times`;
}

function getNextWord() {
    if (wordCounter === words.length) {
        wordCounter = 0;
    }
    let answerQuestion = words[wordCounter++];
    maxLetterActionCounter = Math.floor(answerQuestion[0].length / 2);
    return answerQuestion;
}

function setSquares(numberOfSquares) {
    let res = [];
    res.length = numberOfSquares;
    return [...res].
        map((v, index) => `<div id="square-${index + 1}-id" class="square"> </div>`).join("");
}

//Actions
let wordQuestion = getNextWord();
questionId.innerHTML = `The question is: ${wordQuestion[1]}`;
wordId.innerHTML = setSquares(wordQuestion[0].length);
goButtonElement.addEventListener("click", () => game(wordQuestion[0]));

playAgainButtonElement.addEventListener("click", () => {
    wordQuestion = getNextWord();
    questionId.innerHTML = `The question is: ${wordQuestion[1]}`;
    wordId.innerHTML = setSquares(wordQuestion[0].length);
    goButtonElement.addEventListener("click", () => game(wordQuestion[0]));
    startGame(wordQuestion[0]);
});

startGame(wordQuestion[0]);


