import request from '@/utils/request';
import type {StockInfo} from "@/types/stock.ts";

// 根据股票 id 或 name 查询最新的股票数据
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
export const getLatestStockDataByPageAPI = (params: any) => {
    return request({
        url: `/stocks/latest/page?page=${params.page}&size=${params.size}`,
        method: 'get',
    });
};

// 根据 userId 查找自选股票
export const getCollectionStockDataByUserIdAPI = (userId: string) => {
    return request<{ code: number; data: StockInfo }>({
        url: `/stocks/userId/${userId}/collection`,
        method: 'get',
    });
};

// 根据 userId 查找持有股票
export const getPossessionStockDataByUserIdAPI = (userId: string) => {
    return request<{ code: number; data: StockInfo }>({
        url: `/stocks/userId/${userId}/possession`,
        method: 'get',
    });
};


// 根据 id 获取全部股票数据
export const getStockDataByIdAPI = (id: string) => {
    return request({
        url: `/stocks/id/${id}`,
        method: 'get',
    });
}

// 删除股票数据
export const deleteStockDataByIdAPI = (id: string) => {
    return request({
        url: `/stocks/id/${id}/delete`,
        method: 'delete',
    });
}

// 添加股票数据
export const addStockDataAPI = (stockData: any) => {
    return request({
        url: '/stocks/add',
        method: 'post',
        data: stockData,
    });
}

// 更新股票数据
export const updateStockDataByIdAPI = (id: string, stockData: any) => {
    return request({
        url: `/stocks/id/${id}/update`,
        method: 'put',
        data: stockData,
    });
}