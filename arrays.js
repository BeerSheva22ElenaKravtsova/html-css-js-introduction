const ar = [];
ar[10] = 100;
ar[0] = 'hello';
ar[3] = [];
ar.length = 0;
ar[0] = 1;
const ar2 = [[1, 6], [2, 0, 0], [3, 1]];
//add at array end
ar[ar.length] = 10;
let s = ar.push(...ar2);
// Array.push(...items any) - добавляет элемент (могу добавить сколько угодно жлементов и они будут добавляеться в конец массива)
//он вернет длину массива после добавления
//принимает 1 элемент или несколько
//массив - это 1 элемент
//из массива добавить все элементы, а не массив как 1 элемент:push(...arr2) = spread operator
ar[10];

//method map - возвращает массив такого же размера с преобразованными значениями
//текущее значение текущий индекс и ссылка на массив где это находится
console.log([1, 2, 3].map(n => n ** 2));

function getRandomIntNumber(min, max, minInclusive = true, maxInclusive = false) {
    if (!minInclusive) {
        min++;
    }
    if (maxInclusive) {
        max++;
    }
    return min < max ? Math.trunc(min + Math.random() * (max - min)) : NaN;
}

function getArrayRandomIntNumbers(nNumbers, min, max, minInclusive = true, maxInclusive = false) {
    let res = [];
    res.length = nNumbers;
    return [...res].
        map(() => getRandomIntNumber(min, max, minInclusive, maxInclusive));
}

console.log(getRandomIntNumber(0, 7));
console.log(getArrayRandomIntNumbers(5, 0, 2));

const ar1 = [];
ar1.push(1, 2, 3);
ar1.length = 100;
console.log([...ar1]);

console.log([1, 2, 3].join());

console.log(getOrderedList(getArrayRandomIntNumbers(15, 0, 2)));

function getOrderedList(array) {
    return `<ul> ${getListItems(array)} </ul>`;
}

function getListItems(array) {
    return array.map(n => `<li class="item ${getBlackOrWhite(n)}"></li>`).join("");
}

function getBlackOrWhite(number){
    return !number ? "white" : "black";
}

// bodyId.innerHTML = getOrderedList(getArrayRandomIntNumbers(10, 0, 2));


function getMatrixRandomIntNumbers(rows, columns, min, max, minInclusive = true, maxInclusive = false) {
    let res = [];
    res.length = rows;
    return [...res].
        map(() => getArrayRandomIntNumbers(columns, min, max));
}

console.log(getMatrixRandomIntNumbers(20, 20, 0, 4));
