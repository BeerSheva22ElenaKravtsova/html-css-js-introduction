const NAME_ID = 'name';
const BIRTH_YEAR_ID = 'birthYear';
const GENDER_ID = 'gender';
const SALARY_ID = 'salary';
const DEPARTMENT_ID = 'department';
const FORM_ID = 'form-id';

export default class EmployeeForm {
    #dataObj;
    #formElement;
    #departmentElement;
    #parentId;

    #minBirthYear;
    #maxBirthYear;
    #minSalary;
    #maxSalary;
    #departments;

    constructor(parentId, minBirthYear, maxBirthYear, minSalary, maxSalary, departments) {
        this.#parentId = parentId;
        this.#minBirthYear = minBirthYear;
        this.#maxBirthYear = maxBirthYear;
        this.#minSalary = minSalary;
        this.#maxSalary = maxSalary;
        this.#departments = departments;
        this.#dataObj = {};
        this.#fillForm();
        this.#setElements();
        this.#setSelectOptions();
        this.hideForm(true);
    }

    #setSelectOptions() {
        setOptionItems(this.#departmentElement, this.#departments, 'Select department');
    }

    #setElements() {
        this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        this.#departmentElement = document.getElementById(`${this.#parentId}-${DEPARTMENT_ID}`);
    } 

    #fillForm() {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = `
        <form class="form-control" id="${this.#parentId}-${FORM_ID}" method="post"">
            <div class="header">Please fill out this form:</div>

                <label class="label-input" for="${this.#parentId}-${NAME_ID}">Name: </label>
                <input type="text" id="${this.#parentId}-${NAME_ID}" class="input-control" name="nameEmpl" placeholder="John / John Smith" required>
            </div>    

            <div class="date-group-control">
                <label class="label-input" for="${this.#parentId}-${BIRTH_YEAR_ID}">Birth date: </label>
                <input type="date" id="${this.#parentId}-${BIRTH_YEAR_ID}" class="input-control" name="birthYear" min="${this.#minBirthYear}-01-01" max="${this.#maxBirthYear}-12-31" required>
            </div>

            <div class="radio-form-control" id="${this.#parentId}-${GENDER_ID}">
                <div class = "radio-group">
                    <div class = "radio-gender-control">
                        <label for="male-id">Male: </label>
                        <input id="male-id" type ="radio" name= "gender" class="input-control" required value="male" unchecked>
                    </div>

                    <div class = "radio-gender-control">
                        <label for="female-id">Female: </label>
                        <input id="female-id" type ="radio" name= "gender" class="input-control" required value="female" unchecked>
                    </div>
                </div>
            </div>

            <div class="row-input">
                <label class="label-input" for="${this.#parentId}-${SALARY_ID}">Salary: </label>
                <input type="number" id="${this.#parentId}-${SALARY_ID}" name="salary" min="${this.#minSalary * 1000}" max="${this.#maxSalary * 1000}" placeholder="enter salary" required>
            </div>

            <div class="row-input">
                <label class="label-input" for="${this.#parentId}-${DEPARTMENT_ID}">Select Department: </label>
                <select id="${this.#parentId}-${DEPARTMENT_ID}" name="department" class="select-control" class="input-control" required></select>
            </div>

            <button type="submit">Submit</button>
            <button type="reset">Reset</button>

        </form>
        `
    }

    addHandler(submitFunction) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);            
            this.#dataObj.name = formData.get('nameEmpl');
            this.#dataObj.birthYear = new Date(formData.get('birthYear')).getFullYear();
            this.#dataObj.gender = formData.get('gender');
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.department = formData.get('department');
            await submitFunction(this.#dataObj);
            this.#formElement.reset();
        }
        this.#formElement.onreset = () => {
            this.#dataObj = {};
            this.#setSelectOptions();
        }
    }

    getEmployeeId() {
        return this.#dataObj.id;
    }
    
    hideForm(setter) {
        const formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        formElement.hidden = setter;
    }

    openPrescribedForm(employee) {
        this.setPrescribedValues(employee);
        this.setFieldsDisabled(true);
        this.setButtonsDisabled(true);
        this.hideForm(false);
    }

    setPrescribedValues(employee) {
        const nameField = document.getElementById(`${this.#parentId}-${NAME_ID}`);
        const salaryField = document.getElementById(`${this.#parentId}-${SALARY_ID}`);
        const departmentField = document.getElementById(`${this.#parentId}-${DEPARTMENT_ID}`);
        nameField.value = employee.name;
        salaryField.value = employee.salary;
        departmentField.value = employee.department;
    }

    closePrescribedForm() {
        this.hideForm(true);
        this.setButtonsDisabled(false);
        this.setFieldsDisabled(false);
        const nullEmployee = {
            name: null,
            salary: null,
            department: null
        }
        this.setPrescribedValues(nullEmployee);
    }

    setButtonsDisabled(setter){
        const buttons = Array.from(document.getElementsByClassName("main-buttons"));
        buttons.forEach(button => button.disabled = setter);
    }

    setFieldsDisabled(setter){
        document.getElementById("male-id").disabled = setter;
        document.getElementById("female-id").disabled = setter;
        document.getElementById(`${this.#parentId}-${BIRTH_YEAR_ID}`).disabled = setter;
    }
}

function setOptionItems(element, options, placeHolder) {
    element.innerHTML = `<option value hidden selected>--${placeHolder}--</option>`;
    element.innerHTML += options.map(o => `<option value="${o}">${o}</option>`).join('');
}