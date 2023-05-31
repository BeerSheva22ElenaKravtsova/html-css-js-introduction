//config: min & max Salary
//форма проверяет
//это Хэндлер который проверяет и если есть ошибка - он отмечает ошибку на экране

// const ID_ID = 'id';
// const NAME_ID = 'name';
// const BIRTH_YEAR_ID = 'birthYear';
// const GENDER_ID = 'gender';
// const SALARY_ID = 'salary';
// const DEPARTMENT_ID = 'department';
// const FORM_ID = 'form-id';

export default class EmployeeForm{
    #buttonElement;
    #parentElement;

    // #idFrom;
    // #idTo;
    // #salaryFrom;
    // #salaryTo;
    // #ageFrom;
    // #ageTo;
    // #departments;
    // #gender;

    constructor(parentId){
        this.#parentElement = document.getElementById(parentId);
        this.#fillSection();
        this.#buttonElement = document.getElementById('button-id');
        // this.#buildForm();
    } 

    #fillSection() {
        this.#parentElement.innerHTML = 
        `
        <button id="button-id">
        Add random employee data
        </button>
        `
    }

    addHandler(submitFunction){
        this.#buttonElement.onclick = () => submitFunction;
        // return new Promise(resolved =>{
        //     this.#buttonElement.onclick = () => resolved();
        // })
    }

    // #buildForm(){
    //     const parentElement = document.getElementById(this.parentId)
    //     parentElement.innerHTML += `
    //     <form id="${this.parentId}-${FORM_ID}" class="form-control">
    //         <div class="row-input">
    //             <input id="${this.parentId}-${ID_ID}" type="text" class="select-control" required>
    //             <input id="${this.parentId}-${NAME_ID}" type="text" class="select-control" required>
    //         </div>

    //         <div class="row-input">
    //             <select id="${this.parentId}-${BIRTH_YEAR_ID}" class="select-control" required></select>
    //             <select id="${this.parentId}-${GENDER_ID}" class="select-control" required></select>
    //         </div>

    //         <div class="row-input">
    //         <select id="${this.parentId}-${SALARY_ID}" class="select-control" required></select>
    //         <select id="${this.parentId}-${DEPARTMENT_ID}" class="select-control" required></select>
    //     </div>
    //         <div class="buttons-group">
    //             <button type="submit">Submit</button>
    //             <button type="reset">Reset</button>
    //         </div>
    //     </form>
    //     `
    // }
}

