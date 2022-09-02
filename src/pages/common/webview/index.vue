<script setup lang="ts">
const props = defineProps<{ src: string }>()
let params = reactive({
  url: ''
})
const webviewStyles = ref('')
onLoad((event: any) => {
  params = event
  event.title && uni.setNavigationBarTitle({
    title: event.title
  })
})
</script>
<template>
  <view v-if="params.url">
    <web-view :webview-styles="webviewStyles" :src="`${params.url}`"></web-view>
  </view>
</template>
