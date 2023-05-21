const sum = (a, b, ...rest) =>{
    //у любой функции есть псевдомассив arguments - со всеми значениями
    // for (let index = 0; index < arguments.length; index++) {
    //     console.log(arguments[index]);
    // }
    let res = a + b;
    for (let index = 0; index < rest.length; index++) {
       res +=rest[index];
    }
    return res;
}

let res = sum(2);//NaN - меньше аргументов
console.log(res);

// Чем оличаются стрелочные функции от function expression: у  них нет массива аргументов
// появился массив остаточных аргументов