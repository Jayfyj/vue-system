<template>
    <div>
      <el-form-item v-bind="$attrs" :rules="[...rules,...addrules,...rulesType]">
        <el-select v-model="select" v-bind="$attrs" v-on="{...$listeners}" @visible-change="()=>{searchValue=''}">
          <slot>
            <el-input v-model="searchValue" v-if="showSearch"/>
            <el-option  v-for="(item,index) in optionLists" 
              :label="item.label" 
              :value="item.value"
              :disabled="item.disabled"
              :key="item.value"
            ></el-option>
          </slot>
          <div slot="empty">
            <el-input v-model="searchValue" v-if="showSearch"/>
            <el-empty :image-size="80"></el-empty>
          </div>
        </el-select>
      </el-form-item>
    </div>
</template>

<script>
import fjRegexRules  from '../fjRegexRule'
export default {
    name: 'fjSelect',
    props:{
      value:{
        typeof:[Array,String],
        default:""
      },

      //规则
      rules:{
        typeof:Array,
        default:()=>[]
      },

      //追加新规则
      addrules:{
        typeof:Array,
        default:()=>[]
      },

      //规则标志
      rulesFlag:{
        typeof:String,
        default:""
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

      //是否显示输入功能
      showSearch:{
        typeof:Boolean,
        default:false
      }

    },
    model:{
      event:"change",
      prop:'value'
    },
    computed:{
      select:{
        get(){
          return this.value
        },

        set(val){
         this.$emit("change",val)
        }
      },

      rulesType(){
        switch(this.rulesFlag){
          case "ID":
            return [{ validator: fjRegexRules.checkiDentifyNumber , trigger: 'change' }]
          case "NAME":
            return [{ validator: fjRegexRules.checkName , trigger: 'change' }]
          case "TELE":
            return [{ validator: fjRegexRules.checkTelephone , trigger: 'change' }]
          // case "name":
          //   return [{ validator: fjRegexRules.checkName , trigger: 'blur' }]
          default:
            return []
        }
      },

      //输入比较那些不可以点击
      optionLists(){
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

        let list = newList.filter((item)=>{
          return item.label.indexOf(this.searchValue)!=-1
        })

        return list
        
      }

    },
    data(){
      return{
        searchValue:'',
      }
    }
};
</script>
<style >
.el-select-dropdown{
  padding: 5px;
}
</style>