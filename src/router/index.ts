import { createRouter, createWebHistory } from 'vue-router';
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts';

const constantRoute = [
  {
    path: '/user/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      icon: '',
      requiresAuth: false,
    },
  },
  {
    path: '/user/register',
    component: () => import('@/views/register/index.vue'),
    name: 'register',
    meta: {
      title: '注册',
      hidden: true,
      icon: '',
      requiresAuth: false,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: '',
      requiresAuth: false,
    },
  },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
      requiresAuth: false,
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/layout/dashboard/index.vue'),
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'House',
          requiresAuth: false,
        },
      },
      {
        path: '/mystocks',
        component: () => import('@/views/layout/mystocks/index.vue'),
        name: 'mystocks',
        meta: {
          title: 'MyStocks',
          icon: 'Document',
          requiresAuth: false,
        },
      },
      {
        path: '/management',
        component: () => import('@/views/layout/management/index.vue'),
        name: 'management',
        meta: {
          title: 'Management',
          icon: 'Management',
          requiresAuth: true,
          roles: 1
        },
      },
      {
        path: '/profile',
        component: () => import('@/views/layout/profile/index.vue'),
        name: 'profile',
        meta: {
          title: 'Profile',
          icon: 'User',
          requiresAuth: false,
        },
      },
    ],
  },
];

// 任意路由，用于将任何未匹配到的路径重定向到404页面
const anyRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: '',
    requiresAuth: false,
  },
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoute, anyRoute],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }; // 页面滚动至顶部
  },
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const loginUserStore = useLoginUserStore();

  if (to.meta.requiresAuth && !loginUserStore.loginUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;