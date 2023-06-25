// export const formatRupiah = (x) => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
// };

export const formatRupiah = (number) => {
    let numbers = Number(number);
    return numbers?.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
};
