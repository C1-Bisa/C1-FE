export const reformatDate = (date, option = { day: 'numeric', month: 'long', year: 'numeric' }) =>
    new Date(date).toLocaleString('id', option);
