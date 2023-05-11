// Проперти которые содержат функции - это методы
// Проперти, которые содержат данные - это поля
const person = {
    firstName: 'John',//ключ - значение
    lastName: 'Smith',
    age: 27,
    fullName: function () {
        return `${this.firstName} ${this.lastName}`
    }
}

console.log(typeof person);
console.log(person.firstName);
console.log(person.lastName);
console.log(person.age);
console.log(person.fullName());

person.age = 28;
console.log(person.age);
console.log(person);

//добавить поле
person.hobby = 'chess';
console.log(person);

//убрать поле
delete person.hobby;

const peter = {
    firstName: 'Peter',
    lastName: 'Jackson',
    age: 34
}

console.log(peter);
peter.fullName = function () {
    return `${this.firstName} ${this.lastName}`
}

console.log(peter.fullName());

function Person(firstName, lastName, age) {
    this.firstName = firstName;//this это объект который будет создан
    this.lastName = lastName;
    this.age = age;
    this.fullName = function () {
        return `${this.firstName} ${this.lastName}`;
    }
}

//new = создай объект
const mary = new Person('Mary', 'Smith', 19);
console.log(mary);

// доступ к полю через 2 способа:
//через .
//через [] и туда положить string
//все поля объектов в JS имеют тип string
console.log(mary['age']);
mary['age'] = 20;
console.log(mary.age);

let key = 'firstName';
console.log(mary[key]);//так только через []

mary['main hobby'] = 'dancing';//только так потому что пробел

//переменная к принимает поочереди названия всех полей в Мэри
//итерирует все ключи
for (let k in mary) {
    console.log(k);
}

function printObject(obj) {
    for (let k in obj) {
        if (typeof obj[k] !== 'function') {
            //распечатать все ключи и значения объекта с таким полем
            console.log(`${k} -> ${obj[k]}`);
        } else {
            console.log(`${k} -> ${obj[k]()}`);
        }
    }
}

printObject(mary);





