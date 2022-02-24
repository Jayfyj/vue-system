<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import bus from './bus'
import { vHead, vSidebar, vTags } from '../common'
import { ref, reactive } from '@vue/composition-api'

export default {
  name: 'Home',
  components: {
    vHead,
    vSidebar,
    vTags
  },
  setup() {
    //页签数组
    let tagsList = reactive({ value: [] })

    //收缩
    let collapse = ref(false)

    bus.$on('collapse-content', (msg) => {
      collapse.value = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', (msg) => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      tagsList.value = arr
    })

    return {
      tagsList,
      collapse
    }
  }
}
</script>
