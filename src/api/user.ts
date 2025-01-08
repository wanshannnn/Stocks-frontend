import request from '@/utils/request';

/**
 * 登录接口（这是JSDoc注释）
 * @param {*} param0 {username: 用户名, password: 密码}
 * @returns Promise对象
 */
export const loginAPI = (params: any) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: { ...params }
    })
}

/**
 * 注册接口
 * @param params 注册的DTO对象
 * @returns
 */
export const registerAPI = (params: any) => {
    console.log(params)
    console.log({ ...params })
    return request({
        url: '/user/register',
        method: 'post',
        data: { ...params }
    })
}

/**
 * 修改密码接口
 * @param params 新旧密码的DTO对象
 * @returns
 */
export const fixPwdAPI = (params: any) => {
    console.log(params)
    console.log({ ...params })
    return request({
        url: '/user/fixpwd',
        method: 'put',
        data: { ...params }
    })
}

/**
 * 管理员添加用户
 * @param params 添加用户的DTO对象
 * @returns
 */
export const addUserAPI = (params: any) => {
    return request({
        url: '/user/add',
        method: 'post',
        data: { ...params }
    })
}

/**
 * 获取用户分页列表
 * @param params 分页查询DTO
 * @returns
 */
export const getUserPageListAPI = (params: any) => {
    return request({
        url: `/user/page?page=${params.page}&size=${params.size}`,
        method: 'get',
    });
};

/**
 * 根据id获取用户信息，用于回显
 * @param id
 * @returns
 */
export const getUserByIdAPI = (id: number) => {
    return request({
        url: `/user/${id}`,
        method: 'get'
    })
}

/**
 * 修改用户信息
 * @param params 更新用户信息的DTO对象
 * @returns
 */
export const updateUserAPI = (params: any) => {
    return request({
        url: '/user/update',
        method: 'put',
        data: { ...params }
    })
}

/**
 * 管理员根据id删除用户
 * @param id 用户id
 * @returns
 */
export const deleteUserAPI = (id: number) => {
    return request({
        url: `/user/delete/${id}`,
        method: 'delete'
    })
}