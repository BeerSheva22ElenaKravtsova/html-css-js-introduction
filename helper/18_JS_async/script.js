sendPostId.onclick = e => {//объект событий Ивэнт, this e.currentTarget вместо этого объект событий на котором произошла обработка
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId.value}`)//при клике отправь запрос, дождись ответа
        .then(response => {
            if (response.ok) {//response.ok (любой код от 200 до 299), можно также response.status ===200
                return response.json();
            } else {
                throw new Error(response.status);//так попадаем в catch
            }
        })
        .then(data => {
            const h1 = document.createElement("h1");
            h1.appendChild(document.createTextNode(`ID: ${data.id}, Title: ${data.title}, Body: ${data.body}`))
            document.body.appendChild(h1);
        })
        .catch(e => {
            console.log(e);
            const h1 = document.createElement("h1");
            h1.appendChild(document.createTextNode(`O-o-ops ${e.message}`))
            document.body.appendChild(h1);
        });
}

//сервер APILayer
//дз название валюты сумма конвертация