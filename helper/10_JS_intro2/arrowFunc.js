// const greeting = function(name){
//     console.log(`Hello ${name}`);
// }

// greeting("John");

// Стрелочная функция
const greeting = name => {
    console.log(`Hello ${name}`);
}

greeting("John");

function pow2(x) {
    return x * x;
}

function factorial(n) {
    let res = 1;
    for (let index = 2; index < n; index++) {
        res *= index;
    }
    return res;
}

console.log(pow2(5));
console.log(factorial(4));
console.log(typeof greeting);
console.log(greeting);//дает всю функцию как строку если не вызываю функцию
const fn = greeting;//та же функция будет

//функцмя принимает в качве аргумента др функцию
// const pow4 = function(x){
//     return pow2(x)*pow2(x)
// }

const pow4 = x => pow2(x) * pow2(x);
console.log(pow4(3));

function uniFunction(x, fn1, fn2) {
    return x < 0 ? fn1(x) : fn2(x);
}

let res = uniFunction(6, pow2, factorial);
console.log(res);

res = uniFunction(3, pow2, pow4);
console.log(res);

res = uniFunction(-3, x => x * 3, x => x / 2);
console.log(res);