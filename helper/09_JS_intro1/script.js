console.log("Hello world");

let y = 5;
let x = 5;

console.log('exp = ${y}, or ${x}');

let res = 7 % 3;
console.log('res = ${res}');

//=35
x = 3 + '5';

//=-2
x = 3 - '5';

y = '';//=false
x = !y;//=true
x = !!y;//=false
console.log(x);

x = 2=='2';//true

x = true=='2';//false, тк не 2 приведены к true, a true приведен к 1