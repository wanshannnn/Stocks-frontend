# Stocks-frontend

结合了用户中心和股票分析平台的功能，目标是为用户展示实时股票数据，提供趋势分析、预测等功能。

## 技术栈

- 主要使用  Vue 3 + Vite + Typescript + Vue Router + Pinia
- 使用 Axios 与 Mock.js 发起请求并获取数据（由于后端提供的接口还存在一些问题，所以使用了模拟数据）。
- 使用 Echarts 绘制图表实现数据可视化。
- 组件库使用了 Element Plus 与 Ant Design ，对组件样式进行了自定义，如修改了主题色。

## 界面

#### 用户登陆与注册

登陆之后，通过Pinia保存登陆状态

<img src="/README/login.png">
<img src="/README/register.png">

#### 主页面（无需用户登陆）

顶部导航栏展示用户登陆信息

<img src="/README/dashboard-nouser.png">

已处于登陆状态时，下拉框进行修改密码和退出登陆操作

<img src="/README/dashboard-user.png">

<img src="/README/dashboard-fix-password.png">

History 和 Latest 组件分别展示最新数据与股票历史数据（其他分析结果和数据可视化内容待补充）

<img src="/README/dashboard-history-data.png">

#### 用户页面（判断有用户身份信息后放行）

All 和 Hold 组件分别展示用户的自选股票与持有股票

<img src="/README/mystocks.png">

#### 管理员页面（判断有管理员身份信息后放行）

查看、添加、修改、删除用户账号

<img src="/README/management.png">

<img src="/README/management-add.png">

<img src="/README/management-edit.png">

#### 用户个人信息与动态（判断有用户身份信息后放行）

<img src="/README/profile.png">

