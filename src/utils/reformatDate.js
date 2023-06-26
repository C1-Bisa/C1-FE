export const reformatDate = (date, option = { day: 'numeric', month: 'long', year: 'numeric' }, country = 'id') =>
    new Date(date).toLocaleString(country, option);

export const reformatDateWithHour = (date) => {
    const dayMonthYear = new Date(date).toLocaleString('id', { day: 'numeric', month: 'long', year: 'numeric' });
    const hours = new Date(date).toLocaleString('id', { hour: '2-digit' });
    const minutes = new Date(date).toLocaleString('id', { minute: '2-digit' });

    return `${dayMonthYear} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
