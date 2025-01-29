<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCollectionStockDataByUserIdAPI } from '@/api/stock.ts';
import { ElMessage } from 'element-plus';
import type { StockInfo } from '@/types/stock.ts';

const userId = 123456;
const loading = ref(true);
const collectionStocks = ref<StockInfo[] | null>(null);

const fetchCollectionStocks = async (userId: number) => {
  try {
    const res = await getCollectionStockDataByUserIdAPI(userId);
    if (res.code === 0) {
      const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
      collectionStocks.value = data;
    } else {
      ElMessage.error('获取自选股票失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCollectionStocks(userId);
});
</script>

<template>
  <div class="collection-stocks-page">
    <p>All</p>
    <el-card class="all-stocks-card" :loading="loading" shadow="never">
      <el-table :data="collectionStocks" style="width: 100%">
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
.all-stocks-card {
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
</style>
