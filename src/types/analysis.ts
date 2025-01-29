// 分析结果数据结构
export interface AnalysisInfo {
    average_price: number;     // 平均价格
    average_volume: number;    // 平均成交量
    average_turnover: number;  // 平均成交额
    total_volume: number;      // 总成交量
    total_turnover: number;    // 总成交额
    highest_price: number;     // 最高价
    lowest_price: number;      // 最低价
}

// API 响应结构
export interface ApiResponse<T> {
    code: number;       // 响应码（0 表示成功）
    message: string;    // 响应信息
    data: T;            // 具体数据
}

// 具体的分析结果数据接口（用于返回多个分析结果）
export interface AnalysisListResponse {
    data: AnalysisInfo[];  // 分析结果列表
    total: number;      // 总条数（如果有分页）
}

// 最终用于请求的 API 类型
export type GetAnalysisListAPIResponse = ApiResponse<AnalysisListResponse>;