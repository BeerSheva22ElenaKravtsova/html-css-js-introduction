//оператор разворота

//МАССИВЫ
const arr1 = [2,3,5];
const arr2 = [7,11];
// const arrClone = arr1;//разные объекты потому что это ссылки

//деструктуризация - массив всегда стоит слева
//при спреде - справа - вытряхнуть все элементы из массива и положить в arrClone
const arrClone = [...arr1, ...arr2,1,0];//склеить массивы и добавить 13
console.log(arrClone);

//найти мин элемент
let res = Math.min(...arrClone, 5, ...arr1);
console.log(res);

//ОБЪЕКТЫ
const person = {
    firstName:"John",
    lastName: "Smith",
    age: 27,
    fullname: function(){
        return `${this.firstName} ${this.lastName}`;
    }
}

//первый аргумент - куда копировать (можно пустой объект = {})
//второй, третий и тд - то что мы клонируем в первый
const personClone = Object.assign({}, person);

//все из Персон поместить в Темп
const temp = {country:"Israel"};
const personCloneTemp = Object.assign(temp, person);

console.log(personCloneTemp === temp);//true
console.log(temp);

//тоже самое с помощью Спреда
//в фигурных скобках создаем объект
const personClone1 = {...person,...temp, age:35}
console.log(personClone1);

