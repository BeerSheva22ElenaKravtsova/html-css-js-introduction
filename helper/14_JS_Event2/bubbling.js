const clickHandler = function(e){
console.log(e.currentTarget.id);//печатается в консоль
// e.currentTarget = this
}

div1.onclick = clickHandler;
div2.onclick = clickHandler;
div3.onclick = clickHandler;

//событие всплывает до самого верха по всем родительским элементам
//target - объект на котором произошло событие (по которому я кликнул)
//currentTarget - только тот объект на котором сработало событие (функция)
