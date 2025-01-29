// 用户数据结构
export interface UserInfo {
    id: number;              // 用户ID
    role: 'user' | 'admin';  // 角色
    token: string;           // token
    createTime: string;      // 用户创建时间
    username: string;        // 用户名
    account: string;         // 用户账号
    status: boolean;         // 用户状态
}

// API 响应结构
export interface ApiResponse<T> {
    code: number;       // 响应码（0 表示成功）
    message: string;    // 响应信息
    data: T;            // 具体数据
}

// 具体的用户数据接口（用于返回多个用户）
export interface UserListResponse {
    data: UserInfo[];  // 用户列表
    total: number;      // 总条数（如果有分页）
}

// 用户列表响应
export interface UserListResponse {
    data: UserInfo[];   // 用户列表
    total: number;      // 总数
}

// 最终用于请求的 API 类型
export type GetUserListAPIResponse = ApiResponse<UserListResponse>;