# Stocks-frontend

一个为用户提供股票最新信息与趋势分析的网站。

## 技术栈

- 主要使用  Vue 3 + Vite + Typescript + Pinia
- 使用 Axios 与 Mock.js 发起请求并获取数据（由于后端提供的接口还有待变更，所以使用了模拟数据），使用 Echarts 绘制图表实现数据可视化。
- 组件库使用了 Element Plus 与 Ant Design 并对组件进行了自定义，如修改了主题色。

## 界面

用户登陆与注册

<img src="/README/login.png">
<img src="/README/register.png">

主页面：展示最新数据与股票历史数据（根据id搜索，其他分析结果待补充）

<img src="/README/dashboard.png">

用户页面：收益、管理自选股票与持有股票

<img src="/README/mystocks.png">

管理员页面：管理用户账号

<img src="/README/management.png">

用户个人信息与动态

<img src="/README/profile.png">

