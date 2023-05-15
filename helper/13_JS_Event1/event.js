// button.onclick = show;
// button.onclick = e => console.log(e.timeStamp);//перезапись
button.addEventListener('click', show);//так мы добавим несколько обработчиков на одно событие (клик)
button.addEventListener('click', e => console.log(e.timeStamp));

const names = [name1,name2];
names.forEach(n=>n.onkeyup=valueToUpperCase);
// name1.onkeyup=valueToUpperCase;//это вызывает браузер и при этом он передает объект события
// name2.onkeyup=valueToUpperCase;

//когда пользователь инициирует событие браузер создает объект по этому событию, мы можем его принять и работать с ним

function show(event) {
    // console.log(event.target);//после чего произошло событие - клик мышки
    // alert(name1.value);//содержимое того что там находится (то что мы вводим)
    names.forEach(n=>{
        const p = document.createElement('p');
        const text = document.createTextNode(n.value);
        p.appendChild(text);//все выводится на экран
        document.body.appendChild(p);
        p.value = '';//очистить поле ввода
        
    })
}

function valueToUpperCase(event){//это объект события - если он есть то браузер его создает
    // console.log(event.target);//после чего произошло событие - в каком-то поле ввели буквы
    // name1.value = name1.value.toUpperCase();//переводит в верхний регистр

    event.target.value = event.target.value.toUpperCase();
}


