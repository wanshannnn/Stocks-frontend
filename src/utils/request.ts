import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,});

// 定义请求拦截器
instance.interceptors.request.use(
    (config) => {
        const loginUserStore = useLoginUserStore();
        const token = loginUserStore.loginUser?.token;
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// 定义响应拦截器
instance.interceptors.response.use(
    (response) => {
        console.log(response);
        if ('code' in response.data && response.data.code !== 0) {
            ElMessage.error(response.data.msg);
        }
        return response;
    },
    (error) => {
        const loginUserStore = useLoginUserStore();
        if (error.response.status === 401) {
            loginUserStore.clearLoginUser();
            ElMessage.error('用户身份已过期');
            router.push('/');
        }
        return Promise.reject(error);
    }
)

export default instance
