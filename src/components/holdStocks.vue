<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPossessionStockDataByUserIdAPI } from '@/api/stock.ts';
import { ElMessage } from 'element-plus';
import type { StockInfo } from '@/types/stock.ts';

const userId = 123456;
const loading = ref(true);
const possessionStocks = ref<StockInfo[] | null>(null);

const fetchPossessionStocks = async (userId: number) => {
  try {
    const res = await getPossessionStockDataByUserIdAPI(userId);
    if (res.code === 0) {
      const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
      possessionStocks.value = data;
    } else {
      ElMessage.error('获取持有股票失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPossessionStocks(userId);
});
</script>

<template>
  <div class="hold-stocks-page">
    <p>Hold</p>
    <el-row>
      <el-col :span="11" class="hold-earning-container">
        <p class="hold-earning-title">Today</p>
        <p class="hold-earning-text">+ 110.11</p>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="11" class="hold-earning-container">
        <p class="hold-earning-title">All</p>
        <p class="hold-earning-text">+ 1111.11</p>
      </el-col>
    </el-row>
    <el-card class="hold-stocks-card" :loading="loading" shadow="never">
      <el-table :data="possessionStocks" style="width: 100%">
        <el-table-column width="100" label="Name" prop="name"></el-table-column>
        <el-table-column width="100" label="Code" prop="code"></el-table-column>
        <el-table-column width="100" label="Price" prop="price"></el-table-column>
        <el-table-column width="100" label="Volume" prop="volume"></el-table-column>
        <el-table-column width="100" label="Exchange" prop="exchange"></el-table-column>
        <el-table-column width="100" label="Turnover" prop="turnover"></el-table-column>
        <el-table-column width="100" label="Amplitude" prop="amplitude"></el-table-column>
        <el-table-column width="100" label="Highest" prop="highest"></el-table-column>
        <el-table-column width="100" label="Lowest" prop="lowest"></el-table-column>
        <el-table-column width="120" label="Date" prop="date"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.hold-stocks-card {
  margin-top: 20px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

p {
  margin: 5px;
  font-family: 'Georgia', serif;
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text-primary);
}

.hold-earning-container {
  margin-top: 15px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.hold-earning-title {
  text-align: center;
  padding-top: 10px;
  font-size: min(2vw, 20px);
}

.hold-earning-text {
  text-align: center;
  padding-bottom: 10px;
  font-size: min(2vw, 20px);
}
</style>
