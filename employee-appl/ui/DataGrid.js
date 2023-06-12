export default class DataGrid {
    #tBodyElement
    #keys
    #cash;
    #actions;
    #callBackFunctions; 

    constructor(parentId, columns, actions, callbackFunctions) {
        //columns - array of objects {field:<name of key>, headerName:<column name>}
        this.#keys = columns.map(c => c.field);
        this.#actions = actions;
        this.#cash = [];
        this.#buildTableHeader(parentId, columns.map(c => c.headerName));
        this.#callBackFunctions = callbackFunctions;
        this.#setActions();
    }

    fillData(rowsData, tableName) {
        if (!this.#cash || JSON.stringify(this.#cash) !== JSON.stringify(rowsData)) {
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
            const button = event.target.closest('button');
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

    getData(elementId){
        const row = document.getElementById(`row-${elementId}`);
        const id = row.querySelector('#cell').textContent;
        const name = row.querySelector('#cell:nth-child(2)').textContent;
        const birthdate = row.querySelector('#cell:nth-child(3)').textContent;
        const gender = row.querySelector('#cell:nth-child(4)').textContent;
        const salary = row.querySelector('#cell:nth-child(5)').textContent;
        const department = row.querySelector('#cell:nth-child(6)').textContent;
        return { id, name, birthdate, gender, salary, department }
    }

    deleteRow(elementId) {
        const row = document.getElementById(`row-${elementId}`);
        row.remove();
    }

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

//сложнее - когда идет Апдейт (управляет Мэйн) - метод таблицы закрой открой и у формы закрой открой, мб открой с объектом коотрый мы хотим показать
//открыть форму - обёект который мы открываем и все поля можно изменить кроме поля Дата рождения
//после сабмита - форма уходит, таблица появляется
//это управление делает Мэйн