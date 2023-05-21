//замыкание

let nickName = "John";

function greeting(){
    let nickName = "Peter";
    return function(){
        let nickName = "Tigran";//переменные берутся те что ближе, если этой нет - Питер, если нет - Джон
        console.log(nickName)
    }
}

nickName = "Rabindranat";//поменяли верхний, и это будет применено в последнюю очередь
const hello = greeting();//вызвали функцию
hello();//чтобы в хелло попало то что функция возвращает
