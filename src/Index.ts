const coinGecko = require('coingecko-api');

const coinGeckoClient = new coinGecko();

const func = async (): Promise<any> => {
    let data = await coinGeckoClient.ping();

    return data;
}

export function ping(): Promise<any>{
    return func();
}