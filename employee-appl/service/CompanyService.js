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
        return getPromise(this.#employees[id], 150);
    }

    #getId() {
        let id;
        do {
            id = getRandomInt(minId, maxId);
        } while (this.#employees[id]);
        return id;
    }

    removeEmployee(employeeId) {
        return getPromise(delete this.#employees[employeeId], 150);
    }

    findEmployeeById(employeeId) {
        const employee = Object.values(this.#employees).find(employee => employee.id === employeeId);
        return getPromise(employee, 150);
    }

    updateEmployee(employee) {
        const id = employee.id;
        this.#employees[id] = { ...employee, id };
        return getPromise(this.#employees[id], 150);
    }

    getStatistics(field, interval) {
        let array = Object.values(this.#employees);
        const currentYear = new Date().getFullYear();
        if (field == 'birthYear') {
            array = array.map(e => ({ 'age': currentYear - e.birthYear }));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return getPromise(Object.entries(statisticsObj)
            .map(e => {
                const min = e[0] * interval;
                const max = min + interval - 1;
                return { min, max, count: e[1] };
            }), 1000);
    }

    getAllEmployees() {
        return getPromise(Object.values(this.#employees), 1000)
    }
}

function getPromise(state, timeout) {
    return new Promise(resolve => setTimeout(() => resolve(state), timeout))
}

// function removeIdField(employee) {
//     const { id, ...employeeWithoutId } = employee;
//     return employeeWithoutId;
// }
