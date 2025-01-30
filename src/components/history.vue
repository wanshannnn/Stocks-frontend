<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { getStockDataByIdAPI } from "@/api/stock";

// 用户输入的股票代码
const input = ref<number>();

// 获取股价历史数据的API函数
const fetchStockData = async (id: number) => {
  try {
    const res = await getStockDataByIdAPI(id);
    if (res.code === 0) {
      return res.data.data || [];
    } else {
      console.error("请求错误: ", res.message || "未知错误");
      return [];
    }
  } catch (error) {
    console.error("获取股价数据失败:", error);
    return [];
  }
};

// 创建一个 ref 来绑定 DOM
const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null; // 存储 ECharts 实例

// 创建 ECharts 实例并渲染图表
const renderChart = (items: { date: string; price: number; volume: number; turnover: number }[]) => {
  if (!chartContainer.value) {
    console.error("Chart container is not available.");
    return;
  }

  // 销毁之前的图表实例，避免重复初始化
  if (chart) {
    chart.dispose();
  }
  chart = echarts.init(chartContainer.value);

  // 处理数据
  const dates = items.map((item) => item.date);
  const prices = items.map((item) => item.price);
  const volumes = items.map((item) => item.volume);
  const turnovers = items.map((item) => item.turnover);

  // 设置图表的配置项
  const option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["价格", "成交额", "成交量"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "价格",
        type: "line",
        data: prices,
      },
      {
        name: "成交额",
        type: "line",
        data: volumes,
      },
      {
        name: "成交量",
        type: "line",
        data: turnovers,
      },
    ],
  };

  // 使用刚指定的配置项和数据显示图表
  chart.setOption(option);
};

// 监听用户输入并获取数据更新图表
watch(input, async (newId) => {
  if (newId) {
    const stockData = await fetchStockData(newId);
    if (stockData.length === 0) {
      console.error("未获取到数据或数据为空");
    } else {
      const formattedStockData = stockData.map(stock => ({
        date: stock.date,
        price: Number(stock.price),
        volume: Number(stock.volume),
        turnover: Number(stock.turnover),
      }));
      renderChart(formattedStockData);
    }
  }
});

// 页面加载时初始化
onMounted(() => {
  if (!chartContainer.value) {
    console.error("Chart container is not initialized.");
  }

  // 在窗口大小改变时调整图表大小
  window.addEventListener("resize", () => {
    if (chart) {
      chart.resize();
    }
  });
});
</script>

<template>
  <el-row>
    <el-col :span="8">
      <p>History</p>
    </el-col>
    <el-col :span="16">
      <el-input
          v-model="input"
          placeholder="请填写股票代码"
          clearable
      />
    </el-col>
  </el-row>
  <div class="chart-container" ref="chartContainer" style="height: 400px; margin-top: 20px;" />
</template>

<style scoped>
p {
  margin: 5px;
  font-family: 'Georgia', serif;
  font-size: min(2vw, 20px);
  font-weight: bold;
  color: var(--color-text-primary);
}

.chart-container {
  padding: 20px;
  margin-top: 20px;
}
</style>