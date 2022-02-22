<template>
  <div>
    <!--叶子级菜单-->
    <template v-if="item.subs === null">
      <el-menu-item :key="item.index" :index="item.index">
        <i :class="item.icon"></i>
        {{item.title}}
      </el-menu-item>
    </template>
    <!--父级菜单-->
    <el-submenu v-else :index="item.index" style="text-align: left">
      <span slot="title" style="font-size: 17px;">
        <i :class="item.icon"></i>
        {{item.title}}
      </span>
      <template v-for="child in item.subs">
        <sidebar-item v-if="child.subs && child.subs.length>0" :key="child.index" :item="child"/>
        <el-menu-item v-else :key="child.index" :index="child.index">
          <i :class="child.icon"></i>
          {{child.title}}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>
 
<script>
  export default {
    name: 'sidebarItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>