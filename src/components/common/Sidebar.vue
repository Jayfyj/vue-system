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
      <sidebar-item v-for="(menu, i) in items" :key="i" :item="menu" />
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus'
import sidebarItem from './sidebarItem.vue'
export default {
  components: { sidebarItem },
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-lx-home',
          index: 'dashboard',
          title: '系统首页',
          subs: null
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'table',
          title: '基础表格',
          subs: null
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'allSelectTable',
          title: '选中所有表格',
          subs: null
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'table1',
          title: '基础表格1',
          subs: null
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'formTest',
          title: '表单测试',
          subs: null
        },
        {
          icon: 'el-icon-lx-copy',
          index: 'tabs',
          title: 'tab选项卡',
          subs: null
        },
        {
          icon: 'el-icon-lx-calendar',
          index: '3',
          title: '表单相关',
          subs: [
            {
              index: 'form',
              title: '基本表单',
              subs: null
            },
            {
              index: '3-2',
              title: '三级菜单',
              subs: [
                {
                  index: 'editor',
                  title: '富文本编辑器',
                  subs: null
                },
                {
                  index: 'markdown',
                  title: 'markdown编辑器',
                  subs: null
                }
              ]
            },
            {
              index: 'upload',
              title: '文件上传',
              subs: null
            }
          ]
        },
        {
          icon: 'el-icon-lx-emoji',
          index: 'icon',
          title: '自定义图标',
          subs: null
        },
        {
          icon: 'el-icon-pie-chart',
          index: 'charts',
          title: 'schart图表',
          subs: null
        },
        {
          icon: 'el-icon-rank',
          index: '6',
          title: '拖拽组件',
          subs: [
            {
              index: 'drag',
              title: '拖拽列表',
              subs: null
            },
            {
              index: 'dialog',
              title: '拖拽弹框',
              subs: null
            }
          ]
        },
        {
          icon: 'el-icon-lx-global',
          index: 'i18n',
          title: '国际化功能',
          subs: null
        },
        {
          icon: 'el-icon-lx-warn',
          index: '7',
          title: '错误处理',
          subs: [
            {
              index: 'permission',
              title: '权限测试',
              subs: null
            },
            {
              index: '404',
              title: '404页面',
              subs: null
            }
          ]
        },
        {
          icon: 'el-icon-lx-redpacket_fill',
          index: '/donate',
          title: '支持作者',
          subs: null
        },
        {
          icon: 'el-icon-lx-redpacket_fill',
          index: '/tinymec',
          title: 'tinymec富文本',
          subs: null
        }
      ]
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', (msg) => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
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
