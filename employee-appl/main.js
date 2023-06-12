import ApplicationBar from "./ui/ApplicationBar.js"
import EmployeeForm from "./ui/EmployeeForm.js"
import DataGrid from "./ui/DataGrid.js"
import { getRandomEmployee } from "./util/random.js"
import companyConfig from "./config/company-config.json" assert {type: "json"};
import statisticsConfig from "./config/statistics-config.json" assert {type: "json"};
// import CompanyService from "./service/CompanyService.js"
import CompanyServiceRest from "./service/CompanyServiceRest.js"
import { range } from "./util/number-functions.js";
import Spinner from "./ui/Spinner.js";
const N_EMPLOYEES = 5;
let activeIndex = null;

const sections = [
    { title: "Employees", id: "employees-table-place" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];

const actions = [
    { title: "Delete", id: "delete", picture: "../images/delete.png" },
    { title: "Update", id: "update", picture: "../images/change.png" },
];

const { minBirthYear, maxBirthYear, minSalary, maxSalary, departments } = companyConfig;
const { age, salary } = statisticsConfig;

const employeeColumns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Employee Name" },
    { field: "birthYear", headerName: "Birth Year" },
    { field: "gender", headerName: "Gender" },
    { field: "salary", headerName: "Salary (ILS)" },
    { field: "department", headerName: "Department" }
]

const statisticColumns = [
    { field: "min", headerName: "Min value" },
    { field: "max", headerName: "Max value" },
    { field: "count", headerName: "Number of Employees" }
]

const actionsHandler = [
    {
        id: 'delete',
        handler: async (rowId) => {
            const employee = employeeTable.getData(rowId);
            employeeTable.deleteRow(rowId);
            // console.log(rowId)
            // const employee = companyService.getById(rowId);
            await action(companyService.removeEmployee.bind(companyService, employee.id));
        }
    },
    {
        id: 'update',
        handler: async (rowId) => {
            const employee = employeeTable.getData(rowId);
            const id = employee.id;
            const gender = employee.gender;
            const birthYear = employee.birthdate;
            employeeForm.openPrescribedForm(employee);

            employeeForm.addHandler(async (employee) => {
                employee.id = id;
                employee.birthYear = birthYear;
                employee.gender = gender;
                await action(await companyService.updateEmployee.bind(companyService, employee))
                    .then(async () => {
                        employeeForm.closePrescribedForm();
                        const employeesData = await action(companyService.getAllEmployees.bind(companyService));
                        employeeTable.fillData(employeesData, 'employeeTable')
                    })
            });
        }
    }
];

const menu = new ApplicationBar("menu-place", sections, menuHandler);
const companyService = new CompanyServiceRest(dataChangeFn);
// const companyService = new CompanyService();

const employeeForm = new EmployeeForm("employees-form-place", minBirthYear, maxBirthYear, minSalary, maxSalary, departments);
const employeeTable = new DataGrid("employees-table-place", employeeColumns, actions, actionsHandler);
const statisticAgeTable = new DataGrid("statistics-age-place", statisticColumns, [], []);
const statisticSalaryTable = new DataGrid("statistics-salary-place", statisticColumns, [], []);

const spinner = new Spinner("spinners-id");

 function dataChangeFn(employees){
    switch(menu.getActiveIndex()){
        case 0: {
            employeeTable.fillData(employees, 'employeeTable');
            break;
        }
        case 2: {
             statisticProcessing(employees);
            break;
        }
    }
}

async function menuHandler(index) {
    activeIndex = index;

    switch (index) {
        case 0: {
            employeeForm.hideForm(true);
            const employeesData = await action(companyService.getAllEmployees.bind(companyService));
            employeeTable.fillData(employeesData, 'employeeTable');
            break;
        }
        case 1: {
            employeeForm.hideForm(false);
            employeeForm.addHandler(async (employee) => {
                await action(companyService.addEmployee.bind(companyService, employee));
            })
            break;
        }
        case 2: {
            employeeForm.hideForm(true);
            await statisticProcessing();
            break;
        }
    }
}

async function statisticProcessing(employees){
    const ageStatisticsData = await action(companyService.getStatistics.bind(companyService, age.field, age.interval, employees));
            statisticAgeTable.fillData(ageStatisticsData, 'statisticAgeTable');

    const salaryStatisticsData = await action(companyService.getStatistics.bind(companyService, salary.field, salary.interval, employees));
            statisticSalaryTable.fillData(salaryStatisticsData, 'statisticSalaryTable');
}

async function action(serviceFn) {
    spinner.start();
    try {
        const res = await serviceFn();
        return res;
    }
    catch (error) {
        alert(error.code ? 'server responded with ' + code 
        : 'server unavaliable');
    } finally {
        spinner.stop();
    }
}

async function createRandomEmployees() {
    const promises = range(0, N_EMPLOYEES).map(() =>
        companyService.addEmployee(getRandomEmployee(minSalary, maxSalary, minBirthYear,
            maxBirthYear, departments)));
    return await Promise.all(promises);//все промисы проверяет и возвращает промис
}

// action(createRandomEmployees);//внутри action есть await - будет ждать ПРомисы
