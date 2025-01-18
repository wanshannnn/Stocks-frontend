<script setup lang="ts">
import { useUserInfoStore } from '@/stores/index.ts';
import History from "@/components/history.vue";
import Latest from "@/components/latest.vue";

const userInfoStore = useUserInfoStore();
</script>

<template>
  <h2>Welcome {{ userInfoStore.userInfo ? '，' + userInfoStore.userInfo.username : '' }}</h2>
  <div class="main-container">

    <!-- 指数 -->
    <el-row>
      <el-col :span="6">
        <div class="index-container">
          <h3>SHCOMP</h3>
          <h4>3241.82</h4>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-container">
          <h3>SZCOMP</h3>
          <h4>10161.32</h4>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-container">
          <h3>ChiNext</h3>
          <h4>2067.27</h4>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-container">
          <h3>CSI300</h3>
          <h4>3812.34</h4>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <!-- 趋势图-->
      <el-col :span="8">
        <div class="history-graph">
          <History />
        </div>
      </el-col>
      <!-- 最新数据 -->
      <el-col :span="16">
        <div class="latest-stock-container">
          <Latest />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>
h2 {
  margin-left: 20px;
  font-family: 'Georgia', serif;
  font-size: 30px;
  font-weight: bold;
  color: var(--color-text-primary);
}

h3 {
  margin-left: 20px;
  font-family: 'Georgia', serif;
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text-primary);
}

h4 {
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
  color: var(--color-text-secondary);
}

.index-container {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-sizing: border-box;
  margin: 20px;
}

.history-graph {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 20px;
  margin: 20px;
}

.latest-stock-container {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 20px;
  margin: 20px;
}

</style>
