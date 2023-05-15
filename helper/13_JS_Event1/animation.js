// const box = document.getElementById("box");

const size = container.offsetWidth - box.offsetWidth;
const t = setInterval(move, 15);//возвращает значение
let pos = 0;
let i = 1;

//с левого верхнего угла в правый нижний
function move() {
    if (pos <= 0) {
        i = 1;
    }
    else if (pos >= size) {
        i = -1
    }
    pos += i;
    box.style.top = `${pos}px`;
    box.style.left = `${pos}px`;

    // if(pos===150){
    //     clearInterval(t);//передаем значение для остановки

    // }
}