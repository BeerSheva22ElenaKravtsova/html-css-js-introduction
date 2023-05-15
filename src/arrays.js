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
// console.log([1, 2, 3].map(n => n ** 2));

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

// console.log(getRandomIntNumber(0, 7));
// console.log(getArrayRandomIntNumbers(5, 0, 2));

const ar1 = [];
ar1.push(1, 2, 3);
ar1.length = 100;
// console.log([...ar1]);

// console.log([1, 2, 3].join());

// console.log(getOrderedList(getArrayRandomIntNumbers(15, 0, 2)));

function getOrderedList(array) {
    return `<ul> ${getListItems(array)} </ul>`;
}

function getListItems(array) {
    return array.map(n => `<li class="item ${getBlackOrWhite(n)}"></li>`).join("");
}

function getBlackOrWhite(number) {
    return !number ? "white" : "black";
}

// bodyId.innerHTML = getOrderedList(getArrayRandomIntNumbers(10, 0, 2));


function getMatrixRandomIntNumbers(rows, columns, min, max, minInclusive = true, maxInclusive = false) {
    let res = [];
    res.length = rows;
    return [...res].
        map(() => getArrayRandomIntNumbers(columns, min, max));
}

// console.log(getMatrixRandomIntNumbers(20, 20, 0, 4));

//push - вставить в конец массива
//shift - вставить в начало массива
//splice - вставить в середину массива, удалить, заменить
let arS = [10, 20, -70, 100, 6, -10, 0];
const arI = [1, 2, 3];
let index = arS.indexOf(-70);
arS.splice(index + 1, 0, ...arI);//откуда вставить., сколько удалить, что вставить
console.log(arS);

console.log(arS.splice(index + 1, 3));//возвращает то что удалили
console.log(arS);

//slice - не меняет массив, а вырезает из него часть
//первый парамерт - начальный индекс, второй - конечный индекс (не вкл)
console.log(arS.slice(index + 1, index + 4));

let indexFirstNegative = arS.findIndex(n => n < 0);
// console.log(indexFirstNegative);
// arS = arS.filter(v => v > 0);
console.log(arS);

//every - true если все элементы массива подходят под предикат
//some - если хотя бы 1 элемент
console.log(arS.every(v => v > 0));
console.log(arS.some(v => v < 0));

function arrayCopy(sourseArr, startPosInScr = 0, destArr = [], startPosInDest = 0, length = sourseArr.length) {
    let newSourseArr = sourseArr.slice(startPosInScr, startPosInScr + length);
    destArr.splice(startPosInDest, newSourseArr.length, ...newSourseArr);
    return destArr;
}

let sourseArr = [0, 1, 2, 3, 4, 5, 6, 7];
let destArr = [45, 56, 67, 78, 89, 90, 12, 23, 34, 45, 56];

console.log(`arrayCopy = ${arrayCopy(sourseArr, 5, destArr, 2, 10)}`);

function moveElement(array, position, shift) {
    shift = shift < 0 && (position + shift < 0) ? -position : shift;
    array.splice(position + shift, 0, ...array.splice(position, 1));
    return array;
}

let moveArr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(`moveElement = ${moveElement(moveArr, 4, -3)}`);

console.log([1, 2, 3].reduce((res, cur) => res + cur, 10));//первый аргумент функция, второй - первоначальное значение (если его нет, то функция принимает 1й элемент массива и итерации начинатся со 2го массива)

console.log([1, 2, 3].reduce((res, cur) => res > cur ? cur : res));
//     if (res > cur) { //тоже самое
//         res = cur;
//     }
//     return res
// }));

const arRes = [1, 2, 3, 5, 6, 7, 8, 9];

console.log(arRes.reduce((accum, cur) => {
    if (cur < accum[0]) {
        accum[0] = cur;
    }
    else if (cur > accum[1]) {
        accum[1] = cur;
    }
    return accum;
}, [arRes[0], arRes[0]]));

//меняет массив и возвращает измененный массив
//принимает функцию компаратор
//сортирует массив в порядке возрастания

// отриц число если 1 меньше 2
// 0 если 1 = 2 
// положит число - меняем местами
// возвращать положит число если нужно менять местами, если

//по умолчанию преобразует в строки и их сортирует, 
//если не задать компаратор ((a,b)=>a-b) то будет рассматривать как числа
//если будет компаратор и мы зададит строку - то строка будет в конце (потому что ее не проверить)

const arraySort = [2, 3, 123, 200, 99, -5, 'abc'];
console.log(arraySort.sort((a,b)=>a-b));





