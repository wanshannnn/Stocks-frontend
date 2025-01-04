<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLatestStockDataByIdAPI, getLatestStockDataByNameAPI, getLatestStockDataByPageAPI } from '@/api/stock';
import { ElMessage } from 'element-plus';
import type { StockInfo } from '@/types/stock';

const loading = ref(true);
const stockData = ref<StockInfo | { items: StockInfo[]; total: number } | null>(null); // 更新类型
const currentPage = ref(1);
const pageSize = ref(20);
const searchQuery = ref('');

const fetchStockDataByPage = async (page: number, size: number, query: string = '') => {
  try {
    let res;
    if (query.trim()) {
      if (/^\d+$/.test(query)) {
        res = await getLatestStockDataByIdAPI(query);
      } else {
        res = await getLatestStockDataByNameAPI(query);
      }
    } else {
      res = await getLatestStockDataByPageAPI(page, size);
    }

    if (res.data.code === 0) {
      stockData.value = res.data.data;
    } else {
      ElMessage.error('获取数据失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStockDataByPage(currentPage.value, pageSize.value);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchStockDataByPage(page, pageSize.value, searchQuery.value);
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    loading.value = true;
    fetchStockDataByPage(1, pageSize.value, searchQuery.value);
  } else {
    fetchStockDataByPage(currentPage.value, pageSize.value);
  }
};
</script>

<template>
  <div class="latest-stock-page">
    <el-row class="header-row" align="middle">
      <el-col :span="18">
      </el-col>
      <el-col :span="6">
        <el-input
            v-model="searchQuery"
            placeholder="输入股票代码或名称"
            suffix-icon="el-icon-search"
            clearable
            @input="handleSearch"
            class="search-input"
        />
      </el-col>
    </el-row>

    <el-card class="stock-card" :loading="loading">
      <el-table :data="stockData && 'items' in stockData ? stockData.items : [stockData]" style="width: 100%">
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

      <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="stockData && 'total' in stockData ? stockData.total : 0"
          layout="total, prev, pager, next, jumper"
          @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<style scoped>
.latest-stock-page {
  padding: 20px;
}

.header-row {
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.search-input {
  width: 100%;
}

.stock-card {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
