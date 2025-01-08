import Mock from 'mockjs';

// 模拟登录接口
Mock.mock('/api/user/login', 'post', (options) => {
    const { username, password } = JSON.parse(options.body);
    if (username === 'admin' && password === '123456') {
        return {
            code: 0,
            message: '登录成功',
            data: {
                token: 'mock-token-123456',
                roles: ['admin'],
            },
        };
    } else if (username === 'user' && password === '123456') {
        return {
            code: 0,
            message: '登录成功',
            data: {
                token: 'mock-token-654321',
                roles: ['user'],
            },
        };
    }
    return {
        code: 1,
        message: '用户名或密码错误',
        data: null,
    };
});

// 模拟注册接口
Mock.mock('/api/user/register', 'post', (options) => {
    const {username, password, repassword} = JSON.parse(options.body);
    return {
        code: 0,
        message: '注册成功',
        data: {
            id: 1,
            username,
        },
    };
});

// 模拟修改密码接口
Mock.mock('/api/user/fixpwd', 'put', (options) => {
    const { oldPassword, newPassword } = JSON.parse(options.body);
    if (oldPassword === '123456') {
        return {
            code: 0,
            message: '密码修改成功',
            data: null,
        };
    }
    return {
        code: 1,
        message: '密码修改失败，旧密码不正确',
        data: null,
    };
});


// 自定义函数格式化为六位数的股票代码
function generateStockCode(id: number): string {
    return id.toString().padStart(6, '0');
}


// 模拟根据股票 id 获取股票数据
Mock.mock(/\/stocks\/id\/\d+\/latest/, 'get', (options: any) => {
    const id = options.url.match(/\/stocks\/id\/(\d+)\/latest/)[1];
    return {
        code: 0, // 返回的成功码
        data: {
            id,
            code: generateStockCode(id),
            price: Mock.mock('@float(10, 1000, 0, 2)'),
            exchange: Mock.mock('@integer(1000, 10000)'),
            turnover: Mock.mock('@integer(1000, 10000)'),
            volume: Mock.mock('@integer(1000, 10000)'),
            amplitude: Mock.mock('@integer(1000, 10000)'),
            name: Mock.mock('@ctitle(3, 5)'),
            highest: Mock.mock('@integer(1000, 10000)'),
            lowest: Mock.mock('@integer(1000, 10000)'),
            date:  Mock.mock('@date("yyyy-MM-dd")'),
        }
    };
});


// 模拟根据股票 name 获取股票数据
Mock.mock(/\/stocks\/name\/[^/]+\/latest/, 'get', (options: any) => {
    const name = decodeURIComponent(options.url.match(/\/stocks\/name\/([^/]+)\/latest/)[1]);
    return {
        code: 0,
        data: {
            id: Mock.mock('@integer(1, 100000)'),
            name,
            code: generateStockCode(Mock.mock('@integer(1, 100000)')),
            price: Mock.mock('@float(10, 1000, 0, 2)'),
            exchange: Mock.mock('@integer(1000, 10000)'),
            turnover: Mock.mock('@integer(1000, 10000)'),
            volume: Mock.mock('@integer(1000, 10000)'),
            amplitude: Mock.mock('@integer(1000, 10000)'),
            highest: Mock.mock('@integer(1000, 10000)'),
            lowest: Mock.mock('@integer(1000, 10000)'),
            date: Mock.mock('@date("yyyy-MM-dd")'),
        }
    };
});


// 模拟分页获取最新股票数据
const getLatestStockDataByPageMockAPI = Mock.mock({
    'items|200': [
        {
            'id|+1': 1,
            'code': function(this: any) {
                return generateStockCode(this.id);
            },
            'name': '@ctitle(3, 5)',
            'price': '@float(10, 1000, 0, 2)',
            'volume': '@integer(1000, 10000)',
            'exchange': '@integer(1000, 10000)',
            'turnover': '@integer(1000, 10000)',
            'amplitude': '@integer(1000, 10000)',
            'highest': '@integer(1000, 10000)',
            'lowest': '@integer(1000, 10000)',
            'date': '@date("yyyy-MM-dd")',
        }
    ]
});
Mock.mock(/\/stocks\/latest\/page/, 'get', (options: any) => {
    const urlParams = new URLSearchParams(options.url.split('?')[1]);
    const page = parseInt(urlParams.get('page') || '1');
    const size = parseInt(urlParams.get('size') || '20');
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const items = getLatestStockDataByPageMockAPI.items.slice(startIndex, endIndex);
    return {
        code: 0,
        data: {
            items,
            total: getLatestStockDataByPageMockAPI.items.length,
        }
    };
});


