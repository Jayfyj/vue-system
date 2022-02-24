<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagsList.value"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">
          {{ item.title }}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)"
          ><i class="el-icon-close"></i
        ></span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from './bus'
import router from '@/router'
import { reactive, computed, watch, onMounted, ref } from '@vue/composition-api'
export default {
  name: 'Tags',
  setup() {
    //页签数组
    let tagsList = reactive({ value: [] })

    //设置变量用于路由赋值,用于监听路由变化
    let routers = reactive({ value: router })

    //显示页签标志
    const showTags = computed(() => {
      return tagsList.value.length > 0
    })

    //监听路由变化
    watch(
      () => routers.value.currentRoute,
      (val) => {
        //要执行的方法
        setTags(val)
      }
      //   { immediate: true, deep: true } // 深度监听   和    第一次加载页面执行一次
    )

    //显示当前页面样式
    function isActive(path) {
      return path === router.currentRoute.fullPath
    }

    // 关闭单个标签
    function closeTags(index) {
      const delItem = tagsList.value.splice(index, 1)[0]
      const item = tagsList.value[index]
        ? tagsList.value[index]
        : tagsList.value[index - 1]
      if (item) {
        delItem.path === router.currentRoute.fullPath && router.push(item.path)
      } else {
        router.push('/')
      }
    }

    // 关闭全部标签
    function closeAll() {
      tagsList.value = []
      router.push('/')
    }

    // 关闭其他标签
    function closeOther() {
      const curItem = tagsList.value.filter((item) => {
        return item.path === router.currentRoute.fullPath
      })
      tagsList.value = curItem
    }

    // 设置标签
    function setTags(route) {
      console.log(route)
      const isExist = tagsList.value.some((item) => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (tagsList.value.length >= 8) {
          tagsList.value.shift()
        }
        tagsList.value.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
      console.log(tagsList.value)
      bus.$emit('tags', tagsList.value)
    }

    //页签控制
    function handleTags(command) {
      command === 'other' ? closeOther() : closeAll()
    }

    onMounted(() => {
      setTags(router.currentRoute)
      //监听关闭当前页面的标签页
      bus.$on('close_current_tags', () => {
        for (let i = 0, len = tagsList.value.length; i < len; i++) {
          const item = tagsList.value[i]
          if (item.path === router.currentRoute.fullPath) {
            if (i < len - 1) {
              router.push(tagsList.value[i + 1].path)
            } else if (i > 0) {
              router.push(tagsList.value[i - 1].path)
            } else {
              router.push('/')
            }
            tagsList.value.splice(i, 1)
            break
          }
        }
      })
    })

    return {
      tagsList,
      showTags,
      isActive,
      closeTags,
      closeAll,
      closeOther,
      setTags,
      handleTags
    }
  }
}
</script>

<style>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
