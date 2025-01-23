export interface StockDataInfo {
    items: { id: string;
        price: string;
        exchange: string;
        turnover: string;
        volume: string;
        amplitude: string;
        name: string;
        highest: string;
        lowest: string;
        date: string; }[];
    total: number;
    code: number;
    message: string;
}