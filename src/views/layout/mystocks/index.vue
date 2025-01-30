<script setup lang="ts">
import AllStocks from "@/components/allStocks.vue";
import HoldStocks from "@/components/holdStocks.vue";
</script>

<template>
  <div class="mystocks-container">
    <el-row>
      <el-col :xs="24" :sm="11" :md="11" class="stock-container">
        <AllStocks/>
      </el-col>
      <el-col :xs="24" :sm="11" :md="11" class="stock-container">
        <HoldStocks/>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.stock-container {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px;
}
</style>