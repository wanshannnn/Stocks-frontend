import type {GetIndexesAPIResponse} from "@/types/indexes.ts";
import request from "@/utils/request.ts";

/**
 * 获取指数数据接口
 */
export const getIndexesAPI = () => {
    return request<GetIndexesAPIResponse>({
        url: `/indexes`,
        method: 'get',
    })
}