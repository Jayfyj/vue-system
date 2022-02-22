<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <fj-select2 multiple
                      isShowSearch
                      :optionList='optionList'
                      :disOptionList="disOptionList"
                      v-model="value" />

          <template v-for="(item,index) in formList">
            <template v-if="item.type==='inp'">
              <fj-input v-model="form[item.prop]"
                        :prop="item.prop"
                        :label="item.label"
                        :rulesFlag='item.rulesFlag' />
            </template>
            <template v-if="item.type==='sel'">
              <fj-select v-model="form[item.prop]"
                         :prop="item.prop"
                         :label="item.label"
                         :rulesFlag='item.rulesFlag'
                         :optionList="optionList"
                         :disOptionList="disOptionList"
                         :showSearch='true'
                         multiple />
            </template>

            <template v-if="item.type==='dates'">
              <fj-dates :startDate.sync="form[item.startProp]"
                        :endDate.sync="form[item.endProp]"
                        :startProp="item.startProp"
                        :endProp="item.endProp"
                        :startLabel="item.startLabel"
                        :endLabel="item.endLabel"
                        @getStartDateType="getDateType($event,'start')"
                        @getEndDateType="getDateType($event,'end')"
                        format="yyyy-MM-dd"
                        value-format-return="yyyyMMdd" />
            </template>
          </template>
          <el-form-item>
            <fj-pagination />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import fjRegexRule from '../fjComponents/fjRegexRule'
import { fjInput, fjSelect, fjDates, fjSelect2, fjPagination } from '../fjComponents'
export default {
  name: 'formtest',
  components: {
    fjInput,
    fjSelect,
    fjDates,
    fjPagination,
    fjSelect2
  },
  mounted () {
    setTimeout(() => {
      this.optionList = [
        { label: "区域一", value: "1" },
        { label: "区域二", value: "2" },
        { label: "区域三", value: "3" },
        { label: "区域四", value: "4" },
        { label: "区域五", value: "5" }
      ]
      this.disOptionList = [
        { label: "区域一", value: "1" },
        { label: "区域二", value: "2" },
      ]

      this.value = ['3']
    }, 2000)
  },
  data () {
    // var aaaa = (rule, value, callback) => {
    //     console.log(value === this)
    //     var str = value;
    //     if (str == "222") {
    //         callback(new Error("请输入姓名111"));
    //     } else {
    //         callback()
    //     }
    // };
    return {
      value: ['3'],
      // rule:[
      //   {required:true, message: '请填写活动形式' , trigger: 'blur' },
      //   { validator:aaaa.bind(this.form) , trigger: 'blur' }
      //   ],
      formList: [
        { type: 'inp', prop: 'name', rulesFlag: 'NAME', label: "姓名" },
        { type: 'sel', prop: 'region', label: "区域" },
        { type: 'dates', startProp: 'startDate', endProp: 'endDate', startLabel: "开始日期", endLabel: "结束日期" },
      ],

      optionList: [],
      disOptionList: [],
      form: {
        name: '我',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        type: ['步步高'],
        resource: '小天才',
        desc: '',
        options: [],
        startDate: "2021-08-09",
        endDate: "2021-08-31",
        aaa: "777"
      }
    };
  },
  methods: {

    submitForm (formName) {
      console.log(this.value)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          console.log(this.form)
          // console.log(this.form.endDate)
          // console.log(this.form.startDate)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();

    },



    getDateType (val, option) {
      if (option === "start") {
        this.form.startDate = val
      } else {
        this.form.endDate = val
      }

    }


  }
};
</script>