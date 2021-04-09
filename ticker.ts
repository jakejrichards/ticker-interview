const keys = (obj: Record<string, unknown>) => Object.keys(obj);

const getRandom = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

// The maximum is exclusive and the minimum is inclusive
const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(getRandom(min, max));
};

// Gets a random element from the given array
const sample = <T>(arr: T[]) => {
    const randomIdx = getRandomInt(0, arr.length);
    return arr[randomIdx];
};

export interface StockData {
    symbol: string;
    price: number;
}

export type StockTickerListener = (data: StockData) => void;

export class StockTicker {
    private listener?: StockTickerListener;
    private stockValues: Record<string, number>;
    private symbols: string[];

    constructor() {
        this.stockValues = {
            "S&P 500": 1859,
            "DOW J": 16296,
            NASDAQ: 4296,
        };
        this.symbols = keys(this.stockValues);
    }

    private nextTick = () => {
        if (!this.listener) return;
        const symbol = sample(this.symbols);
        const change = getRandomInt(-25, 30);
        const price = this.stockValues[symbol] + change;
        this.stockValues[symbol] = price;
        this.listener({ symbol, price });
        setTimeout(this.nextTick, getRandom(500, 1500));
    };

    addListener = (listener: StockTickerListener) => {
        if (!listener) return;
        this.listener = listener;
        this.nextTick();
    };
}
