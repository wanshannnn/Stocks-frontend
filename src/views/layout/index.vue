<script setup lang="ts">
import { useUserInfoStore } from '@/stores/index.ts';
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { fixPwdAPI } from '@/api/user';

const isCollapse = ref(false);
const dialogFormVisible = ref(false);
const pwdRef = ref();
const form = reactive({
  oldPwd: '',
  newPwd: '',
  rePwd: '',
})
const menuList = [
  {
    title: ' Dashboard',
    path: '/dashboard',
    icon: 'House',
  },
  {
    title: 'MyStocks',
    path: '/mystocks',
    icon: 'Document',
  },
  {
    title: 'Management',
    path: '/management',
    icon: 'Management',
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: 'User',
  },
]

// 修改密码的校验规则
const samePwd = (rules: any, value: any, callback: any) => {
  if (value !== form.newPwd) {
    callback(new Error('两次输入的密码不一致!'));
  } else {
    callback();
  }
}
const rules = {
  oldPwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '原密码必须是6-15位字符长度的非空字符', trigger: 'blur' }
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '新密码必须是6-15位字符长度的非空字符', trigger: 'blur' }
  ],
  rePwd: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '新密码必须是6-15位字符长度的非空字符', trigger: 'blur' },
    { validator: samePwd, trigger: 'blur' }
  ]
}

// 关闭修改密码对话框
const cancelForm = () => {
  ElMessage({
    type: 'info',
    message: '已取消修改',
  })
  dialogFormVisible.value = false;
}

// 修改密码
const fixPwd = async () => {
  const valid = await pwdRef.value.validate();
  if (valid) {
    const submitForm = {
      oldPwd: form.oldPwd,
      newPwd: form.newPwd,
    }
    console.log('要提交的表单信息');
    console.log(submitForm);
    const { data: res } = await fixPwdAPI(submitForm);
    if (res.code != 0) return ElMessage({
      type: 'success',
      message: '修改成功',
    })
    dialogFormVisible.value = false;
  } else {
    return false;
  }
}

// 侧边栏路径
const route = useRoute();
const getActiveAside = () => {
  return route.path;
};

// 退出登陆时出现确认弹窗
const userInfoStore = useUserInfoStore();
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
    userInfoStore.$reset(); // 清除用户信息和状态
    ElMessage({
      type: 'success',
      message: '退出成功',
    })
    router.push('/login');
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
  <div class="home-container">
    <el-container>
      <!-- 侧边栏 -->
      <!-- isCollapse 用于判断侧边栏是否展开 -->
      <!-- getActiveAside 用于动态返回当前路由的路径，从而确定哪个菜单项应该被高亮显示 -->
      <!-- unique-opened router 用于点击侧边栏时进行路径跳转 -->
      <el-menu :default-active="getActiveAside()"
               :width="isCollapse ? '60px' : '200px'" :collapse="isCollapse"
               unique-opened router>
        <template v-for="item in menuList" :key="item.path">
          <el-menu-item :index="item.path">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span v-if="!isCollapse">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>

      <el-container class="header-container">
        <!-- 顶部栏 -->
        <el-header>
          <!-- 控制侧边栏是否展开 -->
          <el-icon class="icon" v-if="isCollapse">
            <Expand @click.stop="isCollapse = !isCollapse" />
          </el-icon>
          <el-icon class="icon" v-else>
            <Fold @click.stop="isCollapse = !isCollapse" />
          </el-icon>
          <!-- 用户登陆情况 -->
          <el-dropdown style="float: right">
            <el-button type="primary">
              {{ userInfoStore.userInfo ? userInfoStore.userInfo.username : '未登录' }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="dialogFormVisible = true">修改密码</el-dropdown-item>
                <el-dropdown-item @click="quitFn">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- Github -->
          <a href="https://github.com/wanshannnn" style="float: right">
            <img
                src="@/assets/icons/github.svg"
                alt="Github"
                style="width: 36px; height: 36px; transform: translate(0px, 12px);"
            />
          </a>
        </el-header>

        <!-- 主体部分 -->
        <el-main class="main-container">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="dialogFormVisible" title="修改密码" width="500">
      <el-form :model="form" :rules="rules" ref="pwdRef">
        <el-form-item prop="oldPwd" label="原密码" width='80px'>
          <el-input v-model="form.oldPwd" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="newPwd" label="新密码" width='80px'>
          <el-input v-model="form.newPwd" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="rePwd" label="确认密码" width='80px'>
          <el-input v-model="form.rePwd" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelForm" class="cancel-button">取消</el-button>
          <el-button type="primary" @click="fixPwd">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  height: 100vh;
  background-color: var(--color-surface);
  display: flex;
}

.el-header {
  background-color: var(--color-surface);
  color: #333333;
  line-height: 60px;

  .el-dropdown .el-button {
    float: right;
    width: 80px;
    margin: 14px 20px;
    background-color: #F7F7F7;
    border-color: #D1D1D1;
    color: #333333;

  }
}

.el-menu {
  padding: 60px 0 0 0;
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border-right: 1px solid var(--color-border);
}

.el-menu-item {
  padding-right: 30px;
  font-size: 12px;
  display: flex;
  justify-content: left;
  height: 48px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--color-hover-light);
    color: var(--color-primary);
  }
}

.el-menu-item.is-active {
  background-color: var(--color-hover);
  color: var(--color-text-light);
  font-weight: bold;
  border-left: 4px solid var(--color-primary);
}
</style>