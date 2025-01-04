import request from '@/utils/request';
import type {StockInfo} from "@/types/stock.ts";

// 获取最新的股票数据
export const getLatestStockDataByIdAPI = (id: string) => {
    return request<{ code: number; data: StockInfo }>({
        url: `/stocks/id/${id}/latest`,
        method: 'get',
    });
};
export const getLatestStockDataByNameAPI = (name: string) => {
    return request<{ code: number; data: StockInfo }>({
        url: `/stocks/name/${encodeURIComponent(name)}/latest`,
        method: 'get',
    });
};

// 获取最新股票数据（分页）
export const getLatestStockDataByPageAPI = (page: number, size: number) => {
    return request<{
        code: number;
        data: {
            items: StockInfo[];
            total: number;
        };
    }>({
        url: `/stocks/latest/page`,
        method: 'get',
        params: {
            page,
            size,
        },
    });
};


// 根据 ID 和时间范围获取股票数据
export const getStockDataByIdAndTimeRangeAPI = (id: string, startTime: string, endTime: string) => {
    return request({
        url: `/stocks/id/${id}/query`,
        method: 'get',
        params: { startTime, endTime },  // 使用 params 传递查询参数
    });
}

// 根据 ID、时间范围和分页信息获取股票数据
export const getStockDataByIdAndTimeRangeByPageAPI = (id: string, startTime: string, endTime: string, page: number, size: number) => {
    return request({
        url: `/stocks/id/${id}/query/page`,
        method: 'get',
        params: { startTime, endTime, page, size },  // 使用 params 传递查询参数
    });
}

// 删除股票数据（按时间范围）
export const deleteStockDataByIdAndTimeRangeAPI = (id: string, startTime: string, endTime: string) => {
    return request({
        url: `/stocks/id/${id}/delete`,
        method: 'delete',
        params: { startTime, endTime },  // 使用 params 传递查询参数
    });
}

// 添加股票数据
export const addStockDataAPI = (stockData: any) => {
    return request({
        url: '/stocks/add',
        method: 'post',
        data: stockData,  // 使用 data 传递请求体数据
    });
}

// 更新股票数据（根据 ID）
export const updateStockDataByIdAPI = (id: string, stockData: any) => {
    return request({
        url: `/stocks/id/${id}/update`,
        method: 'put',
        data: stockData,  // 使用 data 传递请求体数据
    });
}