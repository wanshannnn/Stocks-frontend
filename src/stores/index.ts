import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user.ts'  // 引入用户信息的类型
import { ref } from 'vue'

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        userInfo: ref<UserInfo | null>(null),  // 定义用户信息的初始状态
    }),
    persist: true,  // 持久化存储用户信息
})