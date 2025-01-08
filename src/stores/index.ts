import { defineStore } from 'pinia';
import type { UserInfo } from '@/types/user.ts';

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        userInfo: null as UserInfo | null,
        roles: [] as string[],
        isAuthenticated: false,
    }),
    actions: {
        setRoles(roles: string[]) {
            this.roles = roles;
        },
        setAuthenticated(status: boolean) {
            this.isAuthenticated = status;
        },
        setUserInfo(userInfo: UserInfo) {
            this.userInfo = userInfo;
        },
    },
    persist: true,
})