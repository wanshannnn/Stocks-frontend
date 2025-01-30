// 指数数据结构
export interface IndexesInfo {
    SHCOMP: number;    // 上证指数
    SZCOMP: number;    // 上证指数
    ChiNext: number;   // 创业板指
    CSI300: number;    // 沪深300指数
}

// API 响应结构
export interface ApiResponse<T> {
    code: number;       // 响应码（0 表示成功）
    message: string;    // 响应信息
    data: T;            // 具体数据
}

// 具体的指数数据接口（用于返回多个分析结果）
export interface IndexesListResponse {
    data: IndexesInfo[];  // 指数列表
    total: number;      // 总条数（如果有分页）
}

// 最终用于请求的 API 类型
export type GetIndexesListAPIResponse = ApiResponse<IndexesListResponse>;
export type GetIndexesAPIResponse = ApiResponse<IndexesInfo>;