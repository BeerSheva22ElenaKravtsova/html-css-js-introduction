// const employee = {name: "Sara", gender: "female",
// salary:10000, department:"Development", birthYear: 2000};

import { getRandomInt } from "../util/random.js";
import { count } from "../util/number-functions.js";

const URL = 'http://localhost:3500/employees';
const minId = 100000;
const maxId = 1000000;
const POLLING_INTERVAL = 5000;

export default class CompanyServiceRest {
    #employeesCash;
    #dataUpdateFn;
    #intervalId;

    constructor(dataUpdateFn) {
        this.#dataUpdateFn = dataUpdateFn;
        this.#intervalId = setInterval(this.#poller.bind(this), POLLING_INTERVAL);
    }

    async #poller() {
        setInterval(async () => {
            const employees = await this.getAllEmployees();
            if (!this.#employeesCash || JSON.stringify(this.#employeesCash) !== JSON.stringify(employees)) {
              this.#employeesCash = employees;
              this.#dataUpdateFn(this.#employeesCash);}
        }, POLLING_INTERVAL);
      }

    async addEmployee(employee) {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee),
        });
        return await response.json();
    }

    async removeEmployee(employeeId) {
        const thisURL = `${URL}/${employeeId}`;
        const response = await fetch(thisURL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        return await response.json();
    }

    async findEmployeeById(employeeId) {
        const thisURL = `${URL}/${employeeId}`;
        const response = await fetch(thisURL);
        return await response.json();
    }

    async updateEmployee(employee) {
        const id = employee.id;
        const thisURL = `${URL}/${id}`;
        const response = await fetch(thisURL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:
                JSON.stringify({ id, ...employee }),
        });
        return await response.json();
    }

    async getStatistics(field, interval, employees) {
        let array = employees ? employees : await this.getAllEmployees();
        const currentYear = new Date().getFullYear();

        if (field == 'birthYear') {
            array = array.map(e => ({ 'age': currentYear - e.birthYear }));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return Object.entries(statisticsObj).map(e => {
            const min = e[0] * interval;
            const max = min + interval - 1;
            return { min, max, count: e[1] };
        })
    }

    async getAllEmployees() {
        const response = await fetch(URL);
        return await response.json();
    }
}
