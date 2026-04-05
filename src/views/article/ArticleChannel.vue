<script setup>
import { ref } from 'vue'
import FormWork from '@/component/FormWork.vue'
import { artDel } from '@/api/index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useuserstore } from '@/stores/index'
const store = useuserstore()
const list = ref([])
const currentPage = ref(1)
const pageSize = ref(2)
const tes = ref('文章管理')
const text = ([
  {id:1, title:'草稿'},
  {id:2, title:'已发布'}
])
const dropbox = ref({
    cate_id: '',
    state: ''
})
const run = ref('')
const runs = ref('')
const yt = async (bool) => {
  store.removeloading(bool)
  const res = await artDel( store.currentPage, store.pageSize, store.dropbox.cate_id , store.dropbox.state )
  const processedData = res.data.map(item => {
  return {
    ...item, // 保留原有字段
    dateObj: (new Date(item.pub_date)).toLocaleDateString(zhCn) // 新增字段：Date 对象
  }
})
  list.value = processedData
  store.removeloading(false)
  run.value = Math.ceil(res.total/store.pageSize)
  runs.value = res.total
}
yt()
const handleSizeChange = (newsize) =>{
    pageSize.value = newsize
    store.page(newsize)
    yt()  
}
const handleCurrentChange = (newsize) =>{
    currentPage.value = newsize
      store.pages(newsize)
    yt()
}
const filist = ref([])
const hangbars = (tolist) =>{
      filist.value = tolist
}
store.dests()
const sumd = () =>{
  store.dest(dropbox.value)
  yt(true)
}
const reset = () =>{
    dropbox.value.cate_id = ''
    dropbox.value.state = ''
}
</script>

<template>
  <div>
       <FormWork :message="tes ? list : []" @meesage="hangbars" :getlist="yt">
        <template #header >
          <el-form
        ref="from"
        style="max-width: 830px"
        status-icon
        size="large"
        label-width="auto"
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
              <el-button type="primary" @click="sumd">
                搜索
              </el-button>
               <el-button type="primary" @click="reset">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div class="demo-pagination-block">
    <el-pagination
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
        <template #text>{{ tes }}</template>
        <template #tred><el-button type="primary" >发布文章</el-button></template>
       </FormWork>
  </div>
</template>

<style scoped>
.el-form{
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
.demo-pagination-block{
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>