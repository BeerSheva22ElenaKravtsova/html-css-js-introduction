addItem.onclick = createItem;
item.onkeyup = function (e) {
    if(e.key == "Enter"){
        createItem();
    }

}

function createItem() {
    const text = item.value.trim();//удалить последние и начальные пробелы
    if (text) {//!= ""
        const li = document.createElement('li');
        const buttonDel = document.createElement('button');
        buttonDel.append(document.createTextNode('X'));
        buttonDel.classList.add('del');//добавить элементу класс
        buttonDel.onclick = removeParentElement;//не вызывать а просто присвоить
        li.append(document.createTextNode(text), buttonDel);
        todoList.append(li)
    }
    item.value = '';
}