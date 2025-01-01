<script setup lang="ts">
import { useUserInfoStore } from '@/stores/index.ts';
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import {ref} from "vue";
import {useRoute} from "vue-router";

const dialogFormVisible = ref(false)
const menuList = [
  {
    title: '首页',
    path: '/home',
    icon: 'HomeFilled',
  },
  {
    title: '最新股价',
    path: '/newest',
    icon: 'Opportunity',
  },
  {
    title: '股价走势',
    path: '/trend',
    icon: 'TrendCharts',
  },
  {
    title: '自选股票',
    path: '/stock/collection',
    icon: 'CollectionTag',
  },
  {
    title: '持有股票',
    path: '/stock/possession',
    icon: 'Suitcase',
  },
  {
    title: '用户管理',
    path: '/acl/user',
    icon: 'User',
  },
  {
    title: '菜单管理',
    path: '/acl/permission',
    icon: 'Monitor',
  }
]

const userInfoStore = useUserInfoStore();
const route = useRoute();
const getActiveAside = () => {
  return route.path;
};

// 退出登陆时出现确认弹窗
const quitFn = () => {
  ElMessageBox.confirm(
      '请确认退出登录',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '退出成功',
        })
        // 清除用户信息，包括token
        userInfoStore.userInfo = null
        console.log(userInfoStore)
        router.push('/login')
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消退出',
        })
      })
}
</script>

<template>
  <div class="home_container">
    <el-container>
      <!-- 侧边栏 -->
      <!-- getActiveAside 用于动态返回当前路由的路径，从而确定哪个菜单项应该被高亮显示。-->
      <el-menu :default-active="getActiveAside()">
        <template v-for="item in menuList" :key="item.path">
          <el-menu-item :index="item.path">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>

      <el-container class="header_container">
        <!-- 顶部栏 -->
        <el-header>
          <!-- 用户登陆情况 -->
          <el-dropdown style="float: right">
            <el-button type="primary">
              {{ userInfoStore.userInfo ? userInfoStore.userInfo.account : '未登录' }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="dialogFormVisible = true">修改密码</el-dropdown-item>
                <el-dropdown-item @click="quitFn">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- Github仓库 -->
          <el-link href="https://github.com/wanshannnn" style="float: right">
            Github
          </el-link>
        </el-header>

        <!-- 主体部分 -->
        <el-main class="main_container">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.home_container {
  height: 100vh;
  background-color: #F7F7F7;
  display: flex;
}

.el-header {
  background-color: #F7F7F7;
  color: #333333;
  line-height: 60px;

  .el-dropdown .el-button {
    float: right;
    width: 80px;
    margin: 14px 20px;
    background-color: #E0E0E0;
    border-color: #D1D1D1;
    color: #333333;

    &:hover {
      background-color: #BDBDBD;
    }

  }
}

.el-menu {
  padding: 30px 0 0 0;
  background-color: #E0E0E0;
  text-color: #333333;
}

.el-menu-item {
  margin: 10px;
  padding-right: 30px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #BDBDBD;
  }
}

.el-menu-item.is-active {
  background-color: #333333;
  color: #E0E0E0;
  font-weight: bold;
}
</style>