<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useUserInfoStore } from '@/stores'
import router from "@/router"
import { loginAPI } from '@/api/user.ts'

let loginForm = ref({
  username: "",
  password: "",
});

const loginRef = ref(); // 引用 el-form 组件实例

const userInfoStore = useUserInfoStore();

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { pattern: /^[a-zA-Z0-9]{1,10}$/, message: "用户名必须是1-10个字符长度的数字或英文字母", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15个字符长度的非空字符', trigger: 'blur'}
  ]
}

const login = async () => {
  // 先校验输入内容格式正确
  const valid = await loginRef.value.validate();
  // 通过校验，开始加载
  if (valid) {
    const { data: res } = await loginAPI(loginForm.value);
    console.log(res);
    // 登录失败
    if ( res.code != 0 ) {
      return false;
    }
    // 登陆成功
    ElMessage.success('登陆成功');
    // 把后端返回的当前登录用户信息存储到Pinia里
    userInfoStore.userInfo = res.data;
    console.log(userInfoStore.userInfo);
    // 跳转到首页
    router.push('/');
  } else {
    return false;
  }
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <!-- xs用于响应式布局，令大屏幕下左列留空，右列为登陆表单；小屏幕下左列不显示，只显示登陆表单 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登陆表单 -->
        <h1>Stocks 身份认证</h1>
        <el-form class="login_form">
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item class="login_and_register">
            <el-button class="login_button" type="primary" @click="login">登陆</el-button>
            <el-button type="info" @click="$router.push('/register')">去注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>