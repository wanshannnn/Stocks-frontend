import Mock from 'mockjs';

Mock.mock(/\/stocks\/id\/\d+\/latest/, 'get', (options: any) => {
    const id = options.url.match(/\/stocks\/id\/(\d+)\/latest/)[1];
    return {
        code: 0, // 成功的返回码
        data: {
            id,
            price: Mock.mock('@float(10, 1000, 0, 2)'),
            exchange: Mock.mock('@integer(1000, 10000)'),
            turnover: Mock.mock('@integer(1000, 10000)'),
            volume: Mock.mock('@integer(1000, 10000)'),
            amplitude: Mock.mock('@integer(1000, 10000)'),
            name: Mock.mock('@ctitle(3, 5)'),
            highest: Mock.mock('@integer(1000, 10000)'),
            lowest: Mock.mock('@integer(1000, 10000)'),
            date: Mock.mock('@date("yyyy-MM-dd")'),
        }
    };
});