

// const h1 = document.createElement("h1");
// h1.appendChild(document.createTextNode("My First Fetch:"))
// document.body.appendChild(h1);

//fetch возвращает Promise
//.json() возвращает данные

//есть онлайн JSON viewver

// async function getTemperatures(lat, long) {
//     const response = await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST`)
//     return response.json();
// }

// getTemperatures(31.89, 34.81).then((data) => console.log(data))
//     .catch(error => console.log('kuku'));

async function getTemperatures(lat, long, startDate, days, hourFrom, hourTo) {
    const endDate = getEndDate(startDate, days);
    const url = getUrl(lat, long, startDate, endDate);
    const response = await fetch(url);
    const data = await response.json();
    const dates = getDataForHours(data.hourly.time, hourFrom, hourTo);
    const temperatures = getDataForHours(data.hourly.temperature_2m, hourFrom, hourTo);
    const apparenTemperature = getDataForHours(data.hourly.apparenTemperature, hourFrom, hourTo);
    return dates.map((d, index) => {
        const tokens = d.split("T");
        const date = tokens[0];
        const time = tokens[1];
        return {
            date,
            time,
            temperature: temperatures[index],
            apparent_temperature: apparenTemperature[index]
        }
    })
}



function getEndDate(startDateStr, days) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(startDate.setDate(startDate.getDate() + days));
    return endDate.toISOString().split('T')[0];
}

function getUrl(lat, long, startDate, endDate) {
    return `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&start_date=${startDate}&end_date=${endDate}`;
}

function getDataForHours(data, hourFrom, hourTo) {
    return data
        .filter(__,index => {
            const rem = index%24;
            return rem >= hourFrom && rem <= hourTo;
        })
}

getTemperatures(31.89, 34.81, '2023-05-05', 1, 10, 12).then((data) => console.log(data))
    .catch(error => console.log(error));

