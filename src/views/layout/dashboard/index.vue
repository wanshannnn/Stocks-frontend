<script setup lang="ts">
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts';
import History from "@/components/history.vue";
import Latest from "@/components/latest.vue";
import { computed, onMounted, reactive } from "vue";
import {getIndexesAPI} from "@/api/indexes.ts";

const loginUserStore = useLoginUserStore();
const username = computed(() => loginUserStore.loginUser?.username ?? '未登录用户');
const today = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date());
let indexes = reactive({
  SHCOMP: 0,
  SZCOMP: 0,
  ChiNext: 0,
  CSI300: 0
});

onMounted(async () => {
  try {
    const res = await getIndexesAPI();
    if (res.data.code === 0) {
      indexes.SHCOMP = res.data.data.SHCOMP;
      indexes.SZCOMP = res.data.data.SZCOMP;
      indexes.ChiNext = res.data.data.ChiNext;
      indexes.CSI300 = res.data.data.CSI300;
    } else {
      console.error('获取指数数据失败');
    }
  } catch (error) {
    console.error('请求指数数据失败', error);
  }
});

</script>

<template>
  <p class="welcome">Welcome, {{ username }}</p>
  <p class="current-date">Today：{{ today }}</p>
  <div class="dashboard-container">
    <!-- 指数 -->
    <el-row>
      <el-col :span="6">
        <div class="index-container">
          <h3>SHCOMP</h3>
          <h4>{{ indexes.SHCOMP }}</h4>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-container">
          <h3>SZCOMP</h3>
          <h4>{{ indexes.SZCOMP }}</h4>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-container">
          <h3>ChiNext</h3>
          <h4>{{ indexes.ChiNext }}</h4>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-container">
          <h3>CSI300</h3>
          <h4>{{ indexes.CSI300 }}</h4>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <!-- 趋势图-->
      <el-col :span="8">
        <div class="history-graph-container">
          <History/>
        </div>
      </el-col>
      <!-- 最新数据 -->
      <el-col :span="16">
        <div class="latest-stock-container">
          <Latest/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.welcome {
  margin-left: 20px;
  margin-bottom: -10px;
  font-family: 'Georgia', serif;
  font-size: 30px;
  font-weight: bold;
  color: var(--color-text-primary);
}

.current-date {
  margin-left: 25px;
  font-family: 'Georgia', serif;
  font-size: 15px;
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

.history-graph-container {
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
