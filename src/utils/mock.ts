import Mock from 'mockjs';


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
    const { page = 10, size = 20 } = options.url.match(/page=(\d+)&size=(\d+)/)?.groups || {};
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

    // 模拟一个用户自选股票的列表
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

    // 模拟一个用户自选股票的列表
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
    return {
        code: 0,
        message: '删除成功',
    };
});