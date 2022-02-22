<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
//data部分代码
  data(){
    return {
      id: '',
      content: "", //正文
      title: "", //标题
      primaryPic: "", //封面
      sharePoster: "", //分享海报
      editor: null,
    }
  },
 
//mounted部分代码
   mounted() {
      // console.log(1234)
    //编辑器初始化
    this.editor = new E(this.$refs.editorElem);
    // 配置图片服务器端地址
    console.log(this.editor)
    // return
    this.editor.config.uploadImgServer = 'https://lss.chongjianet.com/api/file/upload_2_ali_oss'
    // editor.customConfig.withCredentials = true
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = html => {
      this.content = html;
      console.log(this.content)
    };
    this.editor.config.menus = [
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
    ];
    this.editor.create(); // 创建富文本实例
 
  },
}
</script>