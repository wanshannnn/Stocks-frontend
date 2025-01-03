<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLatestStockDataByIdAPI } from '@/api/stock'; // 引入 API
import { ElMessage } from 'element-plus';
import type { StockInfo } from '@/types/stock';

const loading = ref(true);
const stockData = ref<StockInfo | null>(null);

// 获取最新股票数据
const fetchLatestStockData = async () => {
  try {
    const res = await getLatestStockDataByIdAPI('1');
    if (res.data.code === 0) {
      stockData.value = res.data.data;
    } else {
      ElMessage.error('获取数据失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  } finally {
    loading.value = false; // 加载完成
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchLatestStockData();
});
</script>

<template>
  <div class="latest-stock-page">
    <el-card class="stock-card" :loading="loading">
      <h2 class="title">最新股票数据</h2>
      <div v-if="stockData">
        <p><strong>股票名称:</strong> {{ stockData.name }}</p>
        <p><strong>股票代码:</strong> {{ stockData.id }}</p>
        <p><strong>当前价格:</strong> {{ stockData.price }}</p>
        <p><strong>成交量:</strong> {{ stockData.volume }}</p>
        <p><strong>成交额:</strong> {{ stockData.turnover }}</p>
        <p><strong>波动幅度:</strong> {{ stockData.amplitude }}</p>
        <p><strong>最高价:</strong> {{ stockData.highest }}</p>
        <p><strong>最低价:</strong> {{ stockData.lowest }}</p>
        <p><strong>更新时间:</strong> {{ stockData.date }}</p>
      </div>
      <el-empty v-else description="没有数据" />
    </el-card>
  </div>
</template>

<style scoped>
.latest-stock-page {
  padding: 20px;
}

.stock-card {
  margin-top: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.el-empty {
  text-align: center;
}
</style>
