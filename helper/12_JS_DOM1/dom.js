// console.log(document.body.innerHTML);

// document.body.innerHTML = '<h1>Hello world!</h1>'

// console.log(document);

//ищем объект
const div1 = document.getElementById("div1");
// console.log(div1.title)

//меняем элемент
div1.style.border="1px solid black";
div1.style.backgroundColor="pink";


// возвращает псевдомассив ссылок на все параграфы - есть длина и квадр скобка
const p = document.getElementsByTagName('p');

//querySelector найти первый параграф ребенка div1
const pDiv1 = document.querySelectorAll('#div1 > p');
// console.log(div1 == pDiv1);
for (let index = 0; index < pDiv1.length; index++) {
    pDiv1[index].innerHTML = `<span>new text ${index+1}</span>`;  
}

// childNodes - все узлы (текстовые, элемент, комментарий)
const children = div1.children; 
console.log(children.length)

for (let index = 0; index < children.length; index++) {
    children[index].style.color="red";
}

//создать элемент
const newP = document.createElement("p");
//создать узел текст
const newPText = document.createTextNode("This text created with special method");
//добавить текст в элемент (в конец)
newP.appendChild(newPText);
//добавить элемент в Див (что и куда) - перед первым ребеноком
div1.insertBefore(newP, div1.firstElementChild);

//до брата
// document.body.insertBefore(newP, div1.nextElementSibling);

//заменить 1 элемент на другой
const newP2 = document.createElement("p");
const newP2Text = document.createTextNode("p2 text created with special method");
newP2.appendChild(newP2Text);
div1.replaceChild(newP2, div1.lastElementChild);

//удалить элемент
div1.removeChild(div1.firstChild.nextElementSibling);






