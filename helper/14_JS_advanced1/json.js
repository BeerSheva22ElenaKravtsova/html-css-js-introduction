const person ={
    firstName: "John",
    lastName:"Smith",
    fullname: function(){
        return `${this.firstName}${this.lastName}`
    }
}

console.log(typeof person);//object

const personJSON = JSON.stringify(person);//методы отбрасывает
console.log(personJSON);
console.log(typeof personJSON);//string

const personObject = JSON.parse(personJSON);
console.log(personObject);
console.log(typeof personObject);//Object

