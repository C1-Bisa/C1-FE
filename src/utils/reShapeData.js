import { reformatDate } from './reformatDate';

export const groupingByTransactionDates = (datas) => {
    const results = datas.reduce((acc, current) => {
        acc[String(reformatDate(current?.transaction?.transaction_date, { month: 'long', year: 'numeric' }))] =
            acc[
                String(
                    reformatDate(current?.transaction?.transaction_date, {
                        month: 'long',
                        year: 'numeric',
                    })
                )
            ] || [];
        acc[String(reformatDate(current?.transaction?.transaction_date, { month: 'long', year: 'numeric' }))].push(current);
        return acc;
    }, {});

    let result = Object.keys(results).map((key, index) => {
        return {
            id: index + 1,
            month: key,
            data: results[key],
        };
    });

    return result;
};
