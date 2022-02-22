<template>
    <div>
      <el-form-item v-bind="$attrs" :rules="[...rules,...addrules,...rulesType]">
        <el-input v-model="input" v-on="{...$listeners}" v-bind="$attrs"></el-input>
      </el-form-item>
    </div>
</template>

<script>
import fjRegexRules  from '../fjRegexRule'
export default {
    name: 'fjInput',
    props:{
      value:{
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

      //添加错误提示
      errorMessage:{
        typeof:String,
        default:"请输入规定要求格式"
      },

    },
    model:{
      event:"input",
      prop:'value'
    },
    computed:{
      input:{
        get(){
          return this.value
        },

        set(val){
         this.$emit("input",val)
        }
      },

      rulesType(){
        switch(this.rulesFlag){
          case "ID":
            return [{ required:true, validator: fjRegexRules.checkiDentifyNumber(this.errorMessage) , trigger: 'blur' }]
          case "NAME":
            return [
              { required:true, validator: fjRegexRules.checkName(this.errorMessage) , trigger: 'blur' }
            ]
          case "TELE":
            return [{ required:true, validator: fjRegexRules.checkTelephone(this.errorMessage) , trigger: 'blur' }]
          // case "name":
          //   return [{ validator: fjRegexRules.checkName , trigger: 'blur' }]
          default:
            return []
        }
      }

    },
};
</script>