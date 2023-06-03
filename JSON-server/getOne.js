const URL = 'http://localhost:3500/employees/123'
fetch(URL).then(response => response.json()).
then(data => console.log(data));

//response.json()). возвращает промис
// 1 класс будет работать с массивом
// другой с JSON сервером