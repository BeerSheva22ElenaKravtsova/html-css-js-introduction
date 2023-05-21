class User{
    constructor(nickName){
        this.nickName=nickName;
        this.infoFunc=this.infoFunc.bind(this);//если без стрелочной функции и тогда потом ничего не привязать
    }
    infoFunc = function(greeting, symbol){
        console.log(`${greeting} nickName ${this.nickName}${symbol}`);
    }

    infoArrow = () => {
        console.log(`NickName ${this.nickName}`);
    }
}

const peter = new User("Peter");
// console.log("");
peter.infoFunc("Mr", "!");//передаем значения аргументов, которые не были переданы в методе
peter.infoArrow();

console.log("======Context Lose=======");

// const f = peter.infoFunc;//она ждала пока кто-то ее вызовет чтобы подставить его под this
// f();//ошибка потому что перед вызовом нет класса

const f = peter.infoArrow;//когда создали объект в 14 строке this подставили peter
f();

function fn(callback){
    callback();
}

fn(peter.infoArrow);//нормально
// fn(peter.infoFunc);//потеря контекста

const john = {
    nickName: "John"
}
const f1 = peter.infoFunc.bind(john);//привязать того кто будет контекстом
f1("Mr", ".");//вызвать привязав аргументы

//APPLY и CALL !!! - вызывают сразу
const mary=new User("Mary");
mary.infoFunc.call(john, "Mr", "?");//в отл от bind он ничего не возвращает а сразу вызывает функцию с этим контекстом
mary.infoFunc.apply(peter, ["Mr", "!"]);//принимает массив