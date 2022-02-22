<template>
      
    <el-row>
        <el-col :span="12">
            <el-form-item v-bind="$attrs" 
              :label= "startLabel"
              :prop="startProp"
              :rules="[...rules,...addrules,...rulesType]"
            >
              <el-date-picker
                v-model="start"
                v-on="{...$listeners}" 
                v-bind="$attrs"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item v-bind="$attrs" 
              :label= "endLabel"
              :prop="endProp"
              :rules="[...rules,...addrules,...rulesType]"
            >
              <el-date-picker
                v-model="end"
                v-on="{...$listeners}" 
                v-bind="$attrs"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
        </el-col>
    </el-row>
      
</template>

<script>
import fjRegexRules  from '../fjRegexRule'
export default {
    name: 'fjDates',
    props:{
      startDate:{
        default:undefined
      },

      endDate:{
        default:undefined
      },

      //日期属性
      startProp:{
        typeof:String,
        default:""
      },

      //日期属性
      endProp:{
        typeof:String,
        default:""
      },
      
      //日期标题
      startLabel:{
        typeof:String,
        default:"开始日期"
      },

      //日期标题
      endLabel:{
        typeof:String,
        default:"结束日期"
      },

      //返回时间格式
      valueFormatReturn:{
        typeof:String,
        default:"yyyyMMdd"
      },

      //规则
      rules:{
        typeof:Array,
        default:()=>[
          {  required: true, message: '请选择日期', trigger: 'change' }
        ]
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

    },
    // model:{
    //   event:"change",
    //   prop:'value'
    // },
    computed:{
      end:{
        get(){
          let str = this.endDate

          if(str){
            if(Number(str)==str){
              str = `${str.substr(0,4)}-${str.substr(4,2)}-${str.substr(6,2)}`
            }
            this.$emit('getEndDateType',this.getDateType(str))
          }
          
        
          return str
        },

        set(val){
          this.$emit('update:endDate',val)
          if(val === null){
            this.$emit('getEndDateType',null)
          }else{
            this.$emit('getEndDateType',this.getDateType(val))
          }
        }
      },

      start:{
        get(){
          let str = this.startDate

          if(str){
            if(Number(str)==str){
              str = `${str.substr(0,4)}-${str.substr(4,2)}-${str.substr(6,2)}`
            }
            this.$emit('getStartDateType',this.getDateType(str))
          }
          
          return str
        },

        set(val){
          this.$emit('update:startDate',val)
          if(val === null){
            this.$emit('getStartDateType',null)
          }else{
            this.$emit('getStartDateType',this.getDateType(val))
          }
          
        }
      },

      rulesType(){
        switch(this.rulesFlag){
          case "ID":
            return [{ validator: fjRegexRules.checkiDentifyNumber , trigger: 'blur' }]
          case "NAME":
            return [{ validator: fjRegexRules.checkName , trigger: 'blur' }]
          case "TELE":
            return [{ validator: fjRegexRules.checkTelephone , trigger: 'blur' }]
          // case "name":
          //   return [{ validator: fjRegexRules.checkName , trigger: 'blur' }]
          default:
            return []
        }
      },

    },
    data(){
      return{
        
        //返回的开始日期
        returnStartDate:undefined,
        //返回的结束日期
        returnEndDate:undefined,

        pickerOptions1: {
            disabledDate: (time) =>{
                if (this.end != null && this.end != "") {
                    // console.log(time.getTime())
                    var end = new Date(this.end)
                    return time.getTime() > end;
                } 
                else {
                    return false;
                }
            }
        },
        pickerOptions2: {
            disabledDate:(time)=>{
                if (this.start != null && this.start != "") {
                  var start = new Date(this.start)
                  return time.getTime() < start;
                } else {
                  return false;
                }
            }
        }
      }
    },
    methods:{

      getDateType(val){
        let date = new Date(val);

        let yyyy = date.getFullYear().toString();

        let MM = date.getMonth() + 1;

        let dd = date.getDate();

        if(MM<10){
          MM = "0" + MM
        }

        if(dd<10){
          dd = "0" + dd
        }

        let dateVal = ''

        if(this.valueFormatReturn==="yyyy-MM-dd"){
          dateVal = `${yyyy}-${MM}-${dd}`
        }else if(this.valueFormatReturn==="yyyyMMdd"){
          dateVal = `${yyyy}${MM}${dd}`
        }else if(this.valueFormatReturn==="yyyy/MM/dd"){
          dateVal = `${yyyy}/${MM}/${dd}`
        }

        return dateVal
      },

    }
};
</script>