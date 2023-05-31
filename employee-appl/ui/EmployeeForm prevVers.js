//config: min & max Salary
//форма проверяет
//это Хэндлер который проверяет и если есть ошибка - он отмечает ошибку на экране

//добавить кнопки чтобы самим получать сотрудников

//config: min & max Salary
//форма проверяет
//это Хэндлер который проверяет и если есть ошибка - он отмечает ошибку на экране
//радиоБаттон - пол
//потом идут статистики:

//форма
//имплои форм
//эддХэнд - принимает сабмит
//там будет не баттонЭл - а форма и ОнСабмит
// там мы определяем функциональность, у которой СабмитФанк принимает объект
//мы должны написать форму
//в реальной форме для ввода данных будет:
//ИД не будет вводиться
//вводится: имя, зп, 
//выбирается из списка Департмент, пол (радиоБаттон а не селект)
//год - календарь
//взять из даты только год (у нас так сделано)


//html inputElements
//InputTypes
//range - шкала

//radio - это возможность выбора только 1 значения для тех радио у которых есть
//в каждом элементе Инпуст есть атрибут Нэйм
//те радиоБаттоны у которых 1 и тот же Нэйм будет 1 какое-то значение
//это значение будет значение элемента с этим именем Нэйм

//select - модет быть множ (не 1 пункт а неск)

//formData - 
//для ЧекБоксов и Рэдио - их мб несколько но ОнЧендж не используется

//если нажимаем на Сабмит:
//с точки значения семантики (например опр диапазон ЗП - если нет Обвести поле ввода зп в красную рамку и написать причину, почему не прошло)
//например зп не входит в диапазон
//и не дать возможность нажать на сабмит
//диапазон зп проверяет форма (не Мэйн)

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

