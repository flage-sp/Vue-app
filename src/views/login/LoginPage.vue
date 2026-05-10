<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import { register, login } from '@/api/index'
import { useuserstore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { huqu } from '@/api/index'
import lottie from 'lottie-web'
import jsonData from '@/assets/huakuai.json'
import tushu from '@/assets/tushu.json'
import { debounce } from '@/hooks/utils'

const refinput = ref(null)
const router = useRouter()
const froms = ref('')
const lottieBox = ref(null)
const tubiaosa = ref(null)
const loadings = ref(false)
onMounted(() => {
  lottieBox.value = lottie.loadAnimation({
    container: lottieBox.value,
    animationData: jsonData,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  })
  lottieBox.value = lottie.loadAnimation({
    container: tubiaosa.value,
    animationData: tushu,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  })
  refinput.value.focus()
})
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
const text = ref('去注册')
const refpassword = ref(null)

const mation = async () => {
  // 切换表单状态
  transformstion.value = !transformstion.value

  // 根据当前状态设置按钮文字
  if (transformstion.value) {
    // 切换到注册表单
    text.value = '去登录'
  } else {
    // 切换到登录表单
    text.value = '去注册'
  }

  // 清空表单数据
  formModel.value.username = ''
  formModel.value.password = ''
  formModel.value.repassword = ''

  // 等待过渡动画完成后设置焦点
  await new Promise((resolve) => setTimeout(resolve, 350))
  nextTick(() => {
    if (transformstion.value) {
      console.log(refpassword.value)
      if (refpassword.value) {
        refpassword.value.focus()
      }
    } else {
      console.log(refinput.value)
      if (refinput.value) {
        refinput.value.focus()
      }
    }
  })
}
const submit = async () => {
  if (!(formModel.value.password == formModel.value.repassword)) {
    ElMessage.success('密码不一致')
    return
  }
  loadings.value = true
  const res = await register(formModel.value)
  loadings.value = false
  if (res.code === 1) {
    ElMessage.success(res.message)
    return
  }
  if (res.code === 2) {
    ElMessage.success('格式不正确')
    return
  }
  froms.value
    .validate()
    .then(() => {
      transformstion.value = false
      if (transformstion.value === false) {
        loadings.value = false
      }
      formModel.value.username = ''
      formModel.value.password = ''
      formModel.value.repassword = ''
      ElMessage.success(res.message)
    })
    .catch(() => {
      ElMessage.success(res.message)
    })
}
const loginlist = debounce(() => login(formModel.value), 1000)
const loggin = async () => {
  if (formModel.value.username == '') {
    ElMessage.success('请输入用户名')
    return
  }
  if (formModel.value.password == '') {
    ElMessage.success('请输入密码')
    return
  }
  loading.value = true
  from.value
    .validate()
    .then(async () => {
      const res = await loginlist()
      console.log(res.token)
      userstore.settoken(res.token)
      userstore.setfrom(formModel.value)
      loading.value = false
      const ress = await huqu()
      console.log(ress)
      userstore.addres(ress.data)
      // 提示关闭后执行跳转（精准同步）
      // 提示关闭后的回调
      ElMessage.success('登录成功')
      setTimeout(() => {
        router.push('/ArticleManage')
      }, 1000)
    })
    .catch((res) => {
      if (res.response?.status === 401) {
        ElMessage.success('用户名或密码错误')
        return
      }
      loading.value = false
      ElMessage.success('请输入正确的格式')
    })
}
</script>

<template>
  <div class="login">
    <el-row>
      <el-col :span="12" class="bg">
        <div
          class="title"
          v-html="`<p>欢迎使用图书管理系统</p>`"
          style="transform: translateX(20px)"
        ></div>
        <div class="tubiaosa">
          <div ref="tubiaosa" class="svg-box"></div>
        </div>
      </el-col>
      <el-col :span="3"></el-col>
      <el-col :span="6">
        <div class="lottie-box" ref="lottieBox"></div>
        <transition name="form-fade" mode="out-in">
          <el-form
            ref="froms"
            style="max-width: 600px"
            :model="formModel"
            status-icon
            size="large"
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
            :loading="loading"
            v-if="transformstion"
          >
            <el-form-item>
              <h1>注册</h1>
              <div class="iconfonts">
                <el-icon><img src="@/assets/tab_mine_4.svg" alt="加载中..." /></el-icon>
              </div>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input
                placeholder="请输入用户名"
                :prefix-icon="User"
                v-model="formModel.username"
                label-width="auto"
                ref="refpassword"
              >
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
                <el-button
                  type="primary"
                  size="large"
                  round
                  style="width: 400px"
                  @click="submit()"
                  :loading="loadings"
                >
                  注册
                </el-button>
              </div>
            </el-form-item>
            <el-form-item class="bb">
              <div class="ww" @click="mation(true)">
                <div class="ee">{{ text }}</div>
                <div class="iconfont">
                  <el-icon><img src="@/assets/jinru.svg" alt="加载中..." /></el-icon>
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
              <div class="iconfonts">
                <el-icon><img src="@/assets/tab_mine_4.svg" alt="加载中..." /></el-icon>
              </div>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input
                placeholder="请输入用户名"
                :prefix-icon="User"
                v-model="formModel.username"
                ref="refinput"
              >
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
                <el-button
                  type="primary"
                  size="large"
                  round
                  style="width: 400px"
                  @click="loggin()"
                  :loading="loading"
                >
                  登录
                </el-button>
              </div>
            </el-form-item>
            <el-form-item class="bb">
              <div class="ww" @click="mation(refusername)">
                <div class="ee">{{ text }}</div>
                <div class="iconfont">
                  <el-icon><img src="@/assets/jinru.svg" alt="加载中..." /></el-icon>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </transition>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.title {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100px;
  font-size: 32px;
  font-weight: bold;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.tubiaosa {
  width: 100%;
  height: 70%;
}
.svg-box {
  width: 100%;
  height: 100%;
}
.svg-box:hover {
  width: 120%;
  height: 120%;
  transform: translateX(-50px);
  transition: all 0.3s ease;
}
/* 过渡动画样式 */
.form-fade-enter-from,
.form-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 0.3s ease;
}

.form-fade-enter-to,
.form-fade-leave-from {
  opacity: 1;
}
.ww {
  font-size: 20px;
}
.el-icon {
  width: 100%;
  height: 100%;
  line-height: 40px;
}
.iconfont {
  .el-icon {
    img {
      width: 24px;
      height: 24px;
    }
  }
}
.iconfonts {
  height: 100%;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  .el-icon {
    font-size: 24px;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
.lottie-box {
  width: 100%;
  height: 30%;
  min-height: 200px;
}
.demo-ruleForm {
  width: 100%;
  height: 70%;
}
.webfont {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 100vw;
  height: 100vh;
}
.el-row {
  margin: 20px 20px 20px 20px;
  background-color: #f4f4f4;
  width: 97%;
  height: 95%;
  box-shadow:
    0 0 8px rgba(0, 0, 0, 0.15),
    0 0 12px rgba(0, 0, 0, 0.08);
}

.el-col-12 {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
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
  display: flex;
  align-content: center;
  cursor: pointer;
}
.el-form-item__content .kk {
  margin: 0 auto;
}
</style>
