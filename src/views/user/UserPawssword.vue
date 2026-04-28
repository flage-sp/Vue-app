<script setup>
import { ref } from 'vue'
import { useuserstore } from '@/stores/index'
import { modify } from '@/api/index'
import { ElMessage } from 'element-plus'
import FormWork from '@/component/FormWork.vue'
const store = useuserstore()
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})
const rules = {
  old_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,9}$/, message: '请输入1到9位字母数字密码', trigger: 'blur' },
  ],
  new_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,9}$/, message: '请输入1到9位字母数字密码', trigger: 'blur' },
  ],
  re_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,9}$/, message: '请输入1到9位字母数字密码', trigger: 'blur' },
  ],
}
const froms = ref('')
const modifys = async () => {
  if (!(formModel.value.new_pwd === formModel.value.re_pwd)) {
    return ElMessage.success('再次输入密码与修改密码不一致')
  }
  await froms.value.validate()
  store.adduserprofile(formModel.value)
  const rse = await modify(formModel.value)
  ElMessage.success(rse.message)
  formModel.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: '',
  }
}
const reset = () => {
  formModel.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: '',
  }
}
</script>

<template>
  <div>
    <FormWork :message="[]" :getlist="() => {}">
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
            <el-form-item label="原密码" prop="old_pwd">
              <el-input v-model="formModel.old_pwd"> </el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd">
              <el-input v-model="formModel.new_pwd"> </el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="re_pwd">
              <el-input v-model="formModel.re_pwd"> </el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="large" type="primary" @click="modifys">确认修改</el-button>
              <el-button size="large" type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </FormWork>
  </div>
</template>

<style scoped></style>
