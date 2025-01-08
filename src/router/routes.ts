// 常量路由，所有用户都可以访问的路径
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录', //菜单标题
            hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
            icon: 'Promotion',
        },
    },
    {
        path: '/register',
        component: () => import('@/views/register/index.vue'),
        name: 'register',
        meta: {
            title: '注册',
            hidden: true,
            icon: 'Promotion',
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
        },
        redirect: '/latest',
        children: [
            {
                path: '/trend',
                component: () => import('@/views/layout/screen/trend/index.vue'),
                name: 'trend',
                meta: { title: '趋势分析', icon: 'TrendCharts' },
            },
            {
                path: '/latest',
                component: () => import('@/views/layout/screen/latest/index.vue'),
                name: 'latest',
                meta: { title: '最新资讯', icon: 'Document' },
            },
        ]
    },
    // 404
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'DocumentDelete',
        },
    },
]

// 异步路由（需要根据权限动态加载的路由）
export const asyncRoute = [
    {
        path: '/user',
        component: () => import('@/views/layout/user/index.vue'),
        name: 'user',
        meta: { title: '用户管理', icon: 'User', roles: ['admin'] }, // 仅管理员可访问
    },
    {
        path: '/stock/collection',
        component: () => import('@/views/layout/stock/collection/index.vue'),
        name: 'collection',
        meta: { title: '自选股票', icon: 'CollectionTag', roles: ['user'] }, // 仅用户可访问
    },
    {
        path: '/stock/possession',
        component: () => import('@/views/layout/stock/possession/index.vue'),
        name: 'possession',
        meta: { title: '持有股票', icon: 'Suitcase', roles: ['user'] }, // 仅用户可访问
    },
];

// 任意路由，用于将任何未匹配到的路径重定向到404页面
export const anyRoute = {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine',
    },
}
