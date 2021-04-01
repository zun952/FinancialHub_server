const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

const func = async (): Promise<any> => {
    let data = await CoinGeckoClient.ping();

    return data;
}

export function ping(): Promise<any>{
    return func();
}