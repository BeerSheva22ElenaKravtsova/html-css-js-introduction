//проблема в консоли 10 раз по 10
//исправить без let, const
//setTO вызвать 10 раз
// for (var index = 0; index < 10; index++) {
//     (function (index){
//         setTimeout(function () {
//         console.log(index);
//     }, 1000)
//     })(index);
// }

for (var index = 0; index < 10; index++) {
        setTimeout(function (index) {
        console.log(index);
    }, 1000, index) //тогда сеттаймаут забирает индекс с собой
}


// varIncrease();

// 0 ждем 1
// 1 ждем 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9

//10 секунд
//var одна и та же хранится в window
//перезаписываем каждый раз

//работает
// for (let index = 0; index < 10; index++) {
//     setTimeout(function(){
//       console.log(index);
//     }, 1000)
//   }