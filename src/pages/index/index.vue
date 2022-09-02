<script setup lang="ts">
import uniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue'

import { UserService } from '@/service'

const title = ref('Hello')

onShow(async () => {
  const res = await UserService.getList()
})

// UserService.getTask('/api/user/list')?.abort()
</script>

<template>
  <view class="flex-center flex-col bg-#fff m-3 ">
    <uni-badge text="1"></uni-badge>
    <!--    <image class="w-200 h-200 mt-200rpx mb-50rpx mx-auto" src="/static/logo.png" /> -->
    <text class="w-1/2 bg-gray-500 flex flex-1 text-#f50'">
      dddddddd
    </text>
    <!--    <view class="flex justify-center"> -->
    <!--      <text class="text-lg text-c1"> -->
    <!--        {{ title }} -->
    <!--      </text> -->

    <!--      <text class="text-c4 pb-safe"> -->
    <!--        world -->
    <!--      </text> -->
    <!--    </view> -->
  </view>
</template>

