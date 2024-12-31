<script setup lang="ts">
</script>

<template>
  <div class="empty_box">
    <el-empty description="404 Not Found" />
    <el-button type="info" @click="$router.push('/home')">返回首页</el-button>
  </div>
</template>

<style scoped>
.empty_box {
  display: flex;
  flex-direction: column;  /* 让元素竖直排列 */
  align-items: center;  /* 水平居中对齐 */
  justify-content: center;  /* 垂直居中对齐 */
  width: 100vw;
  height: 80vh;

}
</style>