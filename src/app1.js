// проверка что работает node app.js
console.log("Hello World!");

// let a = 5;//number
// a = "hello";//string
// a = false;//boolean

let a = 5 + "5";
console.log(a, typeof (a));
a = a - 5;
console.log(a, typeof (a));

a = "abc";
a = a / 2;
console.log(a, typeof (a));

a = "123";
a -= 0;
console.log(a, typeof (a));

if (a = 0) {
    console.log("a is true");
}
console.log(a, typeof (a));

a = 1;
let b = 3;
let c = 2;

if (a < b < c) {
    console.log("a<b<c is true");
}

// сравниваются строки по кудам АСКИ
if ("2" < "abc") {
    console.log('"2"<"abc" is true');
}

a = "abc";
// преобразование к boolean
a = !!a;
console.log(a, typeof (a));

// инфинити (сначала умножение!)
console.log(2 + 10 * true / false)

// = 71 Как строка
console.log(3 + 4 + "1")

// = 341 Как строка
console.log(3 + (4 + "1"))

// -38
console.log(3 - (4 + "1"))

// JS преобразовала Объект в примитив для вычисления
a = new Number(3);
console.log(a = a + 5, typeof a);

// преобразование в объект и урезание последних цифр - и будет строка
a1 = 0.3456789;
console.log(a1, typeof a1);
a1 = a1.toFixed(2);
console.log(a1, typeof a1);

// ссылки если они не Налл = тру (и у ссылок есть преобразование в булеан)
//=true boolean
a = !!new Number(0);
console.log(a, typeof a)

//это примитив и здесь уже 0 = false
a = !!0;
console.log(a, typeof a)

a = "256 * 320";
// = NaN делает парсинг всей строки
console.log(+a);

// = 226 парсинг до момента пока не будет символ не соотв какому-то числу
// если первый символ не цифра = 0
console.log(parseInt(a));

// a = "A".toLowerCase;
// s = "S".toLowerCase;
// const nan = (+A).toString().toLowerCase;
// const ananas = a + nan + a + s;

console.log(("A" + (+"A") + "AS").toLowerCase());

function myToStringInt(number, radix) {
    let resFromDiv;
    let res = '';
    let letters = 'abcdefghijklmnopqrstuvwxyz'
    let isNegative = number < 0;
    number = Math.abs(Math.round(number));
    if (radix < 2 || radix > 36) {
        radix = 10;
    }
    do {
        resFromDiv = number % radix;
        res = resFromDiv < 10 ? resFromDiv + res : letters.charAt(resFromDiv - 10) + res;
        number = Math.floor(number / radix);//Math.trunc
    }
    while (number != 0)
    return isNegative ? "-" + res : res;
}

console.log((-125678935).toString(36));
console.log(myToStringInt(-125678935, 36));

console.log(myToStringInt(0, 36));

let errors = 0;
for (let radix = 2; radix < 37; radix++) {
    for (i = -1000; i < 1000; i++) {
        if (myToStringInt(i, radix).toLowerCase != i.toString(radix).toLowerCase) {
            errors++;
        }
    }
}
console.log("Errors count " + errors);

//написать функцию без ограничений
//Стринг Интерполейшн - вкрапление в строку выражений
//возможность определения имен после использования функции
//Хостинг определение символа после его использования
//есть у var

//2 не подходит к системе счисления
//система счисления определяет подходящие символы
//возвращает число
//какой паттерн использовать - было в java
//паттерн приобразования из строки в число используя базу счисления

const strNum = '0xff';
let radix;
console.log(`string with number ${strNum} for radix ${radix} is ${parseInt(strNum, radix)}`)

function myParseInt(strNum, radix) {
    //пробелы в начале или в конце не учитываются
    strNum = strNum.trim();
    //charAt возвр строку
    let index = strNum.charAt(0) == "-" || strNum.charAt(0) == "+" ? 1 : 0;

    // нельзя сравнивать NaN через == всегжа будет false
    if ((!radix || radix == 16) && getHexdecemalIndex(strNum.substring(index)>0)) {
        index += 2;
        radix = 16;
    }
    if (!radix) {
        radix = 10;
    }
    let res = radix > 1 && radix < 37 ? getDigitCode(strNum, index, radix) : NaN;

    if (!isNaN(res)) {
        let digit;
        index++;
        while (index < strNum.length &&
            !isNaN(digit = getDigitCode(strNum, index, radix))) {
            res = res * radix + digit;
            index++;
        }
        if (strNum[0] == "-") {// strNum[0]=="-" тоже самое что и strNum.charAt(0)
            res = - res;
        }
    }
    return res;
}

// + null =  строка
// другой знак = 0


function getDigitCode(strNum, index, radix) {
    //от кода аски а отнимаем 10
    const delta = 'a'.charCodeAt(0) - 10;
    const symbol = strNum.charAt(index).toLowerCase();
    //charCodeAt возвр число по коду аски
    const code = symbol >= '0' && symbol <= '9' ? + symbol : symbol.charCodeAt(0) - delta;
    return code > 0 && code < radix ? code : NaN;
}

function getHexdecemalIndex(str) {
    return str.toLowerCase.startsWith('0x') ? 2 : 0;
}

console.log(`string with number ${strNum} for radix ${radix} is ${myParseInt(strNum, radix)}`);

let d;
//fuction(){} - анонимная функция
//() в конце - это вызов этой функции
console.log(function () { }());

console.log(eval("let d = function() {return function() {return 10 }}; Math.sqrt(4) * (100 - d()())"));

function sum(op1 = 10, op2 = 20){//определяем дефолтные значения
return op1+op2;
}

let a2 = 30;
let a3 = 40;
console.log(`a1 = ${a1}, a2 = ${a2} sum(a1, a2) is ${sum(a1, a2)}`);


// Ошибки
// TypeError - 
// ReferenceError - обращаемся к переменной которая не определена
// SyntaxError - ошибка синтаксиса


