<script setup lang="ts">
import {Navigate} from "@/utils";
import {getToken} from "@/utils/Storage";

const checkLogin=()=>{
  if(!getToken){
    Navigate.redirect('/pages/login')
  }
}
const initApp=()=>{
  // 检查用户登录状态
  //#ifdef H5
  checkLogin()
  //#endif
}
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import '@/static/reset.scss';
.uno-start {
    --un: 0;
}
/* unocss 代码生成在这 */
.uno-end {
    --un: 0;
}
</style>
