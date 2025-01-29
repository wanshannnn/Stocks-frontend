import request from '@/utils/request';
import type {GetStockListAPIResponse, StockInfo} from "@/types/stock.ts";

/**
 * 最新股票数据查询接口
 * @param id 用户id
 */
export const getLatestStockDataByIdAPI = async (id: number) => {
    const res = await request<GetStockListAPIResponse>({
        url: `/stocks/id/${id}/latest`,
        method: 'get',
    });

    if (res.data.code !== 0 || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo[] = res.data.data.map((stock: any) => ({
        ...stock,
        price: Number(stock.price),
        exchange: `${Number(stock.exchange).toFixed(2)}%`,
        turnover: Number(stock.turnover),
        volume: Number(stock.volume),
        amplitude: `${Number(stock.amplitude).toFixed(2)}%`,
        highest: Number(stock.highest),
        lowest: Number(stock.lowest),
    }));

    return {
        ...res,
        data: {
            ...res.data,
            data: convertedData
        }
    };
};

/**
 * 最新股票数据查询接口
 * @param name 用户名
 */
export const getLatestStockDataByNameAPI = async (name: string) => {
    const res = await request<GetStockListAPIResponse>({
        url: `/stocks/name/${encodeURIComponent(name)}/latest`,
        method: 'get',
    });

    if (res.data.code !== 0 || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo[] = res.data.data.map((stock: any) => ({
        ...stock,
        price: Number(stock.price),
        exchange: `${Number(stock.exchange).toFixed(2)}%`,
        turnover: Number(stock.turnover),
        volume: Number(stock.volume),
        amplitude: `${Number(stock.amplitude).toFixed(2)}%`,
        highest: Number(stock.highest),
        lowest: Number(stock.lowest),
    }));

    return {
        ...res,
        data: {
            ...res.data,
            data: convertedData
        }
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

    if (res.data.code !== 0 || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo[] = res.data.data.map((stock: any) => ({
        ...stock,
        price: Number(stock.price),
        exchange: `${Number(stock.exchange).toFixed(2)}%`,
        turnover: Number(stock.turnover),
        volume: Number(stock.volume),
        amplitude: `${Number(stock.amplitude).toFixed(2)}%`,
        highest: Number(stock.highest),
        lowest: Number(stock.lowest),
    }));

    return {
        ...res,
        data: {
            ...res.data,
            data: convertedData
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
        exchange: `${Number(stock.exchange).toFixed(2)}%`,
        turnover: Number(stock.turnover),
        volume: Number(stock.volume),
        amplitude: `${Number(stock.amplitude).toFixed(2)}%`,
        highest: Number(stock.highest),
        lowest: Number(stock.lowest),
    }));

    return {
        ...res,
        data: {
            ...res.data,
            data: convertedData
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
        exchange: `${Number(stock.exchange).toFixed(2)}%`,
        turnover: Number(stock.turnover),
        volume: Number(stock.volume),
        amplitude: `${Number(stock.amplitude).toFixed(2)}%`,
        highest: Number(stock.highest),
        lowest: Number(stock.lowest),
    }));

    return {
        ...res,
        data: {
            ...res.data,
            data: convertedData
        }
    };
};


/**
 * 根据股票 id 获取历史数据接口
 * @param id
 */
export const getStockDataByIdAPI = async (id: number) => {
    const res = await request({
        url: `/stocks/id/${id}`,
        method: 'get',
    });

    if (res.data.code !== 0 || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "获取股票数据失败");
    }

    const convertedData: StockInfo[] = res.data.data.map((stock: any) => ({
        ...stock,
        price: Number(stock.price),
        exchange: `${Number(stock.exchange).toFixed(2)}%`,
        turnover: Number(stock.turnover),
        volume: Number(stock.volume),
        amplitude: `${Number(stock.amplitude).toFixed(2)}%`,
        highest: Number(stock.highest),
        lowest: Number(stock.lowest),
    }));

    return {
        ...res,
        data: {
            ...res.data,
            data: convertedData
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