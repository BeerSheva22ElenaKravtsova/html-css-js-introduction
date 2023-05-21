// ошибка
// console.log(nickName);

console.log(window);
//в отличие от let и const, var создают поле в глобальном объекте window 
var nickName = "John";

//все function declaration указанные не внутри объекта, а в скрипте, являются методами глобального объекта window

function greeting(){
    console.log("Hello");
}
console.log((greeting == window.greeting));

// var не рекомендуется использовать
//если хотим сделать поле глобального объекта:
// window.nickName = "";//лучше сделать поле глобального объекта, чтобы var не фигурировал