// объект - информация
// структура объекта ключ - имя поля
// JSON - java script obj Notification

const person = {
    name: 'Vasya', id: 123, birthYear: 1990, address: {
        country: 'Israel', city: 'Rehovot'
    }
}

function createPerson(id, name, birthYear, country, city) {
    return {
        id, name, birthYear,
        address: { country, city }
    }
}

//== дя оъектов это isSame - сравниваются ссылки а при создании Объектов они разные
//==isEqual - его нет в JS
const person1 = createPerson(1223, 'Vasya', 1999, 'Israel', 'Rehovot');
const person2 = createPerson(1223, 'Vasya', 1999, 'Israel', 'Rehovot');
console.log(`person1 == person2 is${person1 == person2}`)//isFalse

//два способа добраться до имени
console.log(person1.name);
//второй способ через массив по ключу, а квадратные скобки - это выражение
// console.log(person1[id]);

function displayKeyValue(person, key1, key2) {
    if (key2) {
        console.log(`key1 ${key1}, key2 ${key2}, value is ${person[key1][key2]}`);
    } else {
        console.log(`key ${key1} is ${person[key1]}`);
    }
}

displayKeyValue(person1, 'address', 'city');

// JS classes: Array, Function, String, Number, Boolean, Object
// методы - получить все ключи, все значения объектов, все входы (что-то вроде Энтри)
console.log(Object.keys(person1));//возвращает массив строк

//дает все ключи объекта в массиве
console.log('keys', Object.keys(person1));

//дает все значения объекта в массиве
console.log('values', Object.values(person1));

//entries - массив массивов (первый элемент ключ, второй - значение)
console.log('entries', Object.entries(person1));

const x = {};
x["ab"] = 10;//вставить в массив по такому-то индексу (если есть меняем, если нет - вставляем)
x["ab"]++;
console.log(x["ab"]);

function displayOccurrences(array) {
    // let res = {};
    // array.forEach((v) => res.hasOwnProperty(v) ? res[v]++ : res[v] = 1);
    // Object.entries(res).sort((e1, e2) => e2[1] - e1[1]).forEach(([k, v]) => {
    //     console.log(`${k} -> ${v}`)
    // });

    ///...obj - возвращаю объект который принял (вот все поля объекта)
    //s - но в этом объекте я меняю значение поля внутри (выражение что находится внутри) s
    //obj[s] - если оно существует добавляем 1, если нет - ставим значение 1
    //
    const occurrences = array.reduce((obj, s) => ({//им поля внутри объекта
        ...obj, [s]: obj[s] ? obj[s] + 1 : 1
    }), {});
    Object.entries(occurrences).sort((e1, e2) => e1[1] == e2[1] ?
        e1[0].localeCompare(e2[0]) : e2[1] - e1[1]).
        forEach(e => console.log(`${e[0]} -> ${e[1]}`))

}

displayOccurrences(['lmn', 'ab', 'lmn', 'c', 'd', 'ab', 'a', 'a', 'lmn']);

const y = { xx: 0 };
//если y[xx] - ошибка то это выражение и исключение - ошибка ссылки
//y.xx - обращаюсь к полю и если его нет то это андефайнд
console.log(y.xx)

// удалить поля из объекта - оператор delete, это не функция
delete y.xx;

//анаграма
function isAnagram(word, anagram) {
    let res = false;
    if (word.length == anagram.length) {
        word = word.toLowerCase();
        anagram = anagram.toLowerCase();
        const occurrences = getOccurences(Array.from(word));
        res = Array.from(anagram).every(s => occurrences[s]-- > 0);//уменьшаем пока больше 0
    }
    return res;
    // const obj = word.toLowerCase().split('').reduce((obj, cur) =>
    //     ({ ...obj, [cur]: obj[cur] ? obj[cur] + 1 : 1 }), {});
    // anagram.toLowerCase().split('').forEach(letter => {
    //     obj[letter] = obj[letter] ? obj[letter] - 1 : -1;
    //     if (obj[letter] === 0) {
    //         delete (obj[letter]);
    //     }
    // });
    // return Object.keys(obj).length == 0;
}

function getOccurences(array) {
    return array.reduce((obj, s) => ({
        ...obj, [s]: obj[s] ? obj[s] + 1 : 1
    }), {});
}


console.log(isAnagram('yellow', 'loweyl'));
console.log(isAnagram('yellow', 'yellob'));

