<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import type {StockInfo} from "@/types/stock.ts";
import {getLatestStockDataByIdAPI, getLatestStockDataByNameAPI, getLatestStockDataByPageAPI} from "@/api/stock.ts";
import {ElMessage} from "element-plus";

const loading = ref(false);
const stockData = ref<StockInfo | { items: StockInfo[]; total: number } | null>(null);
const currentPage = ref(1);
const pageSize = ref(10);
const searchQuery = ref('');

const fetchStockDataByPage = async (page: number, size: number, id: string = '') => {
  loading.value = true;
  try {
    let res;
    if (id.trim()) {
      if (/^\d+$/.test(id)) {
        res = await getLatestStockDataByIdAPI(id);
      } else {
        res = await getLatestStockDataByNameAPI(id);
      }
    } else {
      res = await getLatestStockDataByPageAPI({
        page: page,
        size: size
      });
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

watch([currentPage, pageSize], ([newPage, newSize]) => {
  fetchUsersByPage(newPage, newSize);
});

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
    <el-row class="search-container" align="middle">
      <el-col :span="8">
        <p>Latest</p>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="12">
        <el-input
            v-model="searchQuery"
            placeholder="Please fill in the stock code or name"
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
          <el-table :data="stockData?.items" style="width: 100%">
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
              layout="total, prev, pager, next, jumper"
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
}

p {
  margin: 5px;
  font-family: 'Georgia', serif;
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text-primary);
}

.latest-stock-card {
  margin-top: 20px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}
</style>