// console.log(x.y);//reference error потому что нет x (нет ссылки)

// let x;
// console.log(x.y);//type error - ссылка есть но неправильная операция

// const x={};
// console.log(x.y);//undefined - потому что х объявлен как объект но поле y не определено

// const x={};
// console.log(x[y]); - reference error - y выражение и как переменная не определена будет восприниматься как ссылка

// const x={};
// let y;
// console.log(x.y);//undefined (это значение)

// const x={};
// let y;
// x.undefined = 10;
// console.log(x[y]);// = 10 по полю undefined лежит 10 и я ищу значение по полю undefined

// const x={};
// let y=2;
// x.undefined = 10;
// console.log(x[y]);// undefined (потому что все значения которые встречаются как имя поля превращаются в строку (потому что строка 2 не существует)

// const x={};
// let y=2;
// x[2] = 10;
// console.log(x[y]); = 10 , получает по значению строки 2

const x = {
    x: 'x', toString: function () {
        return "x";
    }
};
const y = {
    y: 'y', toString: function () {
        return "y";
    }
};
const d = { x: 10, y: 20 };
x.toString = function () {//появляется новое поле и оно перекрывает ТуСтринг
    return "xx"
}
d[x] = 100;//после туСтринг появляется поле?
d[y] = 200;//выражение сводится к строке - а d[x] и d[y] это одно и тоже поле
const f = function () {
};
const num = 2;
f.x=function(a,b){
return a+b;
}
// console.log(d);
// console.log(d[x]);//=200
console.log(f.x(10,20));//=30
console.log(num.x);

const ar=[];
ar.x=10;
console.log(ar.x);
console.log(Array.from({length:2}));
console.log(Array.from({length:5}).map((__,index)=>index+5));//заполнить undefined
//строка клавиатура
console.log(Array.from({length:26}).map((__,index)=>String.fromCharCode(index+'a'.charCodeAt(0))).map(s=>`<div>${s}</div>`).join(''));

num.x=100;
console.log(num.x);//undefined (num - примитив и у него нет операции точки, у него строится объект оберточного класса, у которого нет левого значения (места, куда можно что-то положтиь))
const mm={};
mm.x=100;
console.log(mm.x);

let ddd;
// ddd.x=200;//ошибка - число индефайнд, у него нет оператора точки и его нельзя преобразовать в класс

//NaN - в арифм операции превращается в 0

(1+2).xxxx=1000;
let str1='abcd';
str1[0]='';
console.log(str1);//печатает правое значение но в строке его не будет

// ()()() - первая фнукция вторая функция третья - вызов второй функции которая вернет первую функцию