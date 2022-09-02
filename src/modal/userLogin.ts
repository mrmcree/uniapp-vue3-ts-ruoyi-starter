import { LoginService } from '@/service/api/login'
import Modal from '@/plugins/Modal'
import { NAV_TO } from '@/utils'
import {useUserStore} from "@/store";
const UserStore=useUserStore()
export const loginForm = reactive({
  username: '',
  password: '',
  code: '',
  uuid: '',
})

export const codeUrl = ref('')
export const captchaEnabled = ref(false)

// 密码登录
export const pwdLogin = () => {
  UserStore.Login(loginForm)
}
// 获取图形验证码
export const getCode = async () => {
  const res = await LoginService.getCodeImg()
  codeUrl.value = `data:image/gif;base64,${res.img}`
  loginForm.uuid = res.uuid
}
// 登录方法
export const handleLogin = async () => {
  if (loginForm.username === '') {
    Modal.msgError('请输入您的账号')
  } else if (loginForm.password === '') {
    Modal.msgError('请输入您的密码')
  } else if (loginForm.code === '' && captchaEnabled.value) {
    Modal.msgError('请输入验证码')
  } else {
    Modal.loading('登录中，请耐心等待...')

    pwdLogin()
  }
}
// 隐私协议
export const handleUserAgreement = () => {
  NAV_TO({ url: '/pages/common/webview/index' })
}
// 用户协议
export const handlePrivacy = () => {
  NAV_TO({ url: '/pages/common/webview/index' })
}

