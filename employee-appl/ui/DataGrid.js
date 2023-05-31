export default class DataGrid {
    #tBodyElement
    #keys 
    #cash;

    constructor(parentId, columns) {
        //columns - array of objects {field:<name of key>, headerName:<column name>}
        //ключ - это поле объекта
        this.#keys = columns.map(c => c.field);
        this.#buildTableHeader(parentId, columns.map(c => c.headerName))
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

    // JSON.stringify(this.#cash) === JSON.stringify(rowsData) 
    // ? console.log(`${tableName} filled from cash`) 
    // : this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
    //   this.#cash = rowsData;
    //   console.log(`${tableName} is updated`);
// }

    #getRow(obj) {
        return `<tr>
            ${this.#keys.map(key => `<td id="cell">${obj[key]}</td>`).join('')
        }
            </tr>`
    }

    insertRow(obj){
        this.#tBodyElement.innerHTML += this.#getRow(obj);
    }

    clearRows() {
        this.#tBodyElement.innerHTML = "";
      }

    #buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `
            <table>
            <thead>
                 <tr>
                     ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                 </tr>
             </thead>
            <tbody id="${parentId}-table">
             </tbody>
        </table>
        `;
        this.#tBodyElement = document.getElementById(parentId + "-table");
    }
}








