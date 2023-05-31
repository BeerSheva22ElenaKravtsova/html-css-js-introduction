import ApplicationBar from "./ui/ApplicationBar.js"
import EmployeeForm from "./ui/EmployeeForm.js"
import DataGrid from "./ui/DataGrid.js"
import { getRandomEmployee } from "./util/random.js"
import companyConfig from "./config/company-config.json" assert {type: "json"};
import statisticsConfig from "./config/statistics-config.json" assert {type: "json"};
import CompanyService from "./service/CompanyService.js"
import { range } from "./util/number-functions.js";
import Spinner from "./ui/Spinner.js";
const N_EMPLOYEES = 100;

const sections = [
    { title: "Employees", id: "employees-table-place" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];

// const statisticsIndex = sections.findIndex(s => s.title == "Statistics");
// const employeesIndex = sections.findIndex(s => s.title == "Employees");

const employeeColumns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Employee Name" },
    { field: "birthYear", headerName: "Birth Year" },
    { field: "gender", headerName: "Gender" },
    { field: "salary", headerName: "Salary" },
    { field: "department", headerName: "Department" }
]

const statisticColumns = [
    { field: "min", headerName: "Min value" },
    { field: "max", headerName: "Max value" },
    { field: "count", headerName: "Number of Employees" }
]

// const statisticGenderColumns = [
//     {field: "gender", headerName: "Gender"},
//     {field: "numberOfEmployees", headerName: "Number of Employees"}
// ]

const menu = new ApplicationBar("menu-place", sections, menuHandler);
const companyService = new CompanyService();
const { minBirthYear, maxBirthYear, minSalary, maxSalary, departments } = companyConfig;
const { age, salary } = statisticsConfig;

const employeeForm = new EmployeeForm("employees-form-place");
const employeeTable = new DataGrid("employees-table-place", employeeColumns, "employeeTable");
const statisticAgeTable = new DataGrid("statistics-age-place", statisticColumns, "statisticAgeTable");
const statisticSalaryTable = new DataGrid("statistics-salary-place", statisticColumns, "statisticSalaryTable");
// const statisticGenderTable = new DataGrid("statistics-gender-table", statisticGenderColumns);

const spinner = new Spinner("spinners-id");

employeeForm.addHandler(async data => {
    const employee = getRandomEmployee(minSalary, maxSalary, minBirthYear, maxBirthYear, departments);
    await action(companyService.addEmployee.bind(companyService, employee));
});

async function menuHandler(index) {
    switch (index) {
        case 0: {
            const employeesData = await action(companyService.getAllEmployees.bind(companyService));
            employeeTable.fillData(employeesData, 'employeeTable');
            break;
        }
        case 1: {
            const employee = getRandomEmployee(minSalary, maxSalary, minBirthYear, maxBirthYear, departments);
            await action(companyService.addEmployee.bind(companyService, employee));
            break;
        }
        case 2: {
            const ageStatisticsData = await action(companyService.getStatistics.bind(companyService, age.field, age.interval));
            statisticAgeTable.fillData(ageStatisticsData, 'statisticAgeTable');

            const salaryStatisticsData = await action(companyService.getStatistics.bind(companyService, salary.field, salary.interval));
            statisticSalaryTable.fillData(salaryStatisticsData, 'statisticSalaryTable');
            break;
        }
    }
}

const promises = range(0, N_EMPLOYEES).map(() => 
companyService.addEmployee(getRandomEmployee(minSalary, maxSalary, minBirthYear, maxBirthYear, departments)));
Promise.all(promises);
//все по очереди промисы

async function action(serviseFunction) {
    spinner.start();
    const res = await serviseFunction();
    spinner.stop();
    return res;
}

//добавить кнопки чтобы самим получать сотрудников

// config: min & max Salary
// форма проверяет
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
// например зп не входит в диапазон
//и не дать возможность нажать на сабмит
//диапазон зп проверяет форма (не Мэйн)



//добавить в Дата Грид возможность делать действия над строчками таблицы - они будут передаваться с контроллера
//это может касаться строк - удаление служащего, изменение служащего
//требует синхронизации данных и таблиц