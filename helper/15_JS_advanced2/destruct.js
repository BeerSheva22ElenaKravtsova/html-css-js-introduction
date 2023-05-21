//Деструктуризация

//ДЕСТРУКТУРИЗАЦИЯ МАССИВА
const arr = [2,5,7,3];
// const a = arr[0];
// const b = arr[1];
// console.log(a,b);

const[a,b] = arr;//слева объявили 2 переменные, слева положим 0 элемент массива, справа первый
const[c,,d] = arr;//пропусили первый индекс
const[e,f,...rest] = arr;//в массив рест положим все остальное

console.log(a,b);
console.log(c,d);
console.log(e,f,rest);
fn(arr);

let x = 5;
let y = 7;
[y,x] = [x,y]; //SWAP! справа на ходу создали массив, а слева его деструктурировали
console.log(x,y);

function fn([a,b]){//сразу деструктурируем переданный массив и берем из него 2 первых элемента
    console.log(a+b);
}

//ДЕСТРУКТУРИЗАЦИЯ ОБЪЕКТА

const person = {
    firstName:"John",
    lastName: "Smith",
    age: 27,
    rest: 'Eilat',
    fullname: function(){
        return `${this.firstName} ${this.lastName}`;
    }
}

// const firstName = person.firstName;
// const lastName = person.lastName;

// const {firstName, lastName} = person; // создали 2 переменные
// console.log(firstName, lastName);

const {firstName, lastName, rest: vacation, ...restObj} = person; 
// restObj - не массив а объект с остальными свойствами (полями)
// называется Алиас - rest: vacation - возьми поле rest и его значение помести в переменную vacation
console.log(restObj,vacation);
personInfo(person);

function personInfo({lastName, age}){
    console.log(`${lastName} - ${age}`);
}






