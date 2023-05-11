let a = "John";
let b = false;
let res = a || b;
//true - берет первое и все
//лдя вычисления приводит к булеан
//всегда берет первый аргумент если он = true, иначе второй аргумент
console.log(res);

//если первый фолс то 1, иначе 2
a= false;
b = true;
res = a && b;
console.log(res);

//если 1 фолс то 2
let str;
let nickName = str || "Anonymous";
console.log(`name = ${nickName}`);

function greeting(name = "Anonymous"){//дефолтное значение функции (если undefined)
    // name = name || "Anonymous"
    // name name ?? "Anonymous" //если null или undefined
    console.log(`Hello ${name}`);
}
greeting("Elena")