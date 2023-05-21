const person = {
    firstName:"John",
    lastName: "Smith",
    age: 27,
    fullname: function(){
        return `${this.firstName} ${this.lastName}`;
    }
}

let arr = Object.keys(person);//массив со всеми ключами объекта (какие поля есть в объекте)
console.log(arr);
arr = Object.values(person);//значения
console.log(arr);
arr = Object.entries(person);//пара ключ значение (массив массивов)
console.log(arr);

