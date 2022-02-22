<template>
    <div class="img-select">
        <div class="showimg" @click="() =>{$refs.file.click();}">
            <img :src="downloadUrl + pictureId" v-if="pictureId"/>
            <span v-else>
                <gmd-icon type="camera" />
                <span>点击上传图片</span>
            </span>
        </div>
        <span style="width:350px;color:#9999">图片建议使用 300×284 像素，大小在 300KB 以内</span>
        <input
            type="file"
            hidden
            ref="file"
            @change="handleFileChange"
            :accept="acceptFile"
        >
    </div>
</template>
<script>
// import { uploadRequest } from '@/utils/apis.js';
// import cgi from '@/utils/cgi.js';

export default {
    name:'imgSelect',
    props:{
        pictureId:{
            type:String,
            default:()=>{
                return ``
            }
        },
    },
    data(){
        return{
            // downloadUrl:`${cgi._download}?fileId=`,
            downloadUrl:``,
            acceptFile: `
            .jpeg,.png,.gif,.jpg
            `,
        }
    },
    methods:{
       
        //上传附件
        handleFileChange(e) {
            const file = e.target.files[0];
            e.target.value = '';
            const formData = new FormData();
            if (!file) return;
            if(this.acceptFile.indexOf(file.name.split('.')[1])<0){
                this.$message.error("请上传正确的图片格式", 3);
            }else{
                formData.append('file', file);
                if(this.typeUpLoad === 'zcfg'){
                    //政策法规
                    formData.append('bizType', 2);
                }else{
                    //公告类型
                    formData.append('bizType', 1);
                }
        
                const limit = 300 * 1024; // 3ookb
                if (file.size > limit) {
                    this.$message.error("上传图片大小不能超过300KB", 3);
                    return;
                }else{
                    // uploadRequest(formData).then( res =>{
                    //     if(res&&res.errcode === 0){
                    //         this.$emit('update:pictureId', res.data)
                    //         this.$emit('clearListValidate')
                    //     }
                    // })
                }
            }
        },
       
    }
}

</script>
<style scoped lang="scss">
.img-select{
    margin-left: 30px;
    width: 100%;
    display: flex;
    align-items: flex-end;
    min-width: 700px;
    >.showimg{
        width: 300px;
        height: 284px;
        margin-right:20px;
        border: 1px solid silver ;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background: #cccccc;
        >span{
            font-size: 28x;
            font-weight:700;
            color: #4293F4;
        }
        >img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
