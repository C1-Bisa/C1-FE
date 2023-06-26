// export const getDateInRange = (dateInput) => {
//     const testDate = new Date(dateInput);
//     const testDate2 = new Date(testDate.getTime());
//     const testDate3 = new Date(testDate2);
//     const d1 = new Date(dateInput);
//     d1.setHours(0, 0, 0, 0);
//     const d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + 1);
//     const d3 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate() + 6);

//     const date = new Date(d2.getTime());
//     let angka = 1;
//     const dates = [
//         {
//             id: 1,
//             date: testDate3,
//             active: false,
//         },
//     ];

//     while (date <= d3) {
//         dates.push({
//             id: angka + dates.length,
//             date: new Date(date),
//             active: false,
//         });

//         date.setDate(date.getDate() + 1);
//     }

//     return dates;
// };

// two way
export const getDateInRange = (dateInput, returnInput = null) => {
    if (returnInput) {
        const dates = [];
        const d1 = new Date(returnInput);
        const d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() - 7);
        const d3 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
        const date = new Date(d2.getTime());
        let angka = 1;

        while (date <= d3) {
            dates.push({
                id: angka + dates.length,
                date: new Date(date),
                active: false,
            });
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    const testDate = new Date(dateInput);
    const testDate2 = new Date(testDate.getTime());
    const testDate3 = new Date(testDate2);
    const d1 = new Date(dateInput);
    d1.setHours(0, 0, 0, 0);
    const d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + 1);
    const d3 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate() + 6);

    const date = new Date(d2.getTime());
    let angka = 1;
    const dates = [
        {
            id: 1,
            date: testDate3,
            active: false,
        },
    ];

    while (date <= d3) {
        dates.push({
            id: angka + dates.length,
            date: new Date(date),
            active: false,
        });

        date.setDate(date.getDate() + 1);
    }

    return dates;
};

//One way
// berangkat 26
// awal : 26
// akhir : 26 + 7

// Two Way
// berangkat : 26
// pulang : 30

// awal : 30 - 7 , [23, 24, ..., 26, 30]
// akhir : 30
