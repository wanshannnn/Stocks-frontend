<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
import type {  StockList } from "@/types/stock.ts";
import { getLatestStockDataByIdAPI, getLatestStockDataByNameAPI, getLatestStockDataByPageAPI } from "@/api/stock.ts";

const loading = ref(false);
const stockData = ref<StockList | null>(null);
const currentPage = ref(1);
const pageSize = ref(10);
const searchQuery = ref('');
const paginationLayout = ref('total, prev, pager, next, jumper');

const fetchStockDataByPage = async (page: number, size: number, query: string = '') => {
  loading.value = true;
  try {
    let res;
    if (query.trim()) {
      if (/^\d+$/.test(query)) {
        res = await getLatestStockDataByIdAPI(query);
      } else {
        res = await getLatestStockDataByNameAPI(query);
      }
      if (!res || res.code !== 0 || !res.data) {
        throw new Error("查询股票数据失败，数据为空或格式错误");
      }
      stockData.value = { data: [res.data], total: 1 };
    } else {
      res = await getLatestStockDataByPageAPI({ page, size });

      if (!res || res.code !== 0 || !res.data || !Array.isArray(res.data.data)) {
        throw new Error("分页查询股票数据失败，数据为空或格式错误");
      }
      stockData.value = res.data;
    }
  } catch (error) {
    console.error("获取股价数据失败:", error);
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

// 监听屏幕大小变化
const updatePaginationLayout = () => {
  if (window.innerWidth <= 768) {
    paginationLayout.value = 'prev, pager, next'; // 小屏幕只显示上一页、页码和下一页
  } else {
    paginationLayout.value = 'total, prev, pager, next, jumper'; // 大屏幕显示完整分页
  }
};

onMounted(() => {
  updatePaginationLayout();
  window.addEventListener('resize', updatePaginationLayout);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePaginationLayout);
});
</script>

<template>
    <el-row class="search-container" align="middle">
      <el-col :span="8">
        <p>Latest</p>
      </el-col>
      <el-col :span="16">
        <el-input
            v-model="searchQuery"
            placeholder="请填写股票代码或名称"
            suffix-icon="el-icon-search"
            clearable
            @input="handleSearch"
            class="search-input"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="latest-stock-card" :loading="loading" shadow="never">
          <el-table :data="stockData?.data" style="width: 100%">
            <el-table-column label="Name" prop="name"></el-table-column>
            <el-table-column label="Code" prop="code"></el-table-column>
            <el-table-column label="Price" prop="price"></el-table-column>
            <el-table-column label="Volume" prop="volume"></el-table-column>
            <el-table-column label="Exchange" prop="exchange"></el-table-column>
            <el-table-column label="Turnover" prop="turnover"></el-table-column>
            <el-table-column label="Amplitude" prop="amplitude"></el-table-column>
<!--            <el-table-column label="Highest" prop="highest"></el-table-column>-->
<!--            <el-table-column label="Lowest" prop="lowest"></el-table-column>-->
<!--            <el-table-column label="Update" prop="date"></el-table-column>-->
          </el-table>
          <el-pagination
              v-if="stockData && stockData.total > 0"
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :total="stockData?.total"
              :layout="paginationLayout"
              @current-change="handlePageChange"
          />
        </el-card>
      </el-col>
    </el-row>
</template>

<style scoped>
.el-pagination {
  margin-top: 20px;
  text-align: center;
  justify-content: center;
}

p {
  margin: 5px;
  font-family: 'Georgia', serif;
  font-size: min(2vw, 20px);
  font-weight: bold;
  color: var(--color-text-primary);
}

.latest-stock-card {
  margin-top: 20px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}
</style>