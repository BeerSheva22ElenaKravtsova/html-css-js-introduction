const URL = 'http://localhost:3500/employees'
const employee = {name: "Sara", gender: "female",
salary:10000, department:"Development", birthYear: 2000};
fetch(URL,{//это конфигурация = гетъ
    method: 'POST',//заносим данные в БД
    headers: {'Content-Type':"application/json"},
    body: JSON.stringify(employee)//объекта не JSON

}).then(response => response.json()).
then(data => console.log(data));

//response.json()). возвращает промис
// 1 класс будет работать с массивом
// другой с JSON сервером

//запрос позволяющий добавлять нового имплои
//написать класс КомпаниСерверrestAPI
//гетИД делатьне надо если сервис увижит что его нет он его добавить