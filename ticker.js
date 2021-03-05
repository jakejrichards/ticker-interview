const keys = obj => Object.keys(obj);

const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

// The maximum is exclusive and the minimum is inclusive
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(getRandom(min, max));
};

// Gets a random element from the given array
const sample = arr => {
    const randomIdx = getRandomInt(0, arr.length);
    return arr[randomIdx];
};

export class StockTicker {
    constructor() {
        this.stockValues = {
            'S&P 500': 1859,
            'DOW J': 16296,
            NASDAQ: 4296
        };
        this.symbols = keys(this.stockValues);
    }

    nextTick = () => {
        if (!this.listener) return;
        const symbol = sample(this.symbols);
        const change = getRandomInt(-25, 30);
        const price = this.stockValues[symbol] + change;
        this.stockValues[symbol] = price;
        this.listener({ symbol, price });
        setTimeout(this.nextTick, getRandom(100, 1000));
    };

    addListener = listener => {
        if (!listener) return;
        this.listener = listener;
        this.nextTick();
    };
}
