export default class OpenMeteoService {
    #baseUrl;

    constructor(baseUrl) {
        this.#baseUrl = baseUrl
    }

    #getUrl(lat, long, startDate, endDate) {
        return `${this.#baseUrl}latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&start_date=${startDate}&end_date=${endDate}`;
    }
    // это метод, а фнукция - это то что не внутри класса
    async getTemperatures(lat, long, startDate, endDate, hourFrom, hourTo) {
        const url = this.#getUrl(lat, long, startDate, endDate);
        const response = await fetch(url);
        const data = await response.json();
        const dates = getDataForHours(data.hourly.time, hourFrom, hourTo);
        const temperatures = getDataForHours(data.hourly.temperature_2m, hourFrom, hourTo);
        const apparentTemperatures = getDataForHours(data.hourly.apparent_temperature, hourFrom, hourTo);
        return dates.map((d, index) => {
            const tokens = d.split("T");
            const date = tokens[0];
            const time = tokens[1];
            return {
                date, time, temperature: temperatures[index],
                apparentTemperature: apparentTemperatures[index]
            };
        })

    }
}

function getEndDate(startDateStr, days) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(startDate.setDate(startDate.getDate() + days));
    return endDate.toISOString().substring(0, 10);
}

function getUrl(lat, long, startDate, endDate) {
    return `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&start_date=${startDate}&end_date=${endDate}`
}

function getDataForHours(array, hourFrom, hourTo) {
    return array.filter((__, index) => {
        const rem = index % 24;
        return rem >= hourFrom && rem <= hourTo
    })
}
