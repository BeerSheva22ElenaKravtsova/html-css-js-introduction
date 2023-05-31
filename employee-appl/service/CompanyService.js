import { getRandomInt } from "../util/random.js";
import { count } from "../util/number-functions.js";

const minId = 100000;
const maxId = 1000000;

export default class CompanyService {
    #employees;

    constructor() {
        this.#employees = {};
    }

    addEmployee(employee) {
        const id = this.#getId();
        this.#employees[id] = { ...employee, id };//add ID

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.#employees[id]);
            }, 5000);
        })
    }

    #getId() {
        let id;
        do {
            id = getRandomInt(minId, maxId);
        } while (this.#employees[id]);
        return id;
    }

getStatistics(field, interval) {
        let array = Object.values(this.#employees);
        const currentYear = new Date().getFullYear();
        if (field == 'birthYear') {
            array = array.map(e => ({ 'age': currentYear - e.birthYear }));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return new Promise((resolve) => {
            setTimeout(() => {
                return resolve(Object.entries(statisticsObj)
                .map(e => {
                    const min = e[0] * interval;
                    const max = min + interval - 1;
                    return { min, max, count: e[1] };
                }));
            }, 1000);
        }) 
    }

    getAllEmployees(){
       return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.values(this.#employees));
            }, 5000);
        })
    }
}


// addEmployee(employee) {
//     const id = this.#getId();
//     this.#employees[id] = { ...employee, id };//добавляем ИД
//     return this.#employees[id];
// }

// #getId() {
//     let id;
//     do {
//         id = getRandomInt(minId, maxId);
//     } while (this.#employees[id]);
//     return id;
// }

// getStatistics(field, interval) {
//     let array = Object.values(this.#employees);
//     const currentYear = new Date().getFullYear();
//     if (field == 'birthYear') {
//         array = array.map(e => ({ 'age': currentYear - e.birthYear }));
//         field = 'age';
//     }
//     const statisticsObj = count(array, field, interval);
//     return Object.entries(statisticsObj)
//         .map(e => {
//             const min = e[0] * interval;
//             const max = min + interval - 1;
//             return { min, max, count: e[1] };
//         });
// }

// getAllEmployees(){
//     return this.#employees;
// }


//     company;
//     companyAgeStatistic;
//     companyGenderStatistic;
//     companySalaryStatistic;

//     constructor() {
//         this.company = [];
//         this.companyAgeStatistic = {
//             "20-29": 0,
//             "30-39": 0,
//             "40-49": 0,
//             "50-59": 0,
//             "60-70": 0
//         }

//         this.companyGenderStatistic = {
//             "male": 0,
//             "female": 0
//         }

//         this.companySalaryStatistic = {
//             "10000-19000": 0,
//             "20000-29000": 0,
//             "30000-39000": 0,
//             "40000-50000": 0,
//         }
//     }

//     addEmployee(employee) {
//         const isExists = this.company.find(c => c.id == employee.id);
//         if (isExists) {
//           alert("Employee with this ID already exists, regenerate Employee");
//           return;
//         }
//         this.addEmployeeToStatisticRange(getAge(employee.birthYear), this.companyAgeStatistic);
//         this.addEmployeeToStatisticRange(employee.salary, this.companySalaryStatistic);
//         this.addEmployeeToStatisticValues(employee.gender, this.companyGenderStatistic);
//         this.company.push(removeIdField(employee));
//       }

//     addEmployeeToStatisticRange(value, statistic) {
//         Object.entries(statistic).forEach(([valueRange]) => {
//           if (value == valueRange) {
//             statistic[valueRange]++;
//           }
//         });
//     }

//     addEmployeeToStatisticValues(value, statistic) {
//         Object.entries(statistic).forEach(([valueRange]) => {
//           const [minValue, maxValue] = valueRange.split("-");
//           if (value >= parseInt(minValue) && value <= parseInt(maxValue)) {
//             statistic[valueRange]++;
//           }
//         });
//     }
// }

// function removeIdField(employee) {
//     const { id, ...employeeWithoutId } = employee;
//     return employeeWithoutId;
// }

// function getAge(birthYear){
//     return new Date().getFullYear() - birthYear;
// }
