import { createRouter, createWebHistory } from 'vue-router';
import { constantRoute, anyRoute } from "@/router/routes.ts";
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash }; // 支持锚点导航
    }
    return { left: 0, top: 0 };
  },
});

// // 路由守卫
// router.beforeEach(async (to, from, next) => {
//   const userInfoStore = useUserInfoStore();
//   const { roles, isAuthenticated } = userInfoStore;
//
//   // 未认证用户逻辑
//   if (!isAuthenticated) {
//     if (['/login', '/register'].includes(to.path)) {
//       return next(); // 放行登录或注册页
//     }
//     return next('/login'); // 未认证用户重定向到登录页
//   }
//
//   // 已登录用户逻辑
//   if (to.path === '/login') {
//     return next('/'); // 登录后禁止访问登录页
//   }
//
//   addDynamicRoutes(roles);
//
//   // 检查目标路径是否有权限
//   const targetRoute = router.getRoutes().find((route) => route.path === to.path);
//   if (targetRoute?.meta?.roles) {
//     const routeRoles = targetRoute.meta.roles as string[];
//     const hasPermission = roles.some((role) => routeRoles.includes(role));
//     if (!hasPermission) {
//       return next('/404'); // 无权限跳转到404
//     }
//   }
//
//   next(); // 放行
// });
//
// // 根据用户角色过滤路由
// function filterAsyncRoutes(routes: any, roles: any) {
//   return routes.filter((route: any) => {
//     const routeRoles = route.meta?.roles;
//     // 如果路由没有角色限制，所有用户都可访问
//     if (!routeRoles) {
//       return true;
//     }
//     // 如果有角色限制，严格匹配用户角色
//     return roles.some((role: any) => routeRoles.includes(role));
//   });
// }
//
// function addDynamicRoutes(roles: any) {
//   const accessibleRoutes = filterAsyncRoutes(asyncRoute, roles);
//   accessibleRoutes.forEach((route: any) => router.addRoute(route));
//   router.addRoute(anyRoute); // 添加通配路由（404）
// }
//
export default router;
