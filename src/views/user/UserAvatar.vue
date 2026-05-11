<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { touxiang } from '@/api/index'
import FormWork from '@/component/FormWork.vue'
import { huqu } from '@/api/index'
import { useuserstore } from '@/stores/index'
import { ElMessage } from 'element-plus'

const userstore = useuserstore()
const imgUrl = ref('')
const onSelectFile = async (uploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = async () => {
    const base64 = reader.result
    await touxiang(base64)
  }
  const img = URL.createObjectURL(uploadFile.raw)
  imgUrl.value = img
}
const poss = async () => {
  try {
    if (imgUrl.value === '') {
      ElMessage.success('请选择图片')
      return
    }
    const ress = await huqu()
    userstore.addres(ress.data)
    ElMessage.success('上传成功')
    imgUrl.value = ''
  } catch (error) {
    ElMessage.error(error.message)
  }
}
const updata = ref('')
const disster = () => {
  updata.value.$el.querySelector('input[type="file"]').click()
}
const height = ref(1)
</script>

<template>
  <div>
    <FormWork :message="[]" :getlist="() => {}" :height="height">
      <template #pos>
        <div>
          <el-form label-width="auto || 100px">
            <el-form-item label="选择图片">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="onSelectFile"
                ref="updata"
              >
                <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label-width="67px" class="btn-group">
              <el-button type="primary" @click="disster" class="select-btn">选择头像</el-button>
              <el-button type="info" @click="poss" class="upload-btn">上传头像</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </FormWork>
  </div>
</template>

<style scoped>
.btn-group {
  margin-top: 40px;
}
.upload-btn {
  margin-left: 30px;
}
.avatar-uploader .avatar {
  width: 300px;
  height: 300px;
  display: block;
}
.avatar-uploader :deep(.el-upload) {
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  text-align: center;
}
</style>
