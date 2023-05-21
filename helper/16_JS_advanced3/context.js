//со старта 
console.log(this===window);

// const showName = function(){
//     console.log(this);
//     return `${this.firstName} ${this.lastName}`
// }

//2e отличие стрелочной функции от function expression:
//у стрелочной функции нет своего this
//без стрелочной функции у нее есть свой this
//когда ее вызывают она стала методом и this определяется тем что перед точкой
//стрелочная функция - нет this он уже заполнен это window
const showName = ()=>{
    console.log(this);
    return `${this.firstName} ${this.lastName}`
}

const john = {
    firstName: "John",
    lastName:"Smith"
}

const peter = {
    firstName:"Peter",
    lastName:"Jackson"
}

john.fullName = showName;//не вызываем а присваиваем
peter.fullName = showName;

console.log(john.fullName());
console.log(peter.fullName());
console.log(showName());//когда вызываем какую-то функцию, то this - это то что перед точкой, если этого нет - то window, у него поля firstName, lastName = undefined
//контекст - это то что перед точкой