const human = {
    hobby: 'chess',
    fullName: function () {
        return `${this.firstname} ${this.lastName}`
    }
}

const john = {
    firstname: "John",
    lastName: "Smith",
    // __proto__: human //указать родителя
}

// console.log(john);//возвращает ссылку на родителя
console.log(john.hobby);//не определено

john.__proto__ = human //с этого момента он стал наследником human и унаследовал - присвоили значение полю
console.log(john.hobby);//не определено

john.hobby = 'cannabis';
console.log(john.hobby);//не определено

console.log(john.fullName());

// Person.prototype=human;
//начиная с этот момента все объекты которые будут создаваться при помощи
//конструктора Персон будут иметь родителем human

Person.prototype.fullName = human.fullName;

const peter = new Person("Peter", "Jackson");
const mary = new Person("Mary", "Smith");
console.log(peter);

peter.__proto__ = human;//назначаем родителя
mary.__proto__ = human;
console.log(peter.fullName());
console.log(mary.fullName());
console.log(peter.__proto__.constructor === Person);

Array.prototype.printArray = function () {
    for (let index = 0; index < this.length; index++) {
        console.log(this[index]);
    }
}

const numbers = [2, 3, 5, 7, 12];
// console.log(numbers);
numbers.printArray();

const tigran = new mary.__proto__.constructor('Tigran', 'Petrosian');//вызываем конструктор родителя
console.log(tigran);

// for in - обойти ключи объекта
//относится к массиву как к объекту
//он предназначен для перебора ключей объектов
//а мы добавили объекту метод - и тогда он будет новые методы тоже печатать
//некорректно (не нужно) обходить циклом for-in массив
const temp = [2, 3, 5];
for (const i in temp) {
    console.log(temp[i]);
}

//for of - для итерабл объектов

function Person(firstname, lastName) {
    this.firstname = firstname;
    this.lastName = lastName;
}

console.log();

