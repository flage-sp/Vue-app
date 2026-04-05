<script setup>
import { edies, addedies} from '@/api/index'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const forminput = ref({
    id: "",
    cate_name: "",
    cate_alias: ""
})
const rulestt = {
  cate_name: [
    {required:true, message:'不能为空', trigger:'blur'},
    {min:1, max:6, message:'用户名格式必须是1到6位', trigger:'blur'}
  ],
  cate_alias: [
    {required:true, message:'不能为空', trigger:'blur'},
    {min:1, max:6, message:'用户名格式必须是1到6位', trigger:'blur'}
  ]
}
const form = ref()
const roww = ref()
const open = async (row) => {
    dialogVisible.value = true 
    if (row.id) {
    forminput.value = { ...row }
    }else{
    forminput.value = { id: "",cate_name: "",cate_alias: ""}
    }
    roww.value = row
}
const props = defineProps(['parent'])
const Edie = async ()=>{
    if(roww.value.id){
        form.value.validate()
        const res = await edies(forminput.value)
        console.log(res)
        console.log(forminput.value)
        ElMessage.success('修改成功')
        props.parent()
        dialogVisible.value = false
    }else{
        const res = await addedies(forminput.value)
        ElMessage.success('添加成功')
        props.parent()
        dialogVisible.value = false
        console.log(res)
    }
    
}
defineExpose({
    open,
})
</script>


<template>
    <el-dialog
    v-model="dialogVisible"
    :title=" forminput.id ? ' 编辑表单 ':' 添加表单 '"
    width="500"
  >
        <el-form
        ref="form"
        style="max-width: 400px"
        :model="forminput"
        status-icon
        size="large"
        :rules="rulestt"
        label-width="auto"
        class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="cate_name">
             <el-input v-model="forminput.cate_name"></el-input>
          </el-form-item>
           <el-form-item label="分类别名" prop="cate_alias">
             <el-input v-model="forminput.cate_alias"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Edie()">确定</el-button>
        </div>
        </template>
      
  </el-dialog>
</template>


<style>

</style>