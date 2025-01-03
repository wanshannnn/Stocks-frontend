// 常量路由，所有用户都可以访问的路径
export const constantRoute = [
    // 登录
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录', //菜单标题
            hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
            icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
        },
    },
    // 注册
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
    // 登录成功以后展示数据的路径
    {
        path: '/',
        component: () => import('@/views/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: '',
        },
        redirect: '/home',
        children: [{
            path: '/home',
            component: () => import('@/views/layout/home/index.vue'),
            name: 'home',
        },{
            path: '/trend',
            component: () => import('@/views/layout/screen/trend/index.vue'),
            name: 'trend',
        },
        {
            path: '/latest',
            component: () => import('@/views/layout/screen/latest/index.vue'),
            name: 'latest',
        },
        // 管理者：管理用户权限
        {
            path: '/user',
            component: () => import('@/views/layout/user/index.vue'),
            name: 'user',
            meta: {
                title: '用户管理',
                icon: 'User',
            },
        },
        // 用户：管理自选股票
        {
            path: '/stock/collection',
            component: () => import('@/views/layout/stock/collection/index.vue'),
            name: 'collection',
            meta: {
                title: '自选股票',
                icon: 'CollectionTag',
            },
        },
        // 用户：管理持有股票
        {
            path: '/stock/possession',
            component: () => import('@/views/layout/stock/possession/index.vue'),
            name: 'possession',
            meta: {
                title: '持有股票',
                icon: 'Suitcase',
            },
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

// // 异步路由，拥有特定权限的用户可以访问的页面（等到实现页面之后再考虑权限分配）
// export const asnycRoute = [
//     // 管理者：管理用户权限
//     {
//         path: '/user',
//         component: () => import('@/views/layout/user/index.vue'),
//         name: 'user',
//         meta: {
//             title: '用户管理',
//             icon: 'User',
//         },
//     },
//     // 用户：管理自选股票
//     {
//         path: '/stock/collection',
//         component: () => import('@/views/layout/stock/collection/index.vue'),
//         name: 'collection',
//         meta: {
//             title: '自选股票',
//             icon: 'CollectionTag',
//         },
//     },
//     // 用户：管理持有股票
//     {
//         path: '/stock/possession',
//         component: () => import('@/views/layout/stock/possession/index.vue'),
//         name: 'possession',
//         meta: {
//             title: '持有股票',
//             icon: 'Suitcase',
//         },
//     },
// ]

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
