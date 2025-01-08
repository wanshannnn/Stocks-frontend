import { createRouter, createWebHistory } from 'vue-router';
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes.ts";
import { useUserInfoStore } from '@/stores/index.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  scrollBehavior: () => ({ left: 0, top: 0 }), // 简化滚动行为
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userInfoStore = useUserInfoStore();
  const { roles, isAuthenticated } = userInfoStore;

  if (!isAuthenticated) {
    handleUnauthenticatedUser(to, next);
  } else {
    handleAuthenticatedUser(to, next, roles);
  }
});

// 处理未认证用户的跳转逻辑
function handleUnauthenticatedUser(to, next) {
  if (to.path !== '/login') {
    return next('/login'); // 重定向到登录页
  }
  return next(); // 放行登录页
}

// 处理已认证用户的跳转逻辑
function handleAuthenticatedUser(to, next, roles) {
  if (to.path === '/login') {
    return next('/'); // 登录后禁止访问登录页，重定向到主页
  }

  if (!router.hasRoute('user')) {
    // 动态添加路由
    addDynamicRoutes(roles);
    return next({ ...to, replace: true }); // 确保路由生效
  }

  // 确保当前路径有效
  if (!isRouteValid(to.path)) {
    return next('/404'); // 无效路径跳转到404
  }

  return next(); // 放行当前导航
}

// 动态添加路由
function addDynamicRoutes(roles) {
  const accessibleRoutes = filterAsyncRoutes(asyncRoute, roles);
  accessibleRoutes.forEach((route) => router.addRoute(route));
  router.addRoute(anyRoute); // 添加任意路由
}

// 验证路径有效性
function isRouteValid(path) {
  return router.getRoutes().some((route) => route.path === path);
}

// 根据用户角色过滤路由
function filterAsyncRoutes(routes, roles) {
  return routes.filter((route) => {
    return !route.meta?.roles || roles.some((role) => route.meta.roles.includes(role));
  });
}

export default router;
