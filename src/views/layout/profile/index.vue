<script setup lang="ts">
import { ref } from 'vue';

// 用户信息
const user = ref({
  name: "Alice",
  bio: "Stock enthusiast. Investor. Love learning new trends.",
  followerCount: 250,
  followingCount: 180,
  passageCount: 4,
});

// 动态数据
const activities = ref([
  { timestamp: "2025-01-15 10:00", message: "Collected a new stock: Apple Inc. (AAPL)" },
  { timestamp: "2025-01-14 14:30", message: "Yesterday's profit: +$200" },
  { timestamp: "2025-01-13 09:20", message: "Shared stock analysis with 5 friends." },
  { timestamp: "2025-01-12 16:45", message: "Joined a stock discussion group: Growth Stocks." },
]);
</script>

<template>
  <el-row class="profile-container">
    <!-- 左侧个人信息 -->
    <el-col :xs="24" :sm="24" :md="10" class="personal-info">
      <!-- 用户头像和简介 -->
      <el-card shadow="never" class="user-info-card">
        <el-row>
          <el-col :span="8">
            <el-avatar class="user-avatar" size="large">U</el-avatar>
          </el-col>
          <el-col :span="16">
            <p class="profile-title">{{ user.name }}</p>
            <p class="profile-text">{{ user.bio }}</p>
          </el-col>
        </el-row>
        <!-- Follower 和 Following -->
        <el-card shadow="never" class="follow-info-card">
          <el-row justify="space-between" align="middle">
            <el-col :xs="12" :span="8" class="stat">
              <p class="profile-text">Follower</p>
              <p>{{ user.followerCount }}</p>
            </el-col>
            <el-col :xs="12" :span="8" class="stat">
              <p class="profile-text">Following</p>
              <p>{{ user.followingCount }}</p>
            </el-col>
            <el-col :xs="0" :span="8" class="stat">
              <p class="profile-text">Passage</p>
              <p>{{ user.passageCount }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-card>
    </el-col>

    <!-- 右侧个人动态 -->
    <el-col :xs="24" :sm="24" :md="12" class="personal-news">
      <el-card shadow="never" class="news-card">
        <p class="profile-title">Personal Activity</p>
        <el-timeline>
          <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              placement="bottom">
            <p class="profile-text">{{ activity.message }}</p>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.profile-container {
  margin: 20px;
  display: flex;
  gap: 20px;
}
@media(max-width: 768px) {
  .profile-container {
    margin: 5px;
  }
}

.personal-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.personal-news {
  display: flex;
  flex-direction: column;
}


.user-info-card {
  padding: 20px;
}
@media(max-width: 768px) {
  .user-info-card {
    padding: 5px;
  }
}

.news-card {
  padding: 20px;
  height: 100%;
}
@media(max-width: 768px) {
  .news-card {
    padding: 5px;
  }
}

.user-avatar {
  margin: 10px;
}

.stat {
  text-align: center;
}

.profile-title {
  margin: 10px;
  font-family: 'Georgia', serif;
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text-primary);
}
</style>