// import { defineStore } from 'pinia';
// import type { UserInfo } from '@/types/user.ts';
//
// export const useUserInfoStore = defineStore('userInfo', {
//     state: () => ({
//         userInfo: null as UserInfo | null,
//         isAuthenticated: false,
//     }),
//     actions: {
//         setAuthenticated(status: boolean) {
//             this.isAuthenticated = status;
//         },
//         setUserInfo(userInfo: UserInfo) {
//             this.userInfo = userInfo;
//         },
//         $reset() {
//             this.userInfo = null;
//             this.isAuthenticated = false;
//         },
//     },
//     persist: true,
// }