const arr = [1, 2, 3, 'four', 'five'];

arr.push(6);//добавляет в конец массива, возвращает новую длину массива

arr.pop();//удалить последний элемент из массива и возвращает его

arr.shift();//удаляет первый элемент массива

arr.unshift();//вставляет в начало и возвращает новую длину массива

const arr1 = ["one", "two", "three"];
const arr2 = [4, 5];
const arr3 = arr1.concat(arr2, [6, 7]);//соединить массивы
console.log(arr3);

arr.slice(2, 6);//не меняет первый массив, возвращает кусок с какого-то индекса до какого-то (левый вкл, правый не вкл), не изменяет прев массив, если 2 арг не указан - до конца

arr.splice(2, 6);//изменяет перв массив, пишем откуда и сколько удалить, третий аргумент - что добавить вместо этих аргументов

arr.indexOf('five');//получить индекс элемента или -1 если его нет

arr.includes(2);//true/false нашел или нет через строгое равенство (приведение типов)

arr.findIndex(e => (typeof (e) === "string" && e.toLowerCase() === 'five'));//задаю предикат - внутри цикл оббегает массив/ можно сразу передать функцию

//первый арг - элемент массив, второй - его индекс
arr.findIndex((e, i) => i > arr.length / 2 && e === 0);//во второй части массива найти 0

const persons = [
    {
        name: "Peter",
        age: 23
    },
    {
        name: "John",
        age: 28
    },
    {
        name: "Tigran",
        age: 26
    },
    {
        name: "Rabindranat",
        age: 23
    },
    {
        name: "Mary",
        age: 18
    },
]

res = persons.findIndex(p => p.age > 25);
console.log(res)

res = persons.findIndex(p => p.age > 25);
console.log(res)

persons.forEach((p, i) => console.log(`${i + 1} ${p.name}, age = ${p.age}`)) //метод может принять либо только ключи, либо их индексы тоже как 2й элемент

res = persons.map((p, i) => `${i + 1} ${p.name}, age = ${p.age}`);//не меняет первоначальный массив, возвращает новый
console.log(res);

res = persons.filter(p => p.age > 25);//новый массив, удовл предикату
console.log(res);

const numbers = [5, 9, 11, 2, 7, 13, 2];
res =numbers.reduce((accum, item) => accum + item, 0);//аккумулятор, элемент,  какому элементу изначально равен аккум, если он не указан то аккум сразу равен 1 элементу и функция начинает работать со 2го, если вместо аргумента "", то все склеит в строку
console.log(res);

res = persons.reduce((accum,p)=> accum + p.age,0);
console.log(res);



