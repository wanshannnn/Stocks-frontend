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
  <div class="possession-stocks-page">
    <p>Possession</p>
    <el-card class="stock-card" :loading="loading" shadow="never">
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
.stock-card {
  margin-top: 20px;
}

p {
  margin: 5px;
  font-family: 'Georgia', serif;
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text-primary);
}
</style>
