<template>
    <div>
      <el-popover
        placement="bottom-start"
        width="400"
        trigger="click"
        v-model="visible"
        @hide="()=>{searchValue =''}"
        >
        <div>
          <!-- 输入框 -->
          <el-input
            placeholder="输入关键字进行过滤"
            v-if="isShowSearch"
            style="margin-bottom:5px ;"
            v-model="searchValue">
          </el-input>
          <!-- 选择列表 -->
          <ul class="selectList">
            <li 
            :class="[item.disabled?'disabled':'selectChild', ]"
            v-for="item in selectList" 
            :key="item.value" 
            @click="selectClick(item)">
              <span 
              :class="[selectKey.indexOf(item.value)!=-1?'active':'']"
              >{{item.label}}</span>
              <i v-if="selectKey.indexOf(item.value)!=-1" class="el-icon-check"></i>
            </li>
          </ul>
        </div>

        <div :class="['select-warp', visible?'selected':'']"slot="reference" >
          <!-- 显示内容 -->
          <div class="content-select">
            <div class='content-select-child' v-for="item in showSelectKey" :key="item.value" style="margin-right:5px">
              <span>{{item.label}}</span>
              <i class="el-icon-error" v-if="multiple" @click.stop="handleSelectKey(item)"></i>
            </div>
          </div>
          <!-- 后缀图标 -->
          <div class="icon-select">
            <template>
              <i class="el-icon-error" v-show="showSelectKey.length>0" @click.stop="delAll"></i>
            </template>
            <i class="el-icon-arrow-up" v-show="visible"></i>
            <i class="el-icon-arrow-down" v-show="!visible"></i>
          </div>
        </div>

      </el-popover>
    </div>
</template>.

<script>
export default {
    name: 'fjSelect2',
    // props:['value','optionList','disOptionList','multiple','isShowSearch'],
    props:{

      value:{
        typeof:[String,Number,Array],
        default:()=>''
      },

      //所有选项
      optionList:{
        typeof:Array,
        default:()=>[]
      },

      //禁止选项
      disOptionList:{
        typeof:Array,
        default:()=>[]
      },

      //是否多选
      multiple:Boolean,

      //是否显示搜索框
      isShowSearch:Boolean,
       
    },
    
    model:{
      event:'setValue',
      prop:'value'
    },


    methods: {
      
      //操作选择框选项
      selectClick(item){
        if(item.disabled){
          this.visible=true
        }else{
          if(this.multiple){
            this.handleSelectKey(item)
          }else{
            this.selectKey = [];
            this.showSelectKey = []
            this.visible=false
            let value = item.value
            this.selectKey.push(value)
            this.showSelectKey.push(item)
            // this.$emit('setValue',this.selectKey)
            this.$emit('setValue',value)
            //选中的对象
            this.$emit('update:getSelect',item)
          }
        }
      },

      //操作输入框
      handleSelectKey(item){
        let flag = false
        this.selectKey.forEach((ele,index) =>{
          if(ele === item.value){
            flag = true
            return
          }
        })
        if(flag){
          this.showSelectKey.forEach((ele,index) =>{
            if(ele.value === item.value){
              this.showSelectKey.splice(index,1)
              return
            }
          })

          this.selectKey.forEach((ele,index) =>{
            if(ele === item.value){
              this.selectKey.splice(index,1)
              return
            }
          })

        }else{
          this.selectKey.push(item.value)
          this.showSelectKey.push(item)
        }
        this.$emit('setValue',this.selectKey)
        //选中的对像数组
        this.$emit('update:getSelect',this.selectKey)
        
      },

      //删除全部
      delAll(){
        this.selectKey = ''
        this.showSelectKey = []
        if(this.multiple){
          this.selectKey = []
        }
        this.$emit('setValue',this.selectKey)
        this.$emit('update:getSelect',this.selectKey)
       
      }
    },

    computed:{
      selectList(){
        let list = this.allSelectList.filter(item=>item.label.indexOf(this.searchValue)!=-1)
        return list
      },

      allSelectList(){
        let newList = JSON.parse(JSON.stringify(this.optionList))
        if(this.disOptionList.length>0){
          newList.forEach((element,index) => {
            this.disOptionList.forEach((eles,ind)=>{
              if(element.value === eles.value){
                element.disabled = true
              }
            })
          });
        }
        let list = newList
        return list
      }
    },

    watch:{
      value:{
        handler(v){
          this.selectKey = []
          this.showSelectKey = []
          if(v instanceof Array){
            this.selectKey = v
          }else{
            this.selectKey = [v]
          }
          this.allSelectList.forEach(ele =>{
            this.selectKey.forEach(eles =>{
              if(ele.value === eles){
                this.showSelectKey.push(ele)
                return
              }
            })
          })
        },
        immediate: true
      },
      // multiple:{
      //   handler(v){
      //     console.log(v)
      //   },
      //   immediate: true
      // }
    },

    data() {
      return {
        searchValue: '',
        visible:false,
        selectKey:[],
        showSelectKey:[],
        
      };
    },

    mounted(){
      
    },
};
</script>

<style scoped lang='scss'>
$themeColor:#409eff;

.select-warp{
  min-width: 90px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius:4px ;
  box-sizing: border-box;
  display: flex;
  &:hover{
    cursor: pointer;
    >.icon-select{
      .el-icon-error{
        display: block;
      }
    }
  }
  >.content-select{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    color: #999;
    // background: red;
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    >.content-select-child{
      background: #eef;
      padding: 1px 3px;
      border-radius:3px ;
      >.el-icon-error{
        margin-left:5px;
        color: #bbb;
      }
    }
  }
  >.icon-select{
    min-width: 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    >.el-icon-arrow-up, >.el-icon-arrow-down, >.el-icon-error{
      color: #ddd;
      right: 5px;
    }
    >.el-icon-error{
      display: none;
    }
  }
}

.selected{
  border-color: $themeColor;
}


.selectList{
  >li{
    list-style: none;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >.active{
      color:$themeColor
    }
  }
  >.selectChild{
    &:hover{
      cursor: pointer;
      background: $themeColor;
      opacity: 0.4;
      color: white;
      >i{
        color: white;
      }
      >.active{
        color:white
      }
    }
    >i{
      color: $themeColor;
    }
  }
  >.disabled{
    color:#ddd;
    cursor: not-allowed;
  }
}
</style>