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

//60 заданий на 1 час сайт

//сделать валидацию и в зависимости от нее определить какие поля красные без единого Хэндлера
//но если делаем без хэндлера должен быть Рекуайред, все инпут элементы должны иметь атрибут Нэйм
//иначе не сможем поулчить значения

const RANDOM_BUTTON_ID = 'random-button';
const NAME_ID = 'name';
const BIRTH_YEAR_ID = 'birthYear';
const GENDER_ID = 'gender';
const SALARY_ID = 'salary';
const DEPARTMENT_ID = 'department';
const FORM_ID = 'form-id';

export default class EmployeeForm {
    #dataObj;
    #formElement;

    #nameElement;
    #birthYearElement;
    #genderElement;
    #salaryElement;
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
    }

    #setSelectOptions() {
        setOptionItems(this.#departmentElement, this.#departments, 'Select department');
    }

    #setElements() {
        this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        this.#nameElement = document.getElementById(`${this.#parentId}-${NAME_ID}`);
        this.#birthYearElement = document.getElementById(`${this.#parentId}-${BIRTH_YEAR_ID}`);
        this.#genderElement = document.getElementById(`${this.#parentId}-${GENDER_ID}`);
        this.#salaryElement = document.getElementById(`${this.#parentId}-${SALARY_ID}`);
        this.#departmentElement = document.getElementById(`${this.#parentId}-${DEPARTMENT_ID}`);
    }

    #fillForm() {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = `
        <form class="form-control" id="${this.#parentId}-${FORM_ID}">
            <div class="header">Please fill out this form:</div>
            <div class="row-input">
                <label class="label-input" for="${this.#parentId}-${NAME_ID}">Name: </label>
                <input type="text" id="${this.#parentId}-${NAME_ID}" class="input-control" name="nameEmpl" placeholder="John Smith" required>
            </div>    

            <div class="date-group-control">
                <label class="label-input" for="${this.#parentId}-${BIRTH_YEAR_ID}">Birth date: </label>
                <input type="date" id="${this.#parentId}-${BIRTH_YEAR_ID}" class="input-control" name="birthYear" min="${this.#minBirthYear}-01-01" max="${this.#maxBirthYear}-12-31" required>
            </div>

            <form class="radio-form-control" id="${this.#parentId}-${GENDER_ID}">
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
            </form>

           
            <div class="row-input">
                <label class="label-input" for="${this.#parentId}-${SALARY_ID}">Salary: </label>
                <input type="number" id="${this.#parentId}-${SALARY_ID}" name="salary" min="${this.#minSalary * 1000}" max="${this.#maxSalary * 1000}" placeholder="enter salary" required>
            </div>

            <div class="row-input">
                <label class="label-input" for="${this.#parentId}-${DEPARTMENT_ID}">Select Department: </label>
                <select id="${this.#parentId}-${DEPARTMENT_ID}" name="department" class="select-control" class="input-control" required></select>
            </div>

            <div class="buttons-group">
                <button type="submit">Submit</button>
            </div>
        `
    }

    addHandler(submitFunction) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);            
            this.#dataObj.nameEmpl = formData.get('nameEmpl');
            this.#dataObj.birthYear = formData.get('birthYear').getFullYear();
            this.#dataObj.gender = formData.get('gender');
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.department = formData.get('department');
            await submitFunction(this.#dataObj);
        }
    }
}

// this.#buttonElement.onclick = () => submitFunction;

function setOptionItems(element, options, placeHolder) {
    element.innerHTML = `<option value hidden selected>--${placeHolder}--</option>`;
    element.innerHTML += options.map(o => `<option value="${o}">${o}</option>`).join('');
}


        // this.#formElement.onreset = () => {
        //     this.#dataObj = {};
        //     this.#setSelectOptions();
        //     this.#formElement.reset();
            // resetFunction();
        // }
    // <button type="reset">Reset</button>
//     имя -  Регекс - паттерн (без цифр, с большой буквы)
//     деп селект
//     зп инпут с проверкой
//     годы - календарь с рождением с проверкой
//     если неправильные значения - красный цвет поля

// таблица ДатаГрид добавляется понятие Экшнс
// Каждому ряду (если они есть) добавляются какие-то иконки
// каждая иконка - передает контроллер

// нажатая иконка кажимается - соотв код Экшн - вызывается соотв код Экшн
// delete
// update

// delete - должна получить ID 
// будет вызываться функция передаваться Код Экшн и соверш действие

// Ремув вызывается с данных + ремув строчки таблицы (не всю таблицу перерисовать, если находимя на таблице - видим удаленный объект - сделать удаление ряда)
// в таблицу добавить методж clear
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

   //ряды по 2 айтема в каждом ряде
    //гриды - надстройка над флекс моделью
    //описываем айтемы без доп дивов говорим сколько айтемов в ряду