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

    async addEmployee(employee) {
        return fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee),
        })
            .then(response => response.json());
        }

    async removeEmployee(employeeId) {
        const thisURL = `${URL}/${employeeId}`;
        return fetch(thisURL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
    }

    async findEmployeeById(employeeId) {
        const thisURL = `${URL}/${employeeId}`;
        return fetch(thisURL)
            .then(response => response.json())
            .then(data => data);
    }

    async updateEmployee(employee) {
    const id = employee.id;
    const thisURL = `${URL}/${id}`;
    return fetch(thisURL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: 
      JSON.stringify({ id, ...employee }),
    })
      .then(response => response.json())
      .then(data => data);
    }

  async getStatistics(field, interval) {
    return this.getAllEmployees()
      .then(array => {
        const currentYear = new Date().getFullYear();
        if (field == 'birthYear') {
            array = array.map(e => ({ 'age': currentYear - e.birthYear }));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return Object.entries(statisticsObj)
            .map(e => {
                const min = e[0] * interval;
                const max = min + interval - 1;
                return { min, max, count: e[1] };
            })
      });
  }

    async getAllEmployees() {
        return fetch(URL)
        .then(response => 
            response.json()
        ).then(data => data);
    }

    // async getAllEmployees(id) {
    //     return fetch(`${URL}/${id}`)
    //     .then(response => 
    //         response.json()
    //     ).then(data => data);
    // }
}
