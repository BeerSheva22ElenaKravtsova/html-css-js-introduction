fetch("https://jsonplaceholder.typicode.com/posts/10")
    //получил URL и вернул объект, с которыми начинают работать then

    // .then(response => console.log(response.headers.get('Content-Type')))//значение по имени заголовка
    .then(response => response.json())//возвращает Promise
    .then(data => {
        const h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(`Title: ${data.title}`))
        document.body.appendChild(h2);
    })
    .catch(e => {
        const h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(`Ooooops 404`))
        document.body.appendChild(h2);
    });

    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("My First Fetch:"))
    document.body.appendChild(h1);