<script setup lang="ts">
import {Modal} from "@/plugins/Modal";
import {UserService} from "@/service/api/system/user";
import { Navigate} from "@/utils";

const form=ref(null)
const user = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const rules = reactive({
  oldPassword: {
    rules: [{
      required: true,
      errorMessage: '旧密码不能为空'
    }]
  },
  newPassword: {
    rules: [{
      required: true,
      errorMessage: '新密码不能为空',
    },
      {
        minLength: 6,
        maxLength: 20,
        errorMessage: '长度在 6 到 20 个字符'
      }
    ]
  },
  confirmPassword: {
    rules: [{
      required: true,
      errorMessage: '确认密码不能为空'
    }, {
      validateFunction: (rule: any, value: any, data: { newPassword: any; }) => data.newPassword === value,
      errorMessage: '两次输入的密码不一致'
    }
    ]
  }
})
const submit=async ()=>{
  (form.value as any).validate().then(async () => {
    await UserService.updateUserPwd({oldPassword:user.oldPassword,newPassword:user.newPassword})
    Modal.msgSuccess('修改成功')
    Navigate.back()
  })

}
onReady(async () => {
  await nextTick()
  if (form.value != null) {
    (form.value as any).setRules(rules)
  }
})
</script>
<template>
  <view class="pwd-retrieve-container">
    <uni-forms ref="form" :value="user" labelWidth="80px">
      <uni-forms-item name="oldPassword" label="旧密码">
        <uni-easyinput type="password" v-model="user.oldPassword" placeholder="请输入旧密码"/>
      </uni-forms-item>
      <uni-forms-item name="newPassword" label="新密码">
        <uni-easyinput type="password" v-model="user.newPassword" placeholder="请输入新密码"/>
      </uni-forms-item>
      <uni-forms-item name="confirmPassword" label="确认密码">
        <uni-easyinput type="password" v-model="user.confirmPassword" placeholder="请确认新密码"/>
      </uni-forms-item>
      <button type="primary" @click="submit">提交</button>
    </uni-forms>
  </view>
</template>

<style lang="scss">
page {
  background-color: #ffffff;
}

.pwd-retrieve-container {
  padding-top: 36rpx;
  padding: 15px;
}
</style>