// 模拟用户自选股票数据
Mock.mock(/\/stocks\/userId\/\d+\/collection/, 'get', (options: any) => {
    const userId = options.url.match(/\/stocks\/userId\/(\d+)\/collection/)[1];
    const stockList = Array.from({ length: 5 }).map((_, index) => ({
        userId: userId,
        stockId: index + 1,
        code: generateStockCode(index + 1),
        name: Mock.mock('@ctitle(3, 5)'),
        price: Mock.mock('@float(10, 1000, 0, 2)'),
        volume: Mock.mock('@integer(1000, 10000)'),
        exchange: Mock.mock('@integer(1000, 10000)'),
        turnover: Mock.mock('@integer(1000, 10000)'),
        amplitude: Mock.mock('@integer(1000, 10000)'),
        highest: Mock.mock('@integer(1000, 10000)'),
        lowest: Mock.mock('@integer(1000, 10000)'),
        date: Mock.mock('@date("yyyy-MM-dd")'),
    }));
    return {
        code: 0,
        data: stockList,
    };
});


// 模拟用户持有股票数据
Mock.mock(/\/stocks\/userId\/\d+\/possession/, 'get', (options: any) => {
    const userId = options.url.match(/\/stocks\/userId\/(\d+)\/possession/)[1];
    const stockList = Array.from({ length: 5 }).map((_, index) => ({
        userId: userId,
        stockId: index + 1,
        code: generateStockCode(index + 1),
        name: Mock.mock('@ctitle(3, 5)'),
        price: Mock.mock('@float(10, 1000, 0, 2)'),
        volume: Mock.mock('@integer(1000, 10000)'),
        exchange: Mock.mock('@integer(1000, 10000)'),
        turnover: Mock.mock('@integer(1000, 10000)'),
        amplitude: Mock.mock('@integer(1000, 10000)'),
        highest: Mock.mock('@integer(1000, 10000)'),
        lowest: Mock.mock('@integer(1000, 10000)'),
        date: Mock.mock('@date("yyyy-MM-dd")'),
    }));
    return {
        code: 0,
        data: stockList,
    };
});


// 模拟分页展示用户数据
const userPageListMockAPI = Mock.mock({
    'items|200': [
        {
            'id|+1': 1,
            username: '@cname',
            account: '@integer(0, 1000)',
            status: '@boolean',
            createTime: '@date("yyyy-MM-dd")',
        }
    ]
});
Mock.mock(/\/user\/page/, 'get', (options: any) => {
    const urlParams = new URLSearchParams(options.url.split('?')[1]);
    const page = parseInt(urlParams.get('page') || '1');
    const size = parseInt(urlParams.get('size') || '20');
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const items = userPageListMockAPI.items.slice(startIndex, endIndex);
    return {
        code: 0,
        data: {
            items,
            total: userPageListMockAPI.items.length,
        },
    };
});


// 模拟添加用户信息
Mock.mock(/\/user\/add/, 'post', (options: any) => {
    return {
        code: 0,
        message: '添加成功',
    };
});


// 模拟更新用户信息
Mock.mock(/\/user\/update/, 'put', (options: any) => {
    return {
        code: 0,
        message: '更新成功',
    };
});


// 模拟删除用户信息
Mock.mock(/\/user\/delete\/\d+/, 'delete', (options: any) => {
    const id = options.url.match(/\/user\/delete\/(\d+)/)?.[1];
    return {
        code: 0,
        message: `用户删除成功 (ID: ${id})`,
    };
});