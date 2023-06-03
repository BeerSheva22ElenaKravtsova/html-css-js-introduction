export default class DataGrid {
    #tBodyElement
    #keys
    #cash;
    #actions;
    #callBackFunctions;

    constructor(parentId, columns, actions, callbackFunctions) {
        //columns - array of objects {field:<name of key>, headerName:<column name>}
        //ключ - это поле объекта
        this.#keys = columns.map(c => c.field);
        this.#actions = actions;
        this.#buildTableHeader(parentId, columns.map(c => c.headerName));
        this.#callBackFunctions = callbackFunctions;
        this.#setActions();
    }

    fillData(rowsData, tableName) {
        if (JSON.stringify(this.#cash) !== JSON.stringify(rowsData)) {
            this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
            this.#cash = rowsData;
            console.log(`${tableName} is updated`);
        } else {
            console.log(`${tableName} filled from cash`);
        }
    }

    #getRow(obj) {
        return `
          <div class="table-content">
            <table id="row">
              <tr id="row-${obj.id}">
                ${this.#keys.map(key => `<td id="cell">${obj[key]}</td>`).join('')}
                ${this.#actions.map(action => `
                <td>
                    <button type="submit" id="${action.id}" data-row-id="${obj.id}">
                        <img src=${action.picture} alt=${action.title} class="link-image">
                    </button>
                </td>
                `).join('')}
              </tr>
            </table>
          </div>
        `;
    }

    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj);
    }

    clearRows() {
        this.#tBodyElement.innerHTML = "";
    }

    #setActions() {
        const handleClick = (event) => {
            const button = event.target.closest('button'); // Find the closest button element
            const buttonId = button.id;
            const buttonRowId = button.dataset.rowId;
            const action = this.#actions.find(a => a.id === buttonId);
            if (action) {
                const callBackFunction = this.#callBackFunctions.find(f => f.id === action.id);
                if (callBackFunction) {
                    callBackFunction.handler(buttonRowId);
                }
            }
        };
        this.#tBodyElement.addEventListener('click', handleClick);
    }

    deleteRow(elementId) {
        const row = document.getElementById(`row-${elementId}`);
        const id = row.querySelector('#cell').textContent;// Get the name from the first cell
        const name = row.querySelector('#cell:nth-child(2)').textContent;
        const birthdate = row.querySelector('#cell:nth-child(3)').textContent;
        const gender = row.querySelector('#cell:nth-child(4)').textContent;
        const salary = row.querySelector('#cell:nth-child(5)').textContent;
        const department = row.querySelector('#cell:nth-child(6)').textContent;
        row.remove();
        // this.#cash = {};
        return { id, name, birthdate, gender, salary, department }
    }


    // getRowData(rowId) {
    //     const row = document.getElementById(`row-${rowId}`);
    //     const rowData = {};
    //     if (row) {
    //         this.#keys.forEach((key, index) => {
    //             rowData[key] = row.querySelector(`#cell:nth-child(${index + 1})`).textContent;
    //         });
    //     }
    //     return rowData;
    // }

    // getRowIndex(rowId) {
    //     const row = document.getElementById(`row-${rowId}`);
    //     return row ? Array.from(row.parentNode.children).indexOf(row) : -1;
    // }

    // updateRow(rowIndex, rowData) {
    //     const row = this.#tBodyElement.children[rowIndex];
    //     if (row) {
    //         this.#keys.forEach((key, index) => {
    //             row.querySelector(`#cell:nth-child(${index + 1})`).textContent = rowData[key];
    //         });
    //     }
    // }

    #buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `
            <table>
            <thead>
                 <tr>
                     ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                     ${this.#actions.map(action => `<th>${action.title}</th>`).join('')}
                 </tr>
             </thead>
            <tbody id="${parentId}-table">
             </tbody>
        </table>
        `;
        this.#tBodyElement = document.getElementById(parentId + "-table");
    }
}

// remodeChild
// или у каждого ряда есть id объекта и мы удаляем ряд
// у родителя удалить ребенка по id
// слодность будет в Апдейте - будет форма выводиться
// можно встплывающим окном поверх таблицы
// уходит табл выходит форма
// потом уходит табл показ форма
// конструктор который принимает элемент который форма будет менять или доп функция
// в форму передать только элемент который будем менять
// год рождения и ИД не может поменять

// показать поля - будут изменения
// бубут кнопки на кажд строке с привязкой хэндлера
// код действия и что-то связанные с 
// потом появляется форма с изменяемым объектом
// сделать Сет чтобы всю форму не перерисовывать
// когда меняем данные - конструктор и новая форма - которая привязана к текущему объекту;

//обеспечить связть между контроллером и ДатаГрид обеспеч передачу инф о 
//над строчками таблицы
//оплучить служащего по ИД
//удалить служащего
//изменить

//ДатаГрид ничего не знает о действиях
//действия удалить и изменить
//некий код - имя Ремув
//связанная с этим функция
//что Мэйн передает - дополнительнл массив объектов - в виде actions
//каждый объект задает функцию и некий код

//если нажать на кнопку вызывается соотв фнукция которая передаетс в обхекте
//в эту функцию надо передать ИД объекта
//ИД должно быть связано со строкой та,л
//когда наж кнопка вызывается КолБек и туда передается ИД объекта соотв строе
//Мейн через Сервис выполняет опр действия
//действия над строчками таблицы

//удалить строчку
//добавить - есть
//
//в таблице дб методы удалить и добавить
//если речь об удалении - то одним из действий в Мейне будет вызвать функцию удаления из сервиса и выхвать функцию удаления из таблицы, чтобы без перерисовки всей таблицы
//строка которая удаляется - была удалена и из данных и из таблицы

//апдейт - строки в таблице не надо делать
//можно написать
//но можно 2 действия - удалить и добавить - нормально
//мейн управляет
//сервис работает с данными
//мейн передает КолБек фнукцию Ремув и слово Ремув
//таблица рисовать будет ремув и какой-то обработчик когда нажимается кнопка ремув
//ДатаГрид не значет что это ремув и апдейт - знает только инф коотрую принимает
//сервис - ремув, гет по ИД, апдейт

//мейн нитегрирует между ЮАЙ и Сервису - чтобы данные соотв изобр - изм данные, изме изобр
//мэен устанавливает действия при опр событиях
//добавить служ - сабмит
//нажата кнопка ремув соотв ряда - ряд не просто удален, но и удален оъек
//желательно вызвать контруктор который доп принимает объект для изменения?
//изображаемый объектна форме апейт должен быть на форме уже ведены значения
//вызвать эту форму - 
//простое решение - вместе с формой над таблице появляется форма для изменнеия после сабмита форма изчезает
//сложнее - когда идет Апдейт (управляет Мэйн) - метод таблицы закрой открой и у формы закрой открой, мб открой с объектом коотрый мы хотим показать
//открыть форму - обёект который мы открываем и все поля можно изменить кроме поля Дата рождения
//после сабмита - форма уходит, таблица появляется
//это управление делает Мэйн

//самый сложный - модальное окно
//таблица не исчевает - он светлее
//в центре в белом фоне таблица (небольшая трехмерность) - окно форму для апдейта
//когда апдейт - исчезает окно коотрое было дляизменнеия служащего

//когда рисуем - выражение - есть value, readonly...
//если открытеи формы с объектом изображаем значение объекта
//мэйн и сервис не работает в документом
//