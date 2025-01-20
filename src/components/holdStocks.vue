<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPossessionStockDataByUserIdAPI } from '@/api/stock.ts';
import { ElMessage } from 'element-plus';
import type { StockInfo } from '@/types/stock.ts';

const userId = '12345'; // 假设这是当前用户的ID
const loading = ref(true);
const possessionStocks = ref<StockInfo[] | null>(null);

const fetchPossessionStocks = async (userId: string) => {
  try {
    const res = await getPossessionStockDataByUserIdAPI(userId);
    if (res.data.code === 0) {
      possessionStocks.value = res.data.data;
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
        <el-table-column label="股票名称" prop="name"></el-table-column>
        <el-table-column label="股票代码" prop="code"></el-table-column>
        <el-table-column label="当前价格" prop="price"></el-table-column>
        <el-table-column label="成交额" prop="volume"></el-table-column>
        <el-table-column label="涨跌幅" prop="exchange"></el-table-column>
        <el-table-column label="成交量" prop="turnover"></el-table-column>
        <el-table-column label="振幅" prop="amplitude"></el-table-column>
        <el-table-column label="最高" prop="highest"></el-table-column>
        <el-table-column label="最低" prop="lowest"></el-table-column>
        <el-table-column label="更新时间" prop="date"></el-table-column>
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
}

.hold-earning-text {
  text-align: center;
  padding-bottom: 10px;
}
</style>
