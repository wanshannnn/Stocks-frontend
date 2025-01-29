import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCurrentUser } from '@/api/user.ts';
import type { UserInfo } from '@/types/user.ts';

export const useLoginUserStore = defineStore('loginUser', () => {
    const loginUser = ref<UserInfo | null>(null);

    async function fetchLoginUser() {
        const res = await getCurrentUser();
        if (res.data.code === 0 && res.data.data) {
            loginUser.value = res.data.data;
        }
    }

    function setLoginUser(newLoginUser: UserInfo | null) {
        loginUser.value = newLoginUser;
    }

    function clearLoginUser() {
        loginUser.value = null;
    }

    return {
        loginUser, fetchLoginUser, setLoginUser, clearLoginUser
    };
}, {
    persist: {
        storage: localStorage,
    },
});