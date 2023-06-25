export const fixedHour = (hours) => {
    let arrOfHours = hours.split(':');
    let arr = [];
    while (arr.length < 2) {
        arr.push(arrOfHours[arr.length]);
    }
    return arr.join(':');
};
