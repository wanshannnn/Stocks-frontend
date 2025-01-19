<script setup lang="ts">
import Possession from "@/components/possession.vue";
import Collection from "@/components/collection.vue";
</script>

<template>
  <div class="container">
    <el-row>
      <el-col :span="11" class="stock-container">
        <Possession/>
      </el-col>
      <el-col :span="11" class="stock-container">
        <Collection/>
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
  margin: 20px;
}
</style>