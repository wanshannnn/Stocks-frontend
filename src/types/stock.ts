// 股票信息数据结构
export interface StockInfo {
    id: string;         // 股票代码
    code: string;       // 股票代码（六位）
    name: string;       // 股票名称
    price: string;      // 当前价格
    exchange: string;   // 涨跌幅（百分比）
    turnover: string;   // 成交额
    volume: string;     // 成交量
    amplitude: string;  // 振幅（百分比）
    highest: string;    // 最高价
    lowest: string;     // 最低价
    date: string;       // 日期
}

// API 响应结构
export interface ApiResponse<T> {
    code: number;       // 响应码（0 表示成功）
    message: string;    // 响应信息
    data: T;            // 具体数据
}

// 具体的股票数据接口（用于返回多个股票）
export interface StockList {
    data: StockInfo[];  // 股票列表
    total: number;      // 总条数（如果有分页）
}

// 最终用于请求的 API 类型
export type GetStockListAPIResponse = ApiResponse<StockList>;
export type GetStockDataAPIResponse = ApiResponse<StockInfo>;
