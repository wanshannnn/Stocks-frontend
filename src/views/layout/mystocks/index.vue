<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCollectionStockDataByUserIdAPI } from '@/api/stock.ts';
import { ElMessage } from 'element-plus';
import type { StockInfo } from '@/types/stock.ts';

const userId = '123456'; // 假设这是当前用户的ID
const loading = ref(true);
const collectionStocks = ref<StockInfo[] | null>(null);

const fetchCollectionStocks = async (userId: string) => {
  try {
    const res = await getCollectionStockDataByUserIdAPI(userId);
    if (res.data.code === 0) {
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
    <el-card class="stock-card" :loading="loading">
      <el-table :data="collectionStocks" style="width: 100%">
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
.collection-stocks-page {
  padding: 20px;
}

.stock-card {
  margin-top: 20px;
}
</style>
