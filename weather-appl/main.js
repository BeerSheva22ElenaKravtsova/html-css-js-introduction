import openMeteoConfig from "./config/service-config.json" assert {type: "json"};
import OpenMeteoService from "./service/OpenMeteoService.js";
import DataGrid from "./ui/DataGrid.js";
import WeatherForm from "./ui/WeatherForm.js";
//{} - внутри указываем какие функции импортировать
import { getEndDate } from './util/date-functions.js'

//constants definition
const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'time', headerName: 'Time' },
    { field: 'temperature', headerName: 'Temperature' },
    { field: 'apparentTemperature', headerName: 'Fealt Temp' }
]
 
//objects
const form = new WeatherForm("form-place",
 Object.keys(openMeteoConfig.cities), openMeteoConfig.maxDays);
const openMeteoService = new OpenMeteoService(openMeteoConfig.baseUrl);
const table = new DataGrid("table-place", columns)

    async function run() {
        while(true) {
            const fromFormData = await form.getDataFromForm();
            //деструктуризация, поля объекта перешли в 2 переменные с такими же именами что и поля объекта (они могут быть в любом порядке)
            const { startDate, days, hourFrom, hourTo, city } = fromFormData;
            const {lat, long} = openMeteoConfig.cities[city];
            const temperatures = await openMeteoService.getTemperatures(lat, long, startDate, getEndDate(startDate, days),
            hourFrom, hourTo);
            table.fillData(temperatures);
        }
    }
    run();


