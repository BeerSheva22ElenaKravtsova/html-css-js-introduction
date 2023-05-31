
//export - чтобы они были доступны в других файлах
//это вспомогательные функции прикладного характера
//могут быть перенесены в другой проект и быть полезными

export function getISODateStr(date) {
    return date.toISOString().substring(0, 10)
}

export function getEndDate(startDateStr, days) {
    const date = new Date(startDateStr);
    const endDate = new Date(date.setDate(date.getDate() + days));
    return getISODateStr(endDate);
}

export function getDaysBetweenDates(fromDate, toDate) {
    const difference = toDate.getTime() - fromDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
}

export function getAge(birthYear){
    return new Date().getFullYear() - birthYear;
}
