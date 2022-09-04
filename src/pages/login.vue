<script setup lang="ts">
import uniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue'
import { captchaEnabled, codeUrl, getCode, handleLogin, handlePrivacy, handleUserAgreement, loginForm } from '@/modal/useLogin'
import { LoginService } from '@/service/api/login'

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
        <button class="login-btn cu-btn block bg-blue lg round" @click="handleLogin">
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
    margin: 20px auto;
    margin-top: 15%;
    width: 80%;

    .input-item {
      margin: 20px auto;
      background-color: #f5f6f7;
      height: 45px;
      border-radius: 20px;

      .icon {
        font-size: 38 rpx;
        margin-left: 10px;
        color: #999;
      }

      .input {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
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

