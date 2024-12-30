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
        component: () => import('@/layout/index.vue'),
        name: 'home',
        meta: {
            title: '',
            hidden: false,
            icon: '',
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled',
                },
            },
        ],
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
    // 数据大屏
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            hidden: false,
            title: '数据大屏',
            icon: 'Platform',
        },
    },
]

// 异步路由，拥有特定权限的用户可以访问的页面
export const asnycRoute = [
    // 管理者页面：管理用户权限和菜单
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            icon: 'Lock',
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    icon: 'User',
                },
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    icon: 'Monitor',
                },
            },
        ],
    },
    // 用户页面：管理自选与持有股票
    {
        path: '/stock',
        component: () => import('@/layout/index.vue'),
        name: 'Stock',
        meta: {
            title: '股票自选管理',
            icon: 'Coin',
        },
        redirect: '/stock/collection',
        children: [
            {
                path: '/stock/collection',
                component: () => import('@/views/stock/collection/index.vue'),
                name: 'Collection',
                meta: {
                    title: '自选',
                    icon: 'CollectionTag',
                },
            },
            {
                path: '/stock/possession',
                component: () => import('@/views/stock/possession/index.vue'),
                name: 'Possession',
                meta: {
                    title: '持有',
                    icon: 'Suitcase',
                },
            },
        ],
    },
]

// 任意路由，用于将任何未匹配到的路径重定向到404页面
export const anyRoute = {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine',
    },
}
