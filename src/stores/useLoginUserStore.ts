import { ref } from "vue";
import { getCurrentUser } from "@/api/user.ts";

export const useLoginUserStore = () => {
    const loginUser = ref<any>({
        username: "未登陆",
    })

    async function fetchLoginUser() {
        const res = await getCurrentUser();
        if (res.data.code === 0 && res.data.data) {
            loginUser.value = res.data.data;
        }
    }

    function setLoginUser(newLoginUser: any) {
        loginUser.value = newLoginUser;
    }

    function clearLoginUser() {
        loginUser.value = {
            username: "未登陆",
        };
    }

    return {loginUser, fetchLoginUser, setLoginUser, clearLoginUser};
}