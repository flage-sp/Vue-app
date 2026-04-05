<script setup>
import FormWork from '@/component/FormWork.vue'
import { ref } from 'vue'
import { useuserstore } from '@/stores/index'
import { gengxin } from '@/api/index'
import { ElMessage } from 'element-plus'
const store = useuserstore()
const formModel = ref({
  username: store.files.username,
  id: store.files.id,
  nickname: '',
  email: '',
})
const rules = {
  old_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,9}$/, message: '请输入1到9位字母数字密码', trigger: 'blur' },
  ],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,18}$/, message: '请输入1到18位字母数字密码', trigger: 'blur' },
  ],
}
const counter = async () => {
  const res = await gengxin(formModel.value)
  console.log(res)
  console.log(formModel.value)
  if (res.code == 2) {
    ElMessage.success('邮箱输入错误')
    return
  }
  ElMessage.success(res.message)
  formModel.value.nickname = ''
  formModel.value.email = ''
}
</script>

<template>
  <div>
    <FormWork>
      <template #pos>
        <div>
          <el-form
            ref="froms"
            style="max-width: 600px"
            :model="formModel"
            status-icon
            size="large"
            :rules="rules"
            label-width="100"
          >
            <el-form-item label="登录名称">
              <el-input v-model="formModel.old_pwd" disabled> </el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
              <el-input v-model="formModel.nickname"> </el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="formModel.email"> </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="counter">提交修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </FormWork>
  </div>
</template>

<style scoped></style>
