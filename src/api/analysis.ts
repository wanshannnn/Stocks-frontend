import request from '@/utils/request';

// 获取股票分析数据（根据 ID）
export const getStockAnalysisByIdAPI = (id: string) => {
    return request({
        url: `/analysis/id/${id}`,
        method: 'get',
    });
}