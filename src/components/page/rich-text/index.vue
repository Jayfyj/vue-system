<template>
  <div>
    <textarea ref="tinymce-edit" :placeholder='placeholder' id="tinymce-edit" cols="30" rows="10"></textarea>
    <!-- <div v-html="value" v-if="showPrevie"></div> -->
    <span v-if="fontLimit" 
    :style="{
      float:'right',
      color:textLength>fontLimit?'red':''
    }">{{limitMessage}}</span>
    <input
      type="file"
      :accept="acceptFile"
      hidden
      id="hiddenInput"
    />
  </div>
</template>
<script>
import tinymce from "tinymce";
import "tinymce/themes/modern/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/paste";
// import "tinymce/plugins/preview";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "./plugins/placeholder";
// import {
//   uploadRequest,
// } from "@/utils/apis.js";
// import cgi from "@/utils/cgi.js";
// import CN from './zh_CN.js';
export default {
  props: {
    // showPrevie: {
    //   type: Boolean,
    //   default: true,
    // },

    //占位符
    placeholder:{
      type: String,
      default: "请输入文本内容",
    },

    //上传菜单类型（政策法规或者其他做判断）
    typeUpLoad: {
      type: String,
      default: "",
    },

    //传过来的值
    value: {
      type:String,
      default:()=>{
        return ""
      }
    },
    
    //限制字段个数
    fontLimit:{
      type:[Boolean, String],
      default:()=>{
        return false
      }
    }
  },
  watch:{
    value(n){
      if(this.flag){
        this.$nextTick(()=>{
          this.editor.setContent(n || "");
          this.flag = false;
          let str = this.editor.getContent({ 'format':'text' });
          this.textLength = str.replace(/[\r\n]/g,"").trim().length;
          
        })
      }
    }
  },
  computed:{
    limitMessage(){
      return `限制字数${this.fontLimit}，当前字数${this.textLength}`;
    }
  },
  mounted() {
    const vm = this;
    tinymce.init({
      ...this.init,
      selector: "#tinymce-edit",
      default_link_target: "_blank",
      //为false，试着保持URL的完整性。默认为true,意味着URL会依据 relative_urls的状态而被强制为绝对或相对的
      convert_urls : false,
      //允许MCFileManager返回的URL的协议和主机部分被删除，该选项仅在relative_urls选项设为false时有用，该选项默认为true
      remove_script_host : false,
      //该选项设为true，所有通过MCFileManager返回的URL都会与知道的document_base_url相关。如果设为false，所有URL会被转化成绝对URL
      relative_urls : false,
      //初始化
      setup: editor => {
        this.editor = editor;

        this.editor.on("change keyup undo redo blur", this.handleInput);

        // this.editor.on("init", function () {
        //   vm.editor.setContent(vm.value || "");
        // });
      },

      //图片选择
      images_upload_handler: (blobInfo, success, failure) => {
        // const file = blobInfo.blob();
        // if (!file.name || !file.lastModified) return;
        // const formData = new FormData();
        // if(this.acceptFile.indexOf(file.name.split('.')[1])<0){
        //   this.$message.error(`请上传正确的图片格式`, 3);
        // }else{
        //   formData.append("file", file);

        //   if (this.typeUpLoad === "zcfg") {
        //     // 政策法规
        //     formData.append("bizType", 2);
        //   } else{
        //     // 公告类型
        //     formData.append("bizType", 1);
        //   }
        //   uploadRequest(formData).then(res => {
        //     if(res&&res.errcode === 0){
        //       success(`${cgi._download}?fileId=${res.data}`);
        //     }else{
        //       failure(res.errmsg)
        //     }
        //   });
        // }
      },

      //文件选择
      file_browser_callback: (field_name, url, type, win) => {
        // const input = document.getElementById("hiddenInput");
        // const vm = this;
        // input.addEventListener("change", function (event) {
        //   const reader = new FileReader();
        //   const file = event.target.files[0];
        //   event.target.value = '';
        //   if (!file.name || !file) return;
        //   const formData = new FormData();
        //   if(vm.acceptFile.indexOf(file.name.split('.')[1])<0){
        //     vm.$message.error(`请上传正确的图片格式`, 3);
        //   }else{
        //     formData.append("file", file);
        //     if (vm.typeUpLoad === "zcfg") {
        //       // 政策法规
        //       formData.append("bizType", 2);
        //     } else{
        //       // 公告类型
        //       formData.append("bizType", 1);
        //     }
        //     uploadRequest(formData).then(res => {
        //       if(res&&res.errcode === 0){
        //         win.document.getElementById(
        //           field_name
        //         ).value = `${cgi._download}?fileId=${res.data}`;
        //         reader.readAsDataURL(file);
        //         reader.onload = function (e) {
        //           let image = new Image();
        //           image.src = e.target.result;
        //           image.onload = function () {
        //             let w = this.width;
        //             let h = this.height;
        //             let input = win.document.getElementsByTagName("input");
        //             for (let i of input) {
        //               if (i.getAttribute("aria-label") === "Width") {
        //                 i.value = w;
        //               }
        //               if (i.getAttribute("aria-label") === "Height") {
        //                 i.value = h;
        //               }
        //             }
        //           };
        //         };
        //       }
        //     });
        //   }
        // });
        // input.click();
      },
      
    });
    this.isNewInfo();
  },
  beforeDestroy() {
    let timer;
    timer = setTimeout(() => {
      if (this.editor !== null) {
        tinymce.remove(this.editor);
        clearTimeout(timer);
      }
    }, 1000);
  },
  data() {
    return {
      acceptFile: `
      .jpeg,.png,.gif,.jpg
      `,
      editor: null,
      //用于一开始获取文本，然后设置为fasle
      flag:true,
      //纯文字
      textLength:0,
      init: {
        // language_url:'../../../../../public/tinymce/zh_CN.js',
        // skin_url: `../../../../../public/tinymce/skins/lightgray`,
        // language_url:'../../../../../public/tinymce/zh_CN.js',
        // skin_url: `../../../../../public/tinymce/skins/lightgray`,
        language_url: "tinymce/zh_CN.js",
        languag: "zh_CN",
        skin_url: "tinymce/skins/lightgray",
        height: 300,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu placeholder",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        image_caption: true,
        file_browser_callback_types: "image",
        paste_data_images: true,
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: false, // 禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        // eslint-disable-next-line no-dupe-keys
        paste_data_images: true, // 允许粘贴图像
      },
    };
  },
  methods: {
    //富文本内容改变
    handleInput() {
     
      this.flag = false
      this.content = this.editor.getContent();
      let str = this.editor.getContent({ 'format':'text' })
      this.textLength = str.replace(/[\r\n]/g,"").trim().length;
      if(this.fontLimit){
        if(this.textLength>this.fontLimit){
          this.$emit("input", "null");
        }else{
          if(this.textLength===0){
            this.$emit("input", '');
          }else{
            this.$emit("input", this.content);
          }
        }
      }else{
        if(this.textLength===0){
          this.$emit("input", '');
        }else{
          this.$emit("input", this.content);
        }
      }
    },

    //判断是否是新增信息
    isNewInfo(){
      let id = this.$route.params.id;
      if(!id){
        this.flag =false
      }
    },

    //焦点放在最后
    keepLastIndex (obj, window) {
      if (window.getSelection) { //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) { //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
    }
  },
};
</script>

