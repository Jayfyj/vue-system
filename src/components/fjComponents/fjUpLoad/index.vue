<template>
    <div>
        <div
            v-if="upLoadHandleType==='text'"
            class="text-button"
            style="margin-top: 10px;"
            @click="() =>{$refs.file.click();}"
        >
        {{title}}</div>
        <gmd-button 
          v-if="upLoadHandleType==='btn'"
          type="primary" 
          style="width:136px;height:39px;margin-top: 10px;" 
          @click="() =>{$refs.file.click();}">
          {{title}}
        </gmd-button>
        <input
            type="file"
            hidden
            ref="file"
            @change="handleFileChange"
            :accept="acceptFile"
        >
        <template v-if="!draggable">
          <div
              class="file-list"
              v-for="(item, index) in fileList"
              :key="index"
              >
              <div class="file-list-content">
                <span class="file-name">{{ item.fileName + item.fileExtension }}</span>
                <a
                    class="file-btn"
                    download
                    :href="downloadUrl+item.fileId"
                    target="_blank"
                >下载</a>
                <span
                    class="file-btn-del"
                    @click="deleteFile(index)"
                >删除</span>
              </div>
            </div>
        </template>

        <template v-else>
          <vuedraggable class="wrapper" v-model="fileList" v-if="fileList.length">
            <transition-group>
                <div
                  class="file-list"
                  v-for="(item, index) in fileList"
                  :key="index"
                  >
                  <div class="file-list-content">
                    <span class="file-name">{{ item.fileName + item.fileExtension }}</span>
                    <a
                        class="file-btn"
                        download
                        :href="downloadUrl+item.fileId"
                        target="_blank"
                    >下载</a>
                    <span
                        class="file-btn-del"
                        @click="deleteFile(index)"
                    >删除</span>
                    <gmd-icon type="up-circle" class="up-btn" @click="up(index)" v-if="index!==0"/>
                    <gmd-icon type="down-circle"  class="down-btn" @click="down(index)" v-if="index!==fileList.length-1"/>
                  </div>
                </div>
            </transition-group>
          </vuedraggable>
        </template>
  </div>
</template>
<script>
import vuedraggable from 'vuedraggable';
// import { uploadRequest, downloadRequest } from '@/utils/apis.js';
// import cgi from '@/utils/cgi.js';
export default {
  name:"fileUpload",
  components: {vuedraggable},
  props:{
        //上传按钮的类型
        upLoadHandleType:{
          type:String,
          default:()=>{
            return "text"
          }
        },
        //上传资料统称
        upLoadFileName:{
          type:String,
          default:()=>{
            return "附件"
          }
        },
        //上传资料数量
        limit:{
          type:[Number,String],
          default:()=>{
            return ''
          }
        },
        //是否拖拽换位置
        draggable:{
          type:Boolean,
          default:()=>{
            return false
          }
        },
        //资料数组
        list:{
            type:Array,
            default:()=>{
                return []
            }
        },
        //标题
        title:{
            type:String,
            default:''
        },
        //上传菜单类型（政策法规或者其他做判断）
        typeUpLoad:{
            type:String,
            default:''
        }
  },
  computed:{
    fileList:{
      get(){
        return this.list
      },
      set(val){
        this.$emit('update:list', val)
      }
     
    },
  },
  data() {
    return {
      // downloadUrl:`${cgi._download}?fileId=`,
      downloadUrl:``,
      acceptFile: `
      .ttf,.woff,.txt,.ppt,.pptx,.ico,.js,.css,.html,.png,.jpg,.swf,.bmp,.xls,.jpeg,.doc,.docx,.xlsx,.exe,.mp4,.pdf,.svg,.csv,.zip,.rar
      `,
    };
  },
  methods: {
    
    //上传附件
    handleFileChange(e) {
      const file = e.target.files[0];
      e.target.value = '';
      const formData = new FormData();
      if (!file) return;
      if(this.acceptFile.indexOf(file.name.split('.')[1])<0){
        this.$message.error(`请上传正确的${this.upLoadFileName}格式`, 3);
      }else{
        formData.append('file', file);
        if(this.typeUpLoad === 'zcfg'){
          //政策法规
          formData.append('bizType', 2);
        }else{
          //公告类型
          formData.append('bizType', 1);
        }
        // console.log(formData)
        // return
        // const limit = 20 * 1024 * 1024; // 20Mb
        // if (file.size > limit) {
        //   this.$message.error(`上传${this.upLoadFileName}大小不能超过20M`, 3);
        //   return;
        // }
        if(this.list.length===this.limit){
            // this.$warning({
            //     title: '上传提示',
            //     content: `只能上传${this.limit}张${this.upLoadFileName}`,
            //     onOk() {
            //         return
            //     },
            // });
          this.$message.error(`只能上传${this.limit}张${this.upLoadFileName}`, 3);
        }else{
          // uploadRequest(formData).then( res =>{
          //   if(res&&res.errcode === 0){
          //     this.list.push(
          //       {
          //         fileName:file.name.split('.')[0],
          //         fileExtension:`.${file.name.split('.')[1]}`,
          //         fileId:res.data
          //       }
          //     )
          //     this.$emit('update:list', this.list)
          //     this.$emit('clearListValidate')
          //   }
          // })
        }
      }
    },
    
    //下载附件
    handleFileDwon(file) {
      let params = {
        fileId:file.fileId
      }
      downloadRequest(params).then(res =>{
        /* 兼容ie内核，360浏览器的兼容模式 */
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          let blob = new Blob([res])
          window.navigator.msSaveOrOpenBlob(blob, `${file.fileName}${file.fileExtension}`)
        } else {
        /* 火狐谷歌的文件下载方式 */
          var blob = new Blob([res])
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = `${file.fileName}${file.fileExtension}`
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
          window.URL.revokeObjectURL(href)
        }
      })
    },

    //删除附件
    deleteFile(index) {
      this.list.splice(index,1);
      this.$emit('update:list', this.list);
      this.$refs.file.value = '';

    },

    up (i) {
      if(i <= 0) return

      [this.fileList[i-1],this.fileList[i]] = [this.fileList[i],this.fileList[i-1]]

      this.$forceUpdate()
    },

    down (i) {
      if(i >= this.fileList.length - 1) return

      [this.fileList[i+1],this.fileList[i]] = [this.fileList[i],this.fileList[i+1]]

      this.$forceUpdate()
    },
  },
};
</script>
<style scoped lang='scss'>
    .text-button {
      font-size: 14px;
      color: #3E97DF;
      line-height: 20px;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      display: inline-block;
    }
    .file-list {
      margin-top: 5px;
      &>.file-list-content {
        display: flex;
        justify-content:flex-start;
        align-items: center;
        background: #F1F2F3;
        padding: 10px 20px;
        font-size: 14px;
        margin-bottom: 10px;
        &>span {
          display: inline-block;
          vertical-align: middle;
        }
        & .file-name {
          color: #111111;
          font-weight: 600;
          max-width: 80%;
          margin-right: 35px;
        }
        & .file-btn {
          margin-right: 20px;
        }
        & .file-btn-del{
          &:hover{
            cursor: pointer;
            color: red;
          }
        }
        & .up-btn{
          margin-left:20px;
          font-size: 20px;
          &:hover{
            // background:#3E97DF;
            color: #3E97DF;
          }
        }
        & .down-btn{
          margin-left:20px;
          font-size: 20px;
          &:hover{
            // background:#3E97DF;
            color: #3E97DF;
          }
        }
      }
    }
</style>
