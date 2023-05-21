

class Rectangle {
    #width;//делаем поля private
    #height;

    constructor(width, height) {
        this.#width = width;//делаем поля private
        this.#height = height;
    }
    square() {
        return this.#width * this.#height;
    }

    perimeter() {
        return (this.#width + this.#height) * 2;
    }
}

class Square extends Rectangle {
    constructor(width) {
        super(width, width);
    }

}

const rectangle = new Rectangle(3, 4);
const square = new Square(10);
console.log(rectangle.square());
console.log(square.perimeter());

//prototype - пишем название поля и задаем какие у него свва (у этой функции есть this конструктора)
// Rectangle.prototype.square = function () {
//     return this.width * this.height;
// }

// Rectangle.prototype.perimeter = function(){
//     return (this.width + this.height)*2;
// }

// Array.prototype.map = function(){
//     console.log(this);
//     return 'kuku';
// };

const ar = [1, 2, 3];
// console.log(ar.map());
// element, index, array
// Array.prototype.myForEach = function (action) {
//     for (let index = 0; index < this.length; index++) {
//         action(this[index]);
//     }
// };

Array.prototype.myForEach = function (action, thisValue) {
    for (let index = 0; index < this.length; index++) {
        action(this[index], index, this);
    }
};

Array.prototype.myFilter = function (filter, thisValue) {
    const filteredArray = [];
    this.myForEach((element, index) => {
        if (filter(element, index, this)) {
            filteredArray.push(element);
        }
    });
    return filteredArray;
};

Array.prototype.myMap = function (predicate, thisValue) {
    const returnedArray = [];
    this.myForEach((element, index) => {
        returnedArray.push(predicate(element, index, this));
    });
    return returnedArray;
};

Array.prototype.myReduce = function (predicate, initialValue = this[0]) {
    if (this[0] == undefined) {
        return undefined;
    }
    let accumulator = initialValue;
    this.myForEach((element, index) => {
        index = initialValue == this[0] ? index : index + this.indexOf(initialValue);
        accumulator = predicate(accumulator, element, index, this);
    });
    return accumulator;
};

let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(`forEach res = `);
arr1.forEach(i => console.log(i + 1));
console.log(`myForEach res = `)
arr1.myForEach(i => console.log(i + 1));

console.log(`filter res = ${arr1.filter(i => i > 1)}, myFilterRes = ${arr1.myFilter(i => i > 1)}`);

console.log(`map res = ${arr1.map(i => i * 2)}, myMap = ${arr1.myMap(i => i * 2)}`);

console.log(`reduce res = ${arr1.reduce((acc, i) => acc + i, 2)}, myReduce res = ${arr1.myReduce((acc, i) => acc + i, 2)}`);

class Counter {
    constructor() {
        this.sum = 0;
        this.count = 0;
    }
    add(array) {
        // Only function expressions will have its own this binding
        array.forEach(function countEntry(entry) {
            this.sum += entry;
            ++this.count;
        }, this);
    }
}

const obj = new Counter();
obj.add([2, 5, 9]);
console.log(obj.count); // 3
console.log(obj.sum); // 16

class Deferred {//отложенный
    ar = [];
    then(func) {
        this.ar.push(func);
    }

    resolve(e1) {
        this.ar.forEach(func => e1 = func(e1));
    }
}

const d = new Deferred()

d.then(function (res) {
    console.log("1 ", res);
    return "a";
}
);
d.then(function (res) { console.log("2 ", res); return "b"; });
d.then(function (res) { console.log("3 ", res); return "c"; });
d.resolve('hello');

// 1  hello
// 2  a
// 3  b

// function fun(...params) {
//     console.log(this);//
//     params.forEach(p => console.log(p));
// }
// fun('param1', 'param2', 'param3');
// fun(1,2);//так вызывается (не как массив, а как 1 и 2)ж
// obj.fun(1,2);//тоько так можем передать в функцию Зыс
// const obj1 = {f:fun(1,2)}; - но жэто вызров

const obj1 = {
    f: function (...params) {
        console.log(this);
        params.forEach(p => console.log(p))
    }
}
obj1.f('param1', 'param2', 'param3');

const point = { x: 3, y: 4 };
function displayPoint(z, t) {
    console.log(`x = ${this.x}, y = ${this.y}, z = ${z}, t = ${t}`);
}

// const object1 = {
//     f: function (...params) {
//         return this;
//     }
// }

// Function.prototype.myBind = function (object1, ...myArgs) {
//     const originalFunction = this;
//     return function (...args){
//         const combinedArgs = myArgs.concat(object1.f(...args));
//         return originalFunction(...combinedArgs);
//     };
// };

Function.prototype.myBind = function (object, ...myArgs) {
    const originalFunction = this;
    return function (...args) {
        const combinedArgs = myArgs.concat(args);
        const context = object;
        const functionName = Symbol();
        context[functionName] = originalFunction;
        const result = context[functionName](...combinedArgs);
        delete context[functionName];
        return result;
    };
};

//mycall - изменить - поставить в конце ретерн и круглые скобки - это будет вызов



// Function.prototype.myBind = function (obj, ...myArgs) {
//     const originalFunction = this;
//     return (...args) => {
//         const combinedArgs = myArgs.concat(obj.f(...args));
//         return originalFunction(...combinedArgs);
//     };
// };

// Function.prototype.myBind = function (...myArgs) {
//     const originalFunction = this;
//     return (...args) => originalFunction(...myArgs, ...args);
// };

// Function.prototype.myBind = function (object, ...myArgs) {
//     const originalFunction = this;
//     return function (...args) {
//         const combinedArgs = myArgs.concat(args);
//         return originalFunction(...combinedArgs);
//     };
// };

const displayPoint1 = displayPoint.bind(point, 100, 200);
const myDisplayPoint = displayPoint.myBind(point, 100, 200);


displayPoint1(); // Output: x = 3, y = 4, z = 100, t = 200
myDisplayPoint(); // Output: x = 3, y = 4, z = 100, t = 200


// Function.prototype.myBind = function (thisValue, ...myArgs) {
//     const originalFunction = this; // Save a reference to the original function

//     return function (...args) { // Return a new function
//         originalFunction.apply(thisValue, [...myArgs, ...args]); // Invoke the original function with the appropriate context and arguments
//     };
// };


 //     const res = {
//         f: function (...args){
//             const originalFunction = this;
//             const combinedArgs = myArgs.concat(args);


//             return originalFunction(...combinedArgs);

//         }
//     }
//     return res.f;
// }


// d.then(function (res) { console.log("3 ", res); return "c"; });



// Function.prototype.bind(this: Function, thisArg:AnalyserNode,...argArray:any[]){//зыс- принадлежит функции
//хитрость в том что мы модем передать зыс - если делаем ОБъект.функция