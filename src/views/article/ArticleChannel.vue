<script setup>
import { ref, onMounted } from 'vue'
import FormWork from '@/component/FormWork.vue'
import { artDel } from '@/api/index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useuserstore } from '@/stores/index'
import { useRoute } from 'vue-router'
import { debounce } from '@/hooks/utils'
import { ElMessage } from 'element-plus'

const route = useRoute()
const store = useuserstore()
const loadings = ref(false)
const list = ref([])
const currentPage = ref(1)
const pageSize = ref(2)
const divloading = ref(false)
const text = [
  { id: 1, title: '草稿' },
  { id: 2, title: '已发布' },
]
const dropbox = ref({
  cate_id: '',
  state: '',
})
const run = ref('')
const runs = ref(0)
const yt = async (bool) => {
  if (bool === 1) {
    divloading.value = true
  } else {
    loadings.value = true
  }
  store.removeloading(bool)
  const res = await artDel(
    store.currentPage,
    store.pageSize,
    store.dropbox.cate_id,
    store.dropbox.state,
  )
  console.log(dropbox.value, res)
  const processedData = res.data.map((item) => {
    return {
      ...item, // 保留原有字段
      dateObj: new Date(item.pub_date).toLocaleDateString(zhCn), // 新增字段：Date 对象
    }
  })

  list.value = processedData
  store.removeloading(false)
  run.value = Math.ceil(res.total / store.pageSize)
  runs.value = res.total
  if (bool === 1) {
    divloading.value = false
  } else {
    loadings.value = false
  }
}
onMounted(() => {
  yt()
})

const handleSizeChange = async (newsize) => {
  loadings.value = true
  pageSize.value = newsize
  store.page(newsize)
  await yt()
  loadings.value = false
}
const handleCurrentChange = async (newsize) => {
  loadings.value = true
  currentPage.value = newsize
  store.pages(newsize)
  await yt()
  loadings.value = false
}
const filist = ref([])
const hangbars = (tolist) => {
  filist.value = tolist
}
store.dests()
const returns = debounce(yt, 500)
const sumd = async () => {
  if (dropbox.value.cate_id === '') {
    ElMessage.success('请选择文章分类')
    return
  }
  if (dropbox.value.state === '') {
    ElMessage.success('请选择发布状态')
    return
  }
  store.dest(dropbox.value)
  await returns(yt)
}
const reset = async () => {
  dropbox.value.cate_id = ''
  dropbox.value.state = ''
  divloading.value = true
  yt(1)
}
const height = ref(1)
</script>

<template>
  <div>
    <FormWork
      :message="route.fullPath === '/ArticleChannel' ? list : []"
      @meesage="hangbars"
      :getlist="yt"
      :loadings="loadings"
      :height="height"
      :top="'0px'"
      :divloading="divloading"
    >
      <template #header>
        <el-form
          ref="from"
          style="max-width: 830px"
          status-icon
          size="large"
          label-width="auto || 120px"
        >
          <el-form-item label="文章分类:">
            <el-select v-model="dropbox.cate_id" placeholder="请选择" style="width: 240px">
              <el-option
                v-for="item in filist"
                :key="item.id"
                :label="item.cate_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态:">
            <el-select v-model="dropbox.state" placeholder="请选择" style="width: 240px">
              <el-option
                v-for="item in text"
                :key="item.id"
                :label="item.title"
                :value="item.title"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="pl">
            <el-button type="primary" @click="sumd"> 搜索 </el-button>
            <el-button type="primary" @click="reset"> 重置 </el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div class="demo-pagination-block">
          <el-pagination
            v-if="list.length > 0"
            v-model:current-page="store.currentPage"
            v-model:page-size="store.pageSize"
            :page-sizes="[2, 3, 5]"
            layout="jumper, total, sizes, prev, pager, next, "
            :total="runs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
      <template #text>{{ store.files.username }}</template>
      <template #tred><el-button type="primary">发布文章</el-button></template>
    </FormWork>
  </div>
</template>

<style scoped>
.el-form {
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 60px;
}
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.demo-pagination-block {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>
