import request from '@/utils/request';
import type {GetStockDataAPIResponse, GetStockListAPIResponse, StockInfo} from "@/types/stock.ts";

/**
 * 最新股票数据查询接口
 * @param id
 */
export const getLatestStockDataByIdAPI = async (id: string) => {
    const res = await request<GetStockDataAPIResponse>({
        url: `/stocks/id/${id}/latest`,
        method: 'get',
    });

    if (res.data.code !== 0 || !res.data.data) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo = {
        id: res.data.data.id,
        code: res.data.data.code,
        name: res.data.data.name,
        price: res.data.data.price,
        exchange: `${(Number(res.data.data.exchange) / 100).toFixed(2)}%`,
        turnover: res.data.data.turnover,
        volume: res.data.data.volume,
        amplitude: `${(Number(res.data.data.amplitude) / 100).toFixed(2)}%`,
        highest: res.data.data.highest,
        lowest: res.data.data.lowest,
        date: res.data.data.date,
    };

    return {
        code: res.data.code,
        message: res.data.message,
        data: convertedData,
    };
};


/**
 * 最新股票数据查询接口
 * @param name
 */
export const getLatestStockDataByNameAPI = async (name: string) => {
    const res = await request<GetStockDataAPIResponse>({
        url: `/stocks/name/${name}/latest`,
        method: 'get',
    });

    if (res.data.code !== 0 || !res.data.data) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo = {
        id: res.data.data.id,
        code: res.data.data.code,
        name: res.data.data.name,
        price: res.data.data.price,
        exchange: `${(Number(res.data.data.exchange) / 100).toFixed(2)}%`,
        turnover: res.data.data.turnover,
        volume: res.data.data.volume,
        amplitude: `${(Number(res.data.data.amplitude) / 100).toFixed(2)}%`,
        highest: res.data.data.highest,
        lowest: res.data.data.lowest,
        date: res.data.data.date,
    };

    return {
        code: res.data.code,
        message: res.data.message,
        data: convertedData,
    };
};


/**
 * 分页获取最新股票数据接口
 * @param params { page: number, size: number }
 */
export const getLatestStockDataByPageAPI = async (params: { page: number; size: number }) => {
    const res = await request<GetStockListAPIResponse>({
        url: `/stocks/latest/page?page=${params.page}&size=${params.size}`,
        method: 'get',
    });

    if (res.data.code !== 0 || !res.data.data || !Array.isArray(res.data.data.data)) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo[] = res.data.data.data.map((stock: any) => ({
        id: stock.id,
        code: stock.code,
        name: stock.name,
        price: stock.price,
        exchange: `${(Number(stock.exchange) / 100).toFixed(2)}%`,
        turnover: stock.turnover,
        volume: stock.volume,
        amplitude: `${(Number(stock.amplitude) / 100).toFixed(2)}%`,
        highest: stock.highest,
        lowest: stock.lowest,
        date: stock.date,
    }));

    return {
        code: res.data.code,
        message: res.data.message,
        data: {
            data: convertedData,
            total: res.data.data.total,
        }
    };
};


/**
 * 根据用户 id 查询自选股票信息接口
 * @param userId
 */
export const getCollectionStockDataByUserIdAPI = async (userId: number) => {
    const res = await request<GetStockListAPIResponse>({
        url: `/stocks/userId/${userId}/collection`,
        method: 'get',
    });

    if (res.data.code !== 0 || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo[] = res.data.data.map((stock: any) => ({
        ...stock,
        price: Number(stock.price),
        exchange: `${(Number(stock.exchange) / 100).toFixed(2)}%`,
        turnover: stock.turnover,
        volume: stock.volume,
        amplitude: `${(Number(stock.amplitude) / 100).toFixed(2)}%`,
        highest: Number(stock.highest),
        lowest: Number(stock.lowest),
    }));

    return {
        code: res.data.code,
        message: res.data.message,
        data: {
            data: convertedData,
            total: res.data.data.total,
        }
    };
};


/**
 * 根据用户 id 查询持有股票信息接口
 * @param userId
 */
export const getPossessionStockDataByUserIdAPI = async (userId: number) => {
     const res = await request<GetStockListAPIResponse>({
        url: `/stocks/userId/${userId}/possession`,
        method: 'get',
     });

    if (res.data.code !== 0 || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo[] = res.data.data.map((stock: any) => ({
        ...stock,
        price: Number(stock.price),
        exchange: `${(Number(stock.exchange) / 100).toFixed(2)}%`,
        turnover: stock.turnover,
        volume: stock.volume,
        amplitude: `${(Number(stock.amplitude) / 100).toFixed(2)}%`,
        highest: Number(stock.highest),
        lowest: Number(stock.lowest),
    }));

    return {
        code: res.data.code,
        message: res.data.message,
        data: {
            data: convertedData,
            total: res.data.data.total,
        }
    };
};


/**
 * 根据股票 id 获取历史数据接口
 * @param id
 */
export const getStockDataByIdAPI = async (id: number) => {
    const res = await request<GetStockListAPIResponse>({
        url: `/stocks/id/${id}`,
        method: 'get',
    });

    if (res.data.code !== 0 || !res.data.data || !Array.isArray(res.data.data.data)) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo[] = res.data.data.data.map((stock: any) => ({
        id: stock.id,
        code: stock.code,
        name: stock.name,
        price: stock.price,
        exchange: `${(Number(stock.exchange) / 100).toFixed(2)}%`,
        turnover: stock.turnover,
        volume: stock.volume,
        amplitude: `${(Number(stock.amplitude) / 100).toFixed(2)}%`,
        highest: stock.highest,
        lowest: stock.lowest,
        date: stock.date,
    }));

    return {
        code: res.data.code,
        message: res.data.message,
        data: {
            data: convertedData,
            total: res.data.data.total,
        }
    };
}


/**
 * 删除股票数据接口
 */
export const deleteStockDataByIdAPI = (id: number) => {
    return request({
        url: `/stocks/id/${id}/delete`,
        method: 'delete',
    });
}


/**
 * 增加股票数据接口
 * @param stockData
 */
export const addStockDataAPI = (stockData: any) => {
    return request({
        url: '/stocks/add',
        method: 'post',
        data: stockData,
    });
}


/**
 * 增加股票数据接口
 * @param id
 * @param stockData
 */
export const updateStockDataByIdAPI = (id: number, stockData: any) => {
    return request({
        url: `/stocks/id/${id}/update`,
        method: 'put',
        data: stockData,
    });
}