<script setup lang="ts">
import {Navigate} from "@/utils";

const windowHeight=ref(0)
const avatar=ref(true)
const name=ref('123')
const handleToAvatar=()=>{

}

const handleToLogin=()=>{

}
const handleToInfo=()=>{
  Navigate.to('/pages/mine/info/index')
}

</script>
<template>
  <view class="mine-container" :style="{height: `${windowHeight}px`}">
    <!--顶部个人信息栏-->
    <view class="header-section">
      <view class="flex  justify-between">
        <view class="flex items-center">
          <view v-if="!avatar" class="cu-avatar  rounded-1/2 bg-white ">
            <view class="iconfont icon-people text-gray icon"></view>
          </view>
          <image v-if="avatar" @click="handleToAvatar" src="/static/images/profile.jpg" class="cu-avatar !w-100rpx !h-100rpx  rounded-1/2" mode="widthFix">
          </image>
          <view v-if="!name" @click="handleToLogin" class="login-tip">
            点击登录
          </view>
          <view v-if="name" @click="handleToInfo" class="user-info">
            <view class="u_title">
              用户名：{{ name }}
            </view>
          </view>
        </view>
        <view @click="handleToInfo" class="flex items-center">
          <text>个人信息</text>
          <view class="iconfont icon-right"></view>
        </view>
      </view>
    </view>

    <view class="content-section">
      <view class="mine-actions grid grid-cols-4 text-center">
        <view class="action-item" >
          <view class="icon"></view>
          <text class="text">交流群</text>
        </view>
        <view class="action-item" >
          <view class="icon"></view>
          <text class="text">在线客服</text>
        </view>
        <view class="action-item" >
          <view class="icon"></view>
          <text class="text">反馈社区</text>
        </view>
        <view class="action-item" >
          <view class="icon"></view>
          <text class="text">点赞我们</text>
        </view>
      </view>

        <uni-list class="m-4 rounded-2xl">
          <navigator url="/pages/mine/info/edit" >
            <uni-list-item :show-extra-icon="true" showArrow  title="编辑资料" />
          </navigator>
          <uni-list-item :show-extra-icon="true" showArrow  title="常见问题" />
          <uni-list-item :show-extra-icon="true" showArrow  title="关于我们" />
          <navigator url="/pages/mine/setting/index" >
          <uni-list-item :show-extra-icon="true" showArrow  title="应用设置" />
          </navigator>
        </uni-list>


    </view>
  </view>
</template>
<style scoped lang="scss">
page {
  background-color: #f5f6f7;
}

.mine-container {
  width: 100%;
  height: 100%;


  .header-section {
    padding: 15px 15px 45px 15px;
    background-color: #3c96f3;
    color: white;

    .login-tip {
      font-size: 18px;
      margin-left: 10px;
    }

    .cu-avatar {
      border: 2px solid #eaeaea;

      .icon {
        font-size: 40px;
      }
    }

    .user-info {
      margin-left: 15px;

      .u_title {
        font-size: 18px;
        line-height: 30px;
      }
    }
  }

  .content-section {
    position: relative;
    top: -50px;

    .mine-actions {
      margin: 15px 15px;
      padding: 20px 0px;
      border-radius: 8px;
      background-color: white;

      .action-item {
        .icon {
          font-size: 28px;
        }

        .text {
          display: block;
          font-size: 13px;
          margin: 8px 0px;
        }
      }
    }
  }
}
</style>

