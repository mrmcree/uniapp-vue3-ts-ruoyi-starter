<script setup lang="ts">
import { LoginService } from '@/service/api/login'
import {Modal} from '@/plugins/Modal'
import { Navigate} from '@/utils'
import {useUserStore} from '@/store';
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
export const pwdLogin = async () => {
  await UserStore.Login(loginForm).catch(err=>{
    console.log(err)
  })
  Navigate.reLaunch('/pages/index')
}
// 获取图形验证码
export const getCode = async () => {
  const res = await LoginService.getCodeImg()
  codeUrl.value = `data:image/gif;base64,${res.data.img}`
  loginForm.uuid = res.data.uuid
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
  Navigate.to('/pages/common/webview/index' )
}
// 用户协议
export const handlePrivacy = () => {
  Navigate.to( '/pages/common/webview/index' )
}



onLoad(async () => {
  getCode()
})

// UserService.getTask('/api/user/list')?.abort()
</script>

<template>
  <view class="normal-login-container">
    <view class="logo-content align-center justify-center flex">
      <!-- <image style="width: 100rpx;height: 100rpx;" :src="globalConfig.appInfo.logo" mode="widthFix">
            </image> -->
      <text class="title">
        若依移动端登录
      </text>
    </view>
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-user icon" />
        <input v-model="loginForm.username" class="input" type="text" placeholder="请输入账号" maxlength="30">
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-password icon" />
        <input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20">
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-code icon" />
        <input v-model="loginForm.code" type="number" class="input" placeholder="请输入验证码" maxlength="4">
        <image :src="codeUrl" class="login-code-img" @click="getCode" />
      </view>
      <view class="action-btn">
        <button class="login-btn text-white bg-blue " @click="handleLogin">
          登录
        </button>
      </view>
    </view>

    <view class="xieyi text-center">
      <text class="text-grey1">
        登录即代表同意
      </text>
      <text class="text-blue" @click="handleUserAgreement">
        《用户协议》
      </text>
      <text class="text-blue" @click="handlePrivacy">
        《隐私协议》
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
page {
  background-color: #ffffff;
}

.normal-login-container {
  width: 100%;

  .logo-content {
    width: 100%;
    font-size: 21px;
    text-align: center;
    padding-top: 15%;

    image {
      border-radius: 4px;
    }

    .title {
      margin-left: 10px;
    }
  }

  .login-form-content {
    text-align: center;
    margin: 15% auto 20px;
    width: 80%;

    .input-item {
      margin: 20px auto;
      background-color: #f5f6f7;
      height: 45px;
      line-height: 45px;
      border-radius: 20px;

      .icon {
        font-size: 38 rpx;
        margin-left: 10px;
        color: #999;
      }

      .input {
        width: 100%;
        height: 100%;
        font-size: 14px;
        line-height: 45px;
        text-align: left;
        padding-left: 15px;
      }

    }

    .login-btn {
      margin-top: 40px;
      height: 45px;
    }

    .xieyi {
      color: #333;
      margin-top: 20px;
    }
  }

  .easyinput {
    width: 100%;
  }
}

.login-code-img {
  height: 45px;
}
</style>

