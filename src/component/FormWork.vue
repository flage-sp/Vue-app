<script setup>
import axios from 'axios'
import { Edit, Delete } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import {
  textacquisition,
  artDelChannelService,
  addarticle,
  huoqv,
  bianji,
  deletetext,
} from '@/api/index'
import ChanglEdit from '@/component/ChanglEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useuserstore } from '@/stores/index'
import { baseurl } from '@/utils/request'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useuserstore()
const text = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: '',
})
const rules = {
  title: [
    { required: true, message: '请输入正确的用户名', trigger: 'blur' },
    { min: 1, max: 6, message: '请输入1到6位的内容', trigger: 'blur' },
  ],
  cate_id: [{ required: true, message: '请输入正确的用户名', trigger: 'blur' }],
}
const conent = ref('')
const list = ref([])
const fromit = ref('')
const drawer2 = ref(false)
const loading = ref(false)
const emit = defineEmits(['meesage'])
const huolist = async () => {
  loading.value = true
  store.removeloading(true)
  const res = await textacquisition()
  list.value = res.data
  store.removeloading(false)
  emit('meesage', list.value)
  loading.value = false
}
onMounted(() => {
  huolist()
})
const arrcategory = (row) => {
  fromit.value.open(row)
}
const deleteCategory = async (row) => {
  await ElMessageBox.confirm('你确定要删除这条信息吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  huolist()
}
const slotContainer = ref('')
const addcategory = () => {
  if (slotContainer.value.querySelector('.el-button span').textContent.trim() == '发布文章') {
    conent.value = '发布文章'

    text.value = {
      title: '',
      cate_id: '',
      cover_img: '',
      state: '',
    }
    text.value.content = `<p></p>`
    imgUrl.value = ''
    drawer2.value = true
    return
  }
  fromit.value.open({})
}
const props = defineProps({
  message: {
    type: Array,
  },
  getlist: {
    type: Function,
  },
  loadings: {
    type: Boolean,
  },
  height: {
    type: Number,
  },
  top: {
    type: String,
  },
  divloading: {
    type: Boolean,
  },
})

const drawer = ref(false)
const direction = ref('rtl')
const handleClose = () => {
  drawer.value = false
}
// 上传器
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  text.value.cover_img = uploadFile.raw
}
const lodingg = () => {
  loading.value = !loading.value
}
defineExpose({
  lodingg,
})
async function imageUrlToFile(imageUrl, fileName) {
  try {
    // 1. 以blob形式请求图片
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'blob', // 关键：指定响应类型为blob
    })

    // 2. 提取文件名（若未传入，从URL截取）
    if (!fileName) {
      const urlParts = imageUrl.split('/')
      fileName = urlParts[urlParts.length - 1]
      // 若URL带参数，去除参数部分（如：image.png?width=100 → image.png）
      fileName = fileName.split('?')[0]
    }

    // 3. 获取图片MIME类型（从响应头或blob中提取）
    const mimeType = response.headers['content-type'] || response.data.type

    // 4. 将Blob转换为File对象
    const file = new File([response.data], fileName, { type: mimeType })

    return file
  } catch (error) {
    ElMessage.success('图片转换失败')
    throw error
  }
}

const data = ref('')
const arrcate = async (row) => {
  conent.value = '编辑文章'
  const res = await huoqv(row.id)
  drawer2.value = true
  data.value = res.data
  const ytto = baseurl + data.value.cover_img
  const mn = await imageUrlToFile(ytto, data.value.cover_img)
  imgUrl.value = URL.createObjectURL(mn)
  text.value = data.value
}
const firmClick = async (title) => {
  if (data.value) {
    const gtres = baseurl + data.value.cover_img
    const img = await imageUrlToFile(gtres, data.value.cover_img)
    data.value.cover_img = img
    data.value.state = title
    const jjb = new FormData()
    for (let key in data.value) {
      jjb.append(key, data.value[key])
    }
    await bianji(jjb)

    props.getlist(true)
    ElMessage.success('修改成功')

    drawer2.value = false
    return
  }
  text.value.state = title
  const ytr = new FormData()
  for (let key in text.value) {
    ytr.append(key, text.value[key])
  }
  await addarticle(ytr)
  ElMessage.success('添加成功')
  props.getlist(true)
  drawer2.value = false
}

