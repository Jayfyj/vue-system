<template>
    <div class="icon-select">
        <div class="showIcon" @click="iconClick">
            <img :src="icon" v-if="icon"/>
            <div  v-else>
                <span>+</span>
            </div>
        </div>
        <span class="add-icon" @click="iconClick">添加图标</span>
        <div class="selectIcon" v-if="isShow" @mouseenter="iconEnter" @mouseleave="iconLeave">
            <div v-for="(item) in iconList" :key="item.id" @click="iconPick(item)">
                <img :src="item.dataValue"/>
            </div>
        </div>
    </div>
</template>
<script>
// import { getSysDictRequest} from '@/utils/apis.js';
// import { URL_STATIC_IMAGES }  from '@/connect';

export default {
    name:'iconSelect',
    props:{
        icon:{
            type:String,
            default:()=>{
                return ``
            }
        },
        setTime:{
            type:Number,
            default:()=>{
                return 3000
            }
        }
    },
    mounted(){
      this.getIcon();
    },
    beforeDestroy(){
        if(this.timer){
            clearTimeout(this.timer)
        }
    },  
    data(){
        return{
            // baseUrl:URL_STATIC_IMAGES,
            src:'',
            isShow:false,
            timer:null,
            iconList:[],
        }
    },
    methods:{
        // 打开icon框
        iconClick(){
            this.isShow = true;
            this.timer = setTimeout(()=>{
                    this.isShow = false;
                    clearTimeout(this.timer)
                },this.setTime)
        },

        //进入选择icon框
        iconEnter(){
            console.log("进入")
            if(this.timer){
                console.log("清楚定时器")
                clearTimeout(this.timer)
            }
        },

        //离开选择icon框
        iconLeave(){
            console.log("离开")
            if(this.timer){
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.isShow = false;
                    clearTimeout(this.timer)
                },this.setTime)
            }else{
                this.timer = setTimeout(()=>{
                    this.isShow = false;
                    clearTimeout(this.timer)
                },this.setTime)
            }
        },

        //图标选择
        iconPick(item){
            if(this.timer){
                clearTimeout(this.timer)
            }else{
                this.timer = null
            }
            this.isShow = false;
            let icon = item.dataValue;
            console.log(icon)
            this.$emit('update:icon', icon)
            this.$emit('clearListValidate')
        },

        //获取图标
        getIcon(){
            let query ={
                dataType:"dh-cbl-icon"
            }
            // getSysDictRequest(query).then(res =>{
            //     if(res&&res.errcode === 0){
            //         this.iconList = res.data
            //     }
            // })
        },
    }
}

</script>
<style scoped lang="scss">
$iconWidth:70px;
$iconHeight:70px;
.icon-select{
    margin-left: 30px;
    position:relative;
    >.showIcon{
        width: $iconWidth;
        height:$iconHeight;
        margin-bottom: 10px;
        cursor: pointer;
        >div{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid silver ;
            >span{
                font-size: 40px;
                font-weight:700;
            }
        }
        >img{
            width: 100%;
            height: 100%;
        }
    }
    >.add-icon{
        color: #4293F4;
        &:hover{
            cursor: pointer;
        }
    }
    >.selectIcon{
        top:-30px;
        left: 100px;
        position:absolute;
        z-index: 10;
        background: white;
        border: 1px solid silver ;
        width: 500px;
        min-height: 200px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        >div{
            padding: 5px;
            box-sizing: border-box;
            width: $iconWidth;
            height:$iconHeight;
            >img{
                width: 100%;
                height: 100%;
            }
            &:hover{
                border: 1px solid #4293F4;
            }
        }
    }
}
</style>
