let person = {
    name: "Peter"
}

person = null;
printName(person);

try {
    const res = solution(0, 0);
    console.log(`res=${res}`);
} catch (e) {
    console.log(e.message);
}

function solution(a, b) {
    if (a != 0) {
        return b / a;
    }
    if (b != 0) {
        throw new Error('no solution');
    }
    throw { message: `solution any number` };//можно бросать что угодно (в java тольк о наследников throwa)
}

function printName(obj) {
    try {
        return console.log(obj.name);
    }
    catch (e) {
        console.log(e);
        console.log(e.name);
        console.log(e.message);

        console.log("Error");
    } finally {
        console.log("Finally in printName");
    }
}