const deleteCate = async (row) => {
  await deletetext(row.id)
  ElMessage.success('删除成功')
  props.getlist(true)
}
</script>

<template>
  <el-card
    style="max-width: 1372px; height: auto; min-height: 700px"
    :style="{ height: props.height ? '730px' : 'auto', 'margin-top': props.top }"
  >
    <template #header>
      <div class="card-header">
        <div>
          <span><slot name="text"></slot></span>
        </div>
        <div @click="addcategory()" ref="slotContainer"><slot name="tred"></slot></div>
      </div>
    </template>
    <slot name="header"></slot>
    <slot name="pos">
      <div class="text item">
        <div v-if="route.fullPath === '/ArticleChannel'" class="mainget">
          <el-table
            v-if="props.message.length > 0 || props.loadings"
            v-loading="props.loadings"
            :data="props.message"
            style="width: 100%"
            :row-style="{ height: '80px' }"
          >
            <el-table-column prop="title" label="文章标题" width="240" />
            <el-table-column prop="cate_name" label="分类" width="240" />
            <el-table-column prop="dateObj" label="发表时间" width="240" />
            <el-table-column prop="state" label="状态" width="240" />
            <el-table-column prop="address" label="操作" width="240">
              <template #default="{ row }">
                <div class="pass">
                  <el-button :icon="Edit" round @click="arrcate(row)" class="edit-btn"
                    >编辑</el-button
                  >
                  <el-button :icon="Delete" round @click="deleteCate(row)" class="delete-btn"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="mainitem"
            v-if="!props.loadings && props.message.length === 0"
            v-loading="props.divloading"
          >
            <img src="../assets/crying_face_color.svg" alt="加载中..." />
            <div class="text">当前没有文章,请去添加文章吧</div>
          </div>
        </div>
        <el-table
          v-else
          v-loading="store.loading"
          :data="list"
          style="width: 100%"
          :row-style="{ height: '80px' }"
        >
          <el-table-column prop="id" label="序号" width="300" />
          <el-table-column prop="cate_name" label="分列名称" width="300" />
          <el-table-column prop="cate_alias" label="分类别名" width="300" />
          <el-table-column prop="address" label="操作" width="300">
            <template #default="{ row, $index }">
              <div class="pass">
                <el-button :icon="Edit" round @click="arrcategory(row, $index)" class="edit-btn"
                  >编辑</el-button
                >
                <el-button :icon="Delete" round @click="deleteCategory(row)" class="delete-btn"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <ChanglEdit ref="fromit" :parent="huolist"></ChanglEdit>
      <slot name="footer"></slot>
    </slot>
  </el-card>
  <el-drawer
    v-model="drawer"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
  >
  </el-drawer>
  <el-drawer v-model="drawer2" :direction="direction" size="50%">
    <template #header>
      <h4>{{ conent }}</h4>
    </template>
    <template #default>
      <el-form :model="text" :rules="rules" label-width="100px">
        <el-form-item label="文章标题" prop="title">
          <el-input placeholder="请输入文章标题" v-model="text.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="text.cate_id" placeholder="请选择" style="width: 794.33px">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择图片">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onSelectFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="输入内容" style="height: 300px">
          <div class="editor">
            <quill-editor theme="snow" v-model:content="text.content" contentType="html">
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="firmClick('草稿')">草稿</el-button>
          <el-button type="primary" @click="firmClick('已发布')">发布</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>
<style scoped lang="scss">
.common-layout {
  margin-top: 40px;
}
.mainget {
  width: 100%;
  height: 100%;
  .mainitem {
    margin-top: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  img {
    width: 200px;
    height: 200px;
  }
  .text {
    text-align: center;
    font-size: 30px;
    color: #8c939d;
  }
}
.text {
  margin-top: 30px;
  width: 100%;
}
.pass {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 15px;
}
.edit-btn:hover {
  width: 50%;
  height: 100%;
  transition: all 0.3s ease;
}
.delete-btn:hover {
  width: 50%;
  height: 100%;
  transition: all 0.3s ease;
}
.delete-btn {
  width: 40%;
  height: 100%;
}
.edit-btn {
  width: 40%;
  height: 100%;
}
.pass {
  display: flex;
  align-content: center;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
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
  width: 250px;
  height: 250px;
  text-align: center;
}
.editor {
  height: 200px;
}
</style>
