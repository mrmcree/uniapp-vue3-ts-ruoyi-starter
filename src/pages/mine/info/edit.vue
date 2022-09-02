<script setup lang="ts">
import {Modal} from "@/plugins/Modal";
import {updateUser, UserService} from "@/service/api/system/user";

const user = reactive<updateUser>({
  nickName: "",
  phonenumber: "",
  email: "",
  sex: ""
})
const form = ref(null)
const sexy = ref([{
  text: '男',
  value: "0"
}, {
  text: '女',
  value: "1"
}])
const rules = ref({
  nickName: {
    rules: [{
      required: true,
      errorMessage: '用户昵称不能为空'
    }]
  },
  phonenumber: {
    rules: [{
      required: true,
      errorMessage: '手机号码不能为空'
    }, {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      errorMessage: '请输入正确的手机号码'
    }]
  },
  email: {
    rules: [{
      required: true,
      errorMessage: '邮箱地址不能为空'
    }, {
      format: 'email',
      errorMessage: '请输入正确的邮箱地址'
    }]
  }
})
const submit = () => {
  (form.value as any).validate().then(async () => {
    await UserService.updateUserProfile(user)
    Modal.msgSuccess('修改成功')
  })
}
onLoad(async()=>{
 const res =await UserService.getUserProfile()
  Object.assign(user, res.data.data)
})
onShow(async () => {
  await nextTick()
  if (form.value != null) {
    (form.value as any).setRules(rules.value)
  }
})
</script>
<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="user" labelWidth="80px">
        <uni-forms-item label="用户昵称" name="nickName">
          <uni-easyinput v-model="user.nickName" placeholder="请输入昵称"/>
        </uni-forms-item>
        <uni-forms-item label="手机号码" name="phonenumber">
          <uni-easyinput v-model="user.phonenumber" placeholder="请输入手机号码"/>
        </uni-forms-item>
        <uni-forms-item label="邮箱" name="email">
          <uni-easyinput v-model="user.email" placeholder="请输入邮箱"/>
        </uni-forms-item>
        <uni-forms-item label="性别" name="sex" required>
          <uni-data-checkbox v-model="user.sex" :localdata="sexy"/>
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
  </view>
</template>
<style lang="scss" scoped>
page {
  background-color: #ffffff;
}

.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
  flex: 1;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  line-height: 35px;
  margin-left: 10px;
}
</style>
