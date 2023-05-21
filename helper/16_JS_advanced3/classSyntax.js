// const person = {
//     name:"Peter"
// }
// alert(person);
//по дефолту ту стринг у всех объектов - object object
//можно переопределить toString

class Person {
    constructor(id, firstName, lastName, birthDate) {
        this._id = id;//приватное поле
        this._firstName = firstName;//договоренность что приватное поле
        this._lastName = lastName;
        this._birthDate = new Date(birthDate);
    }

    get id() {//можно через пробел задать название метода и тогда вызов будет работа с полем john.id
        return this._id;
    }

    get lastName() {
        return this.__lastName;
    }

    set lastName(lastName) {
        this._lastName = lastName;
    }

    get age() {
        const ageDiffMs = (new Date()) - this._birthDate;
        const ageDate = new Date(ageDiffMs);
        return (ageDate.getUTCFullYear() - 1970);
    }

    fullName() {
        return `${this._firstName} ${this._lastName}`
    }
    // тоже самое
    // fullname = function(){
    //     return `${this.firstName} ${this.lastName}`
    // }
}


const john = new Person(1000, "John", "Smith", "2011-03-18");
console.log(john.id);
john.lastName = "Smithy";
console.log(john.fullName());
console.log(john.age);


//если поле или метод начинается с _ автор дает понять что не надо к иним напрямую обращаться
//this._id - договоренность что приватное поле, но обратиться можно
//this.#id - приватное поле

class Employee extends Person {
    constructor(id, firstName, lastName, birthDate, salary) {
        super(id, firstName, lastName, birthDate);
        this._salary = salary;
    }

    get salary() {
        return this._salary;
    }

    set salary(value) {
        if (value > this._salary) {
            this._salary = value;
        }
    }

}

const peter = new Employee(2000, "Peter", "Jackson", "2001-05-19", 10000);
console.log(peter.salary);
peter.salary = 20000;
console.log(peter.salary);

class Company {
    constructor() {
        this._employees = [];
    }

    get employees() {
        return this._employees;
    }

    addEmployee(employee) {
        const index = this._employees.findIndex(e => e.id === employee.id);
        if (index < 0) {
            this._employees.push(employee);
        }
        return index < 0;
    }
    removeEmployee(id) {
        const index = this._employees.findIndex(e => e.id === id);
        if (index < 0) {
            this._employees.splice(index, 1);
        }
        return index >= 0;
    }
}

const firm = new Company();
console.log(firm.addEmployee(peter));

const mary = new Employee(3000, "Mary", "Smith", '2003-08-08', 20000);
console.log(firm.addEmployee(mary))
console.log(firm.employees.length);
console.log(firm.addEmployee(mary))
firm.employees.forEach(e=>console.log(e));
firm.employees.length=1;
firm.employees.forEach(e=>console.log(e));

