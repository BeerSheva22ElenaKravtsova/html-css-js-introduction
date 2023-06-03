// const employee = {name: "Sara", gender: "female",
// salary:10000, department:"Development", birthYear: 2000};

import { getRandomInt } from "../util/random.js";
import { count } from "../util/number-functions.js";

const URL = 'http://localhost:3500/employees';
const minId = 100000;
const maxId = 1000000;

export default class CompanyServiceRest {

    constructor() {
    }

    addEmployee(employee) {
        const id = this.#getId();
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ ...employee, id })
        }).then(response => response.json());
            return getPromise(this.findEmployeeById(id), 150);
    }

    #getId() {
        let id;
        do {
            id = getRandomInt(minId, maxId);
        } while (this.findEmployeeById(id));
        return id;
    }

    removeEmployee(employeeId) {
        const thisURL = `${URL}/${employeeId}`
        getPromise(fetch(thisURL, {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" },
        }).then(response => response.json()).
            then(data => console.log(data)), 150);
    }

    async findEmployeeById(employeeId) {
        const thisURL = `${URL}/${employeeId}`
        return getPromise(fetch(thisURL)
            .then(response => response.json()), 150);
    }

    updateEmployee(employee) {
        const id = employee.id;
        const thisURL = `${URL}/${id}`
        return getPromise(fetch(thisURL, {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(this.findEmployeeById(id) = { ...employee, id })//объекта не JSON
        }).then(response => response.json()), 150);
        // this.#employees[id] = { ...employee, id };
        // return getPromise(this.#employees[id], 150);
    }

    getStatistics(field, interval) {
        let array = this.getAllEmployees();
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
        return getPromise(fetch(URL).then(response => response.json()), 1000);
    }
}

function getPromise(state, timeout) {
    return new Promise(resolve => setTimeout(() => resolve(state), timeout))
}

// function removeIdField(employee) {
//     const { id, ...employeeWithoutId } = employee;
//     return employeeWithoutId;
// }
