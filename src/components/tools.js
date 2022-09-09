export function transformNumber(number) {
    const result = number / 10000;
    return result.toFixed(1) + "万";
}

export function transformDate(date) {
    const time = new Date(date);
    const year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`
}