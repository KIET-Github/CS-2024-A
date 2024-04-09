import _ from 'lodash';
import { ChartComponentProps } from 'react-chartjs-2';

export function getSum(transaction: any, bigdata: any) {
    console.log("landb", bigdata);
    let counts = _(transaction)
        .countBy(bigdata)
        .value();
    console.log("language", counts);
    return counts;

}

export function getLabels(transaction: any, bigdata: any) {
    //console.log("transactions",transaction,"bigdata",bigdata);
    const amountSum = getSum(transaction, bigdata);
    console.log("amountsum",amountSum);
    let total = _.sum(_.values(amountSum));
    let result = _(amountSum)
        .map((value, key) => {
            const transactionItem = _.find(transaction, { language: key });
            // console.log("aaaa",transactionItem);
            return transactionItem ? {
                color: transactionItem,
                language: key,
                percentage: Number(((value / total) * 100).toFixed(1))
            } : null;
        })
        .compact() // Remove any null values from the array
        .value();

    console.log("result",result);
    return result;
}


export const chart_Data = (transaction: any[], lang: { color: string }, custom:any)=> {
     console.log("transaction", transaction);
     console.log("lang", lang);

    let bg = _.map(transaction, item => item.color);
    bg = _.uniq(bg);

    console.log("bg", bg);

    let dataValue = getLabels(transaction, lang);
    // console.log("datavalue", dataValue);

    const percentage = _.map(dataValue, 'percentage');
    // console.log("percentage", percentage);
    const languageLabels = _.map(dataValue, 'language'); 
    console.log(languageLabels);
    const config: ChartComponentProps = {
        data: {
            labels:languageLabels,
            datasets: [{
                // label: languageLabels,
                data: percentage,
                backgroundColor: bg,

                // borderRadius: ,
                // spacing: 10
            }]
        },
        options: {
            
        }
    }
    return custom ?? config;
}

