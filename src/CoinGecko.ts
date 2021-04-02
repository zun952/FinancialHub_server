const coinGecko = require('coingecko-api');

const coinGeckoClient = new coinGecko();

let markets = async(): Promise<any> => {
    return await coinGeckoClient.coins.markets({
        vs_currency: 'krw'
    });
}

export default { markets };