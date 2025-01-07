<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElTable, ElButton, ElPagination, ElDialog, ElForm, ElInput, ElSelect, ElOption, ElMessage } from 'element-plus';
import {getUserPageListAPI, addUserAPI, updateUserAPI, deleteUserAPI} from '@/api/user';
import type { UserInfo } from "@/types/user";

const currentPage = ref(1);
const pageSize = ref(20);
const userList = ref<{ items: UserInfo[]; total: number } | null>(null);
const loading = ref(true);
const showDialog = ref(false);
const currentUser = ref<any>(null);


const fetchUsersByPage = async (page: number, size: number) => {
  loading.value = true;
  try {
    let res;
    res = await getUserPageListAPI({
      page: page,
      size: size
    });
    if (res.data.code === 0) {
      userList.value = res.data.data;
    } else {
      ElMessage.error('获取数据失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  } finally {
    loading.value = false;
  }
};


const openDialog = (user: any = null) => {
  currentUser.value = user ? { ...user } : { username: '', account: '', status: true };
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
};

const handleAddUser = async () => {
  try {
    const res = await addUserAPI(currentUser.value);
    if (res.code === 0) {
      ElMessage.success('添加用户成功');
      fetchUsersByPage(currentPage.value, pageSize.value);
      closeDialog();
    } else {
      ElMessage.error('添加用户失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  }
};

const handleUpdateUser = async () => {
  try {
    const res = await updateUserAPI(currentUser.value);
    if (res.code === 0) {
      ElMessage.success('更新用户信息成功');
      fetchUsersByPage(currentPage.value, pageSize.value);
      closeDialog();
    } else {
      ElMessage.error('更新用户信息失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  }
};

const handleDeleteUser = async (id: number) => {
  try {
    const res = await deleteUserAPI(id);
    if (res.code === 0) {
      ElMessage.success('删除用户成功');
      fetchUsersByPage(currentPage.value, pageSize.value);
    } else {
      ElMessage.error('删除用户失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  }
};

onMounted(() => {
  fetchUsersByPage(currentPage.value, pageSize.value);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchUsersByPage(page, pageSize.value);
};
</script>

<template>
  <div class="user-manage-container">
    <el-button type="primary" @click="openDialog">添加用户</el-button>
    <el-table class="user-table" :data="userList?.items" style="width: 100%">
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="账户" prop="account"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'">{{ row.status ? '激活' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="openDialog(row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleDeleteUser(row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="userList && userList.total > 0"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="userList?.total"
      layout="total, prev, pager, next, jumper"
      @current-change="handlePageChange"
    />
  </div>
</template>

<style scoped>
.user-manage-container {
  padding: 20px;
}

.user-table {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>