
console.log("One");

setTimeout(function () {//асинхронность выполняется только тогда когда стек освобождается
    console.log("Two");
}, 2000);

setTimeout(function () {//между собой соревнуются
    console.log("Two 1/2");
    setTimeout(function () {
        console.log("O-o-ops");
    }, 1)
}, 1);

// for (let index = 0; index < 100_000_000; index++);//работает синхронно
// console.log("Two");
console.log("Three");

//когда стек полностью завершает свою работу