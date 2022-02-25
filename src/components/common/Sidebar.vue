<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <v-Sidebar-item
        v-for="(menu, i) in menuList.value"
        :key="i"
        :item="menu"
      />
    </el-menu>
  </div>
</template>

<script>
import bus from './bus'
import vSidebarItem from './SidebarItem.vue'
import { menuUrl } from './api'
import router from '@/router'
import { ref, reactive, computed } from '@vue/composition-api'

export default {
  name: 'Sidebar',
  components: { vSidebarItem },
  setup() {
    //收缩
    let collapse = ref(false)

    //菜单数组
    let menuList = reactive({ value: [] })

    //设置变量用于路由赋值,用于监听路由变化
    let routers = reactive({ value: router })

    //获取当前路由的name
    const onRoutes = computed(() => {
      let { currentRoute } = routers.value
      console.log(currentRoute.path.replace('/', ''))
      return currentRoute.path.replace('/', '')
    })

    menuUrl().then((res) => {
      let { menu } = res
      menuList.value = menu
    })

    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', (msg) => {
      collapse.value = msg
      bus.$emit('collapse-content', msg)
    })

    return {
      collapse,
      onRoutes,
      menuList
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
