// const d = new Date();
// console.log(d.getSeconds());

//какую функцию (название не вызов) в какой период вызывать
setInterval(printTime, 1000);

function printTime() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const h1 = document.createElement("h1");
    const time = document.createTextNode(`${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`);
    h1.appendChild(time);
    if (root.firstElementChild) {//если уже есть этот элемент заменить его
        root.replaceChild(h1, root.firstElementChild);
    } else {
        root.appendChild(h1);
    }
}

