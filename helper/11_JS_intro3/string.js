let x = "   To be or noy to be   ";
console.log(x);

x.trim();//убрать пробелы в начале и в конце
let res = x.split(" ");//пишем какой будет разделитель
console.log(res);

x.length(res);//количество букв
x.charAt(2);// = x[2] обращение по индексу
x.indexOf("e");//с какой позиции начинается
x.lastIndexOf("e");//какая последняя позиция

x.startsWith("to");//булеан начинается ли с этого

x.substring(4,8);//подстрока по таким-то индексам (если 1 арг - то начиная с этого и до конца)
x.slice(4,8);//разница в работе с отриц числами