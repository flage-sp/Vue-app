<script setup>
import { ref } from 'vue'
import { DArrowRight, Lock, User } from '@element-plus/icons-vue'
import { register, login } from '@/api/index'
import { useuserstore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { huqu } from '@/api/index'

const userstore = useuserstore()
const loading = ref(false)
const formModel = ref({
  username: '',
  password: '',
  repassword: '',
})
const from = ref()
const rules = {
  username: [
    { required: true, message: '请输入正确的用户名', trigger: 'blur' },
    { min: 1, max: 6, message: '用户名格式必须是1到6位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入正确的密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,9}$/, message: '请输入6到9位的字母数字密码', trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '请输入正确的密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,9}$/, message: '请输入6到9位的字母数字密码', trigger: 'blur' },
  ],
}
const transformstion = ref(false)
const text = ref('注册')
const mation = (textd) => {
  transformstion.value = !transformstion.value
  text.value = textd
  formModel.value.username = ''
  formModel.value.password = ''
  formModel.value.repassword = ''
}
const submit = async () => {
  if (!(formModel.value.password == formModel.value.repassword)) {
    ElMessage.success('密码不一致')
    return
  }
  await from.value.validate()
  const res = await register(formModel.value)
  if (res.code === 2) {
    ElMessage.success('格式不正确')
    return
  }
  console.log(res)
  ElMessage.success(res.message)
  if (res.code == 0) {
    loading.value = true
    transformstion.value = false
    if (transformstion.value === false) {
      loading.value = false
    }
    formModel.value.username = ''
    formModel.value.password = ''
    formModel.value.repassword = ''
  }
}
const router = useRouter()
const loggin = async () => {
  loading.value = true
  await from.value.validate()
  const res = await login(formModel.value)
  userstore.settoken(res.token)
  userstore.setfrom(formModel.value)
  loading.value = false
  const ress = await huqu()
  userstore.addres(ress.data)
  console.log(ress.data)
  // 提示关闭后执行跳转（精准同步）
  ElMessage.success({
    message: res.message,
    duration: 1000, // 可自定义显示时长（默认 3000ms）
    onClose: () => {
      // 提示关闭后的回调
      router.push('/ArticleManage')
    },
  })
}
</script>
<template>
  <div>
    <el-row>
      <el-col :span="12" class="bg"></el-col>
      <el-col :span="3"></el-col>
      <el-col :span="6" v-loading="loading">
        <el-form
          ref="from"
          style="max-width: 600px"
          :model="formModel"
          status-icon
          size="large"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          v-if="transformstion"
        >
          <el-form-item>
            <h1>{{ text }}</h1>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="formModel.username">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入账号" :prefix-icon="Lock" v-model="formModel.password">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="repassword">
            <el-input
              placeholder="请再次输入密码"
              :prefix-icon="Lock"
              v-model="formModel.repassword"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="ty">
            <div class="qq">
              <el-checkbox value="Online activities" name="type"> 记住我 </el-checkbox>
              <div class="er">忘记密码</div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="kk">
              <el-button type="primary" size="large" round style="width: 400px" @click="submit()">
                注册
              </el-button>
            </div>
          </el-form-item>
          <el-form-item class="bb">
            <div class="ww" @click="mation('注册')">
              <div class="ee">去登录</div>
              <div>
                <el-icon size="15px"><DArrowRight /></el-icon>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-form
          ref="from"
          style="max-width: 600px"
          :model="formModel"
          status-icon
          size="large"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          v-else
        >
          <el-form-item>
            <h1>登录</h1>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="formModel.username">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" :prefix-icon="Lock" v-model="formModel.password">
            </el-input>
          </el-form-item>
          <el-form-item class="ty">
            <div class="qq">
              <el-checkbox value="Online activities" name="type"> 记住我 </el-checkbox>
              <div class="er">忘记密码</div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="kk">
              <el-button type="primary" size="large" round style="width: 400px" @click="loggin()">
                登录
              </el-button>
            </div>
          </el-form-item>
          <el-form-item class="bb">
            <div class="ww" @click="mation('注册')">
              <div class="ee">去{{ text }}</div>
              <div>
                <el-icon size="15px"><DArrowRight /></el-icon>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>

<style scoped>
.bg {
  background:
    url(@/assets/logo2-614f2fe8.png) no-repeat 60% center/240px auto,
    url(@/assets/login_bg-963efa51.jpg) no-repeat center/cover;
  border-radius: 0 5px 5px 0;
}
.el-row .bg {
  height: 96vh;
}
.el-col-6 {
  align-content: center;
}
.er {
  color: blueviolet;
  cursor: pointer;
}
.qq {
  display: flex !important;
  width: 531.04px;
  justify-content: space-between; /* 两端对齐（左右分开） */
  align-items: center; /* 垂直居中对齐 */
  width: 100%; /* 确保占满父容器宽度，否则可能无法完全分开 */
}
.ww {
  width: 522.253px;
  height: 72.813px;
  display: flex;
  align-content: center;
  cursor: pointer;
}
.el-form-item__content .kk {
  margin: 0 auto;
}
</style>
