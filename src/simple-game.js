//configuration - заданные начальные значения
const nMoves = 3;

//elements - ссылки на элементы с которыми мы будем работать
const inputElement = document.getElementById("input-id");//поиск в базе данных ссылки на элементы которые будут участвовать в игре
const goButtonElement = document.getElementById("go-id");
const squareElement = document.getElementById("square-id");
const resultMessageElement = document.getElementById("game-result");
const playAgainButtonElement = document.getElementById("play-again-id");

//global variables - например счетчик ходов
let count = 0;

//functions
//введенным цветом закрашивать квадрат и считать сколько раз было сделано
//берем значение из input - это будет цвет и им будем красить
function game() {
    const color = inputElement.value;
    if(color == squareElement.style.backgroundColor){
        alert("this color was in the previous move");//предупреждение
    } else{
    squareElement.style.backgroundColor = color;
    allCounter++;
    if (allCounter == nMoves) {
        finishGame();
    }}
    inputElement.value = '';//обнулить введенное значение
}

function startGame() {
    allCounter = 0;
    goButtonElement.disabled = false;
    inputElement.readOnly = false;
    squareElement.style.backgroundColor = "white";
    resultMessageElement.innerHTML = '';//обнулили
    playAgainButtonElement.hidden = true;
}

function finishGame() {
    goButtonElement.disabled = true;
    inputElement.readOnly = true;//только читать
    playAgainButtonElement.hidden = false;
    resultMessageElement.innerHTML = "Congratulations, game is over"
}

//actions
goButtonElement.addEventListener("click", game);//какая функция при клике на кнопку
playAgainButtonElement.addEventListener("click",startGame);
startGame();


