this.x=100;
console.log(this);

function f1(){
   return this;
}

const f2 = ()=>{return this};//принимает 1й параметр Хидден

console.log('f1 call result', f1());
console.log('f2 call result', f2());
// console.log((()=>{
//     console.log(this);
// })());

// const x = {f1:function(){
//     return this;
// }, f2:()=>{this}}//лямбда замыкание ничего не возвращает и будет андефайнд

const x = {f1:function(){//this - ссылка на объект this = toString функции
    return this;
}, f2:()=>{return this}}//возвращает this

console.log('x.f1 call result ', x.f1());

console.log('x.f2 call result ', x.f2());

const rectangle ={width:20,height:20, square: function(){
    return this.width*this.height
}, perimeter:()=>(this.width+this.height)*2};

console.log('square = ' + rectangle.square());//this = ссылка на return
console.log('perimeter = ' + rectangle.perimeter());//функц выраж у него нет this, а внешний this пустой объект у него нет ширины и высоты у него есть только поле х - у стрелочной функции (функционального выражения) нет параметра this 

const point = {x:3,y:4};
function displayPoint(z, t){
console.log(`x = ${this.x}, y = ${this.y}, z = ${z}, t = ${t}`);
}

// в закрытый параметр this дает значение + передали еще параметры которые нужны функции
const displayPoint1 = displayPoint.bind(point,100,200);//возвращает копию функционального объекта, привязывает к нему, но не меняет его (возвращает копию с привязанными аргументами (значениями))
// displayPoint1(-9,27);//не перезаписыват

// displayPoint.call(point, 200,300);//это вызов функции, не возвращает функц объект, но с привязкой this
// displayPoint.apply(point,[300,400]);//передаем this + доп аргументы в массиве

// console.log(rectangle[0]);//
console.log(JSON.stringify(rectangle)[0]);//это строка - у нее в квадр скобках 0 - это будет фигурная скобка

const rectangle1={width:20,height:20, square: function(){
    return this.width*this.height
}, perimeter:()=>(this.width+this.height)*2};

const rectangle2 ={width:20,height:20, square: function(){
    return this.width*this.height
}, perimeter:()=>(this.width+this.height)*2};

//если сравнить == объекты - то это ссылки и будет false
//а если превратить их в строки JSON - можно сравнить

console.log(rectangle1 == rectangle2);//false
console.log(JSON.stringify(rectangle1) == JSON.stringify(rectangle2));//true
console.log(rectangle1 == JSON.stringify(rectangle2));//false

//методы JSON:
//из объекта получить строку JSON - JSON.stringify(rectangle1)
//из строки JSON получить объект - JSON.parse

const rectangle3 = JSON.parse(JSON.stringify(rectangle1));//самая глубокая копия  - может быть большая вложенность (скопировали все уровни вложенности - потому что сначала превратили строку, а потом в объект)
//можно получить копию spread оператором -но там будут только ссылки

const rectangle4 = {...rectangle1};//это тоже копия, но копия только 1го уровня



