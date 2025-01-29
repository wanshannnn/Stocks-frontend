<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {ElForm, ElMessage, ElMessageBox, type FormInstance} from 'element-plus';
import {getUserPageListAPI, addUserAPI, deleteUserAPI, updateUserAPI} from '@/api/user';
import type { UserInfo } from "@/types/user";
import type {AxiosResponse} from "axios";

const currentPage = ref(1);
const pageSize = ref(20);
const userList = ref<{ items: UserInfo[]; total: number } | null>(null);
const loading = ref(false);
const addUserDialogVisible = ref(false);
const updateUserDialogVisible = ref(false);
const userForm = ref<FormInstance | null>(null);
const currentUser = reactive<UserInfo>({
  id: 0,
  role: 'user',
  token: '',
  createTime: '',
  username: '',
  account: '',
  status: false,
})
const form = reactive({
  username: '',
  account: '',
  status: '',
});

// 校验规则
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,10}$/, message: "用户名必须是1-10个字符长度的数字或英文字母", trigger: "blur" },
  ],
  account: [
    { required: true, message: '账户不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,10}$/, message: "账户必须是1-10个字符长度的数字或英文字母", trigger: "blur" },
  ],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
};

// 获取用户分页数据
const fetchUsersByPage = async (page: number, size: number) => {
  loading.value = true;
  try {
    const res = await getUserPageListAPI({ page, size });
    if (res.data.code === 0) {
      userList.value = res.data.data;
    } else {
      ElMessage.error(res.data.message || '获取数据失败');
    }
  } catch (error) {
    ElMessage.error('请求失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 添加用户
const addUser = async () => {
  if (!userForm.value) {
    return;
  }
  userForm.value.validate(async (valid: boolean) => {
    if (!valid) {
      ElMessage.error('表单校验失败，请检查输入内容');
      return;
    }
    try {
      const response = await addUserAPI(form);
      if (response.data.code === 0) {
        ElMessage.success('用户添加成功');
        addUserDialogVisible.value = false;
        resetForm();
        fetchUsersByPage(currentPage.value, pageSize.value);
      } else {
        ElMessage.error(response.data.message || '添加用户失败');
      }
    } catch (error) {
      ElMessage.error('请求失败，请稍后重试');
    }
  });
};

// 编辑用户
const updateUser = async () => {
  if (!userForm.value || !currentUser) return;
  userForm.value.validate(async (valid: boolean) => {
    if (!valid) {
      ElMessage.error('表单校验失败，请检查输入内容');
      return;
    }
    try {
      const response = await updateUserAPI(currentUser);
      if (response.data.code === 0) {
        ElMessage.success('update success');
        updateUserDialogVisible.value = false;
        fetchUsersByPage(currentPage.value, pageSize.value);
      } else {
        ElMessage.error(response.data.message || 'update failed');
      }
    } catch (error) {
      ElMessage.error('请求失败，请稍后重试');
    }
  });
};

// 删除用户
const handleDeleteUser = async (id: number) => {
  try {
    await ElMessageBox.confirm('此操作将永久删除用户, 是否继续?', '提示', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning',
    });
    const res = await deleteUserAPI(id);
    if (res?.data.code === 0) {
      ElMessage.success('delete success');
      fetchUsersByPage(currentPage.value, pageSize.value);
    } else {
      ElMessage.error((res as AxiosResponse<{ message: string }>).data.message || 'delete failed');
    }
  } catch (error) {
    ElMessage.error((error as { message: string }).message || '请求失败，请稍后重试');
  }
};

// 重置表单
const resetForm = () => {
  form.username = '';
  form.account = '';
  form.status = '';
  Object.assign(currentUser, {
    id: 0,
    role: 'user',
    token: '',
    createTime: '',
    username: '',
    account: '',
    status: false,
  });
};

// 取消表单
const cancelForm = () => {
  ElMessage.info('Operation Cancelled');
  addUserDialogVisible.value = false;
  updateUserDialogVisible.value = false;
};

// 打开编辑对话框
const openEditDialog = (row: UserInfo) => {
  Object.assign(currentUser, row); // 将选中行数据赋值到 currentUser
  updateUserDialogVisible.value = true;
};

// 分页更新
const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchUsersByPage(page, pageSize.value);
};

onMounted(() => {
  fetchUsersByPage(currentPage.value, pageSize.value);
});
</script>


<template>
  <div class="user-manage-container">
    <!-- 添加用户 -->
    <el-button type="primary" @click="addUserDialogVisible = true">Add User</el-button>
    <!-- 添加用户对话框 -->
    <el-dialog v-model="addUserDialogVisible" title="Add User" width="500">
      <el-form :model="form" :rules="rules" ref="userForm" label-width="100px">
        <el-form-item prop="username" label="Username" :label-width="80">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="account" label="Account" :label-width="80">
          <el-input v-model="form.account" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="status" label="Status" :label-width="80">
          <el-select v-model="form.status" placeholder="Please select status">
            <el-option label="Activate" :value="true"></el-option>
            <el-option label="Inactivate" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelForm" class="cancel-button">Cancel</el-button>
          <el-button type="primary" @click="addUser">Confirm</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分页展示用户信息 -->
    <el-table class="user-table" :data="userList?.items || []" style="width: 100%">
      <el-table-column label="Id" prop="id"></el-table-column>
      <el-table-column label="Username" prop="username"></el-table-column>
      <el-table-column label="Account" prop="account"></el-table-column>
      <el-table-column label="Status" prop="status">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'">{{ row.status ? 'Active' : 'Inactive' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Manage">
        <template #default="{ row }">
          <el-button @click="openEditDialog(row)" type="primary" size="small">Edit</el-button>
          <el-button @click="handleDeleteUser(row.id)" type="danger" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑用户信息 -->
    <el-dialog v-model="updateUserDialogVisible" title="Edit User Information" width="500px">
      <el-form :model="currentUser" :rules="rules" ref="userForm" label-width="100px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="currentUser.username" />
        </el-form-item>
        <el-form-item label="Account" prop="account">
          <el-input v-model="currentUser.account" />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="currentUser.status">
            <el-option label="Active" :value="true"></el-option>
            <el-option label="Inactive" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelForm" class="cancel-button">Cancel</el-button>
        <el-button type="primary" @click="updateUser">Confirm</el-button>
      </template>
    </el-dialog>

    <!-- 分页组件 -->
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
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 20px;
  margin: 20px;
}

.user-table {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>