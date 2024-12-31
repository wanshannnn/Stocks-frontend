<script setup lang="ts">
import { useUserInfoStore } from '@/stores/index.ts';
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import {ref} from "vue";
import {useRoute} from "vue-router";

const dialogFormVisible = ref(false)
const isCollapse = ref(false)
const menuList = [
  {
    title: '首页',
    path: '/home',
    icon: 'HomeFilled',
  },
  {
    title: '数据大屏',
    path: '/screen',
    icon: 'Histogram',
  },
]

const userInfoStore = useUserInfoStore();
const route = useRoute();
const getActiveAside = () => {
  return route.path;
};

// 退出登陆时出现确认弹窗
const quitFn = () => {
  ElMessageBox.confirm(
      '是否确认退出登录',
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
   <!-- 侧边栏 -->
    <el-container class="sidebar_container">
      <el-menu :width="isCollapse ? '640px' : '200px'" :default-active="getActiveAside()" :collapse="isCollapse"
               background-color="#F7F7F7" text-color="#333333" unique-opened router>
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
        </el-header>

        <!-- 主体部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.home_container {
  height: 100%;
  background-color: #F7F7F7;
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
</style>