<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align: left"></div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import E from 'wangeditor'
export default {
  name: 'Wangeditor',
  setup() {
    let id = ref('')

    //正文
    let content = ref('')

    //标题
    let title = ref('')

    //封面
    let primaryPic = ref('')

    //分享海报
    let sharePoster = ref('')

    //编译器对象
    let editor = reactive({ value: null })

    //实例editorElem元素
    let editorElem = ref(null)

    onMounted(() => {
      //编辑器初始化
      editor.value = new E(editorElem.value)

      // 配置图片服务器端地址
      console.log(editor.value)

      // return
      editor.value.config.uploadImgServer =
        'https://lss.chongjianet.com/api/file/upload_2_ali_oss'
      // editor.customConfig.withCredentials = true
      // 编辑器的事件，每次改变会获取其html内容
      editor.value.config.onchange = (html) => {
        content.value = html
        console.log(content.value)
      }
      editor.value.config.menus = [
        // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      editor.value.create() // 创建富文本实例
    })

    return {
      id,
      content,
      title,
      primaryPic,
      sharePoster,
      editor,
      editorElem
    }
  }
}
</script>
