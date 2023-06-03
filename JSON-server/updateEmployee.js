const URL = 'http://localhost:3500/employees/126'
const employee = {name: "Vova", gender: "male",
salary:20000, department:"Audit", birthYear: 2000};
fetch(URL,{//это конфигурация = гетъ
    method: 'PUT',//изменяет данные в БД
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

//CompanyService
//CompanyRestService
//если сервер не запущен - получим fain
//закрыть JSON server - ctrl +c
//получить все деструктурированные поля и что-то изменено