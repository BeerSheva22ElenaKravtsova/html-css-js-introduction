export default class DataGrid {
    pages;
    #tBodyElement;
    #keys;
    #cash;
    #tableActions;
    #pageActions;
    #parentId;
    #columnsInRow

    constructor(parentId, columns, caption, tableActions, pages, pageActions, isManyColumnsInRow) {
        this.#cash = [];
        this.#keys = columns.map((c) => c.field);
        this.#parentId = parentId;
        this.#buildTableHeader(parentId, caption, columns.map((c) => c.headerName));
        this.#tableActions = tableActions;
        this.#pageActions = pageActions;
        this.#columnsInRow = isManyColumnsInRow;
        this.pages = pages;
    }

    fillData(rowsData) {
        if (!this.#cash || JSON.stringify(this.#cash) !== JSON.stringify(rowsData)) {
            this.#tBodyElement.innerHTML = this.#pageActions ? `
            <div>
                ${this.#pageActions
                    .map(pageAction => `
                        <button data-action-button id="${pageAction.title}" class="button-page-image">
                            <img src=${pageAction.picture} alt=${pageAction.title} class="link-image">
                        </button>
                    `)
                    .join('')}
            </div>` : '';
            this.#tBodyElement.innerHTML += this.#columnsInRow ?
                rowsData.map(rd => this.#getRow(rd)).join('')
                : this.#getRow(rowsData);
            this.#cash = rowsData;
        }
            this.setActionListeners();
    }
 
    #buildTableHeader(parentId, caption) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `<table>
                <caption id="caption">${caption}</caption>
                <tbody id="${parentId}-table"></tbody>
            </table>`;
        this.#tBodyElement = document.getElementById(parentId + "-table");
    }

    #getRow(obj) {
        const rowClass = this.#columnsInRow ? "multyColumnRow" : "singleColumnRow";
        const tdClass = rowClass === "singleColumnRow" ? "customSingleColumnRow" : "";
        const row = `<td id="row-i${obj.id}" class="${rowClass} ${tdClass}">
            ${this.#getTds(obj)}
        </td>`;
        return row;
    }

    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj);
        this.setActionListeners();
    }

    clearRows() {
        this.#tBodyElement.innerHTML = "";
    }

    deleteRow(elementId) {
        const row = document.getElementById(`row-i${elementId}`);
        if (row) {
            row.remove();
        }
    }

    updateRow(obj) {
        const row = document.getElementById(`row-i${obj.id}`);
        if (row) {
            row.innerHTML = this.#getTds(obj);
            this.setActionListeners();
        }
    }

    updateTable(data) {
        if (!this.#cash || JSON.stringify(this.#cash) !== JSON.stringify(data)) {
        this.clearRows();
        this.fillData(data);
    }
}

    #getTds(obj) {
        const { id, image, ...otherData } = obj;
        const values = Object.values(otherData);
        const tdElement =
            ` 
            <div>
                <img src="${image}" class="image">
                ${Object.entries(otherData).map(([key, value]) => `<div ${key === "title" ? 'style="font-weight: bold; text-align: center;"' : ''}>${value}</div>`).join('')}
                ${this.#tableActions ? `
                    <div>
                        ${this.#tableActions
                    .map(action => `
                            <button data-table-button id="${obj.id}-${action.title}" class="button-under-image">
                                <img src=${action.picture} alt=${obj.id}-${action.title} class="link-image">
                            </button>
                            `)
                    .join('')}
                    </div>` : ''}
            </div>`
        return tdElement;
    }

    setActionListeners() {
        if (this.#tableActions) {
            const buttons = document.querySelectorAll(`#${this.#parentId} [data-table-button]`);
            buttons.forEach(b => {
                b.onclick = async () => {
                    const idTokens = b.id.split("-", 2);
                    const action = this.#tableActions.find(a => a.id === idTokens[1]);
                    if (action) {
                        await action.callbackFn(idTokens[0]);
                    }
                };
            });
        }
        if (this.#pageActions) {
            const buttons = document.querySelectorAll(`#${this.#parentId} [data-action-button]`);
            buttons.forEach(b => {
                b.onclick = async () => {
                    const id = b.id;
                    const action = this.#pageActions.find(a => a.title === id);
                    if (action) {
                        await action.callbackFn(this);
                    }
                };
            });
        }
    }

    hideButtons(setter, indexes) {
        const buttons = document.querySelectorAll(`#${this.#parentId} [data-table-button]`);
        buttons.forEach((button, buttonIndex) => {
            if (indexes.includes(buttonIndex % this.#tableActions.length)) {
                button.style.display = setter ? 'none' : 'inline';
            }
        });
    }

    hideTable(setter) {
        const tableSectionElement = document.getElementById(this.#parentId);
        tableSectionElement.hidden = setter;
    }

    getData(elementId) {
        const row = document.getElementById(`row-${elementId}`);
        const id = row.querySelector('#cell').textContent;
        const name = row.querySelector('#cell:nth-child(2)').textContent;
        const birthdate = row.querySelector('#cell:nth-child(3)').textContent;
        const gender = row.querySelector('#cell:nth-child(4)').textContent;
        const salary = row.querySelector('#cell:nth-child(5)').textContent;
        const department = row.querySelector('#cell:nth-child(6)').textContent;
        return { id, name, birthdate, gender, salary, department }
    }
}