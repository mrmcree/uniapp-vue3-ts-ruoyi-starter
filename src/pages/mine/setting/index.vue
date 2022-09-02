<script setup lang="ts">
import {Modal} from "@/plugins/Modal";
import {useUserStore} from "@/store";
import {Navigate} from "@/utils";
import Storage from "@/utils/Storage";
const UserStore =useUserStore()
const windowHeight=ref(0)
onShow(()=>{
  windowHeight.value=uni.getSystemInfoSync().windowHeight
})
const handleToPwd=()=>{
  Navigate.to('/pages/mine/pwd/index')
}
const handleToUpgrade=()=>{

}
const handleCleanTmp=()=>{
  Storage.clear()
}
const handleLogout=()=>{
  console.log('dd')
  Modal.confirm('确定注销并退出系统吗').then((res)=>{
    if(!res) return
    UserStore.LogOut().then(()=>{
      Navigate.reLaunch('/pages/index')
    })
  })
}
</script>
<template>
  <view class="setting-container" :style="{height: `${windowHeight}px`}">
    <uni-list class="m-4 rounded-2xl">

      <uni-list-item :show-extra-icon="true" showArrow clickable  title="修改密码" @click="handleToPwd" />
      <uni-list-item :show-extra-icon="true" showArrow  clickable title="检查更新"  @click="handleToUpgrade"/>
      <uni-list-item :show-extra-icon="true" showArrow  clickable title="清理缓存"  @click="handleCleanTmp"/>
      <uni-list-item :show-extra-icon="true" showArrow clickable  title="退出登录"   @click="handleLogout"/>
    </uni-list>

  </view>
</template>
