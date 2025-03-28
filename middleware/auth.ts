import {index} from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
    const loginUserStore = index();

    if (to.meta.requiresAuth && !loginUserStore.loginUser) {
        return navigateTo('/user/login');
    }

    return true;
});