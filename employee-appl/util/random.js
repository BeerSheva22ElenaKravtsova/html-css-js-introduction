const names = {
    "maleNames": ["Vasya", "Josef", "Abraham", "Yakob", "Asaf", "Mosez", "Itschak", "David"],
    "femaleNames": ["Asya", "Sara", "Rivka", "Olya", "Klara", "Galya"]
};

export function getRandomInt(min, max) {
    if (min == max) {
        max++;// не включая верхнюю границу
    } else if (min > max) {
        [min, max] = [max, min];
    }
    return Math.trunc(min + Math.random() * (max - min));
}

export function getRandomElement(array) {
    return array[getRandomInt(0, array.length)]
}

// export function getRandomSalary(min, max) {
//     return Math.floor(getRandomInt(min, max) / 1000) * 1000;
// }

    export function getRandomEmployee(minSalary, maxSalary, minBirthYear, maxBirthYear, departments) {
        const gender = getRandomElement(['male', 'female']);
        const name = getRandomElement(gender == 'female' ? names.femaleNames : names.maleNames);
        const birthYear = getRandomInt(minBirthYear, maxBirthYear+1);
        const salary = getRandomInt(minSalary, maxSalary) * 1000;
        const department = getRandomElement(departments);
        return {name, birthYear, gender, salary, department};
}