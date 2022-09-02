<script setup lang="ts">
import {UserService} from "@/service/api/system/user";

let user = ref({
  nickName: '',
  phonenumber: '',
  email: '',
  createTime: ''
})
const postGroup = ref('')
const roleGroup = ref('')
const getUser = async () => {

  const res:any = await UserService.getUserProfile()
  user.value=res.data.data
  roleGroup.value = res.data.roleGroup
  postGroup.value = res.data.postGroup
}
onLoad(() => {
  getUser()
})
</script>
<template>
  <uni-list>
    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'person-filled'}" title="昵称" :rightText="user.nickName"/>
    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'phone-filled'}" title="手机号码" :rightText="user.phonenumber"/>
    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'email-filled'}" title="邮箱" :rightText="user.email"/>
    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'auth-filled'}" title="岗位" :rightText="postGroup"/>
    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'staff-filled'}" title="角色" :rightText="roleGroup"/>
    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'calendar-filled'}" title="创建日期"
                   :rightText="user.createTime"
    />
  </uni-list>
</template>
