// const coinGecko = require('coingecko-api');

// const coinGeckoClient = new coinGecko();

// const func = async (): Promise<any> => {
//     let data = await coinGeckoClient.ping();

//     return data;
// }

// export function ping(): Promise<any>{
//     return func();
// }


let a = [];
a.push(new Array(1, 2, 3));
a.push(new Array(4, 5, 6));

let func = new Promise((resolve, reject) => {
    resolve('yeah');
});

const result = a.map(async (row) => {
    let result = await func
        .then((obj) => {
            return (rows: any) => {
                if(rows.length) {
                    return rows[0];
                } else{
                    return obj;
                }
            }
    });

    console.log(result);
});