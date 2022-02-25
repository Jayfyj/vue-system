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
        <el-form ref="formRef" :model="form.value" label-width="80px">
          <fj-select2
            multiple
            isShowSearch
            :optionList="optionList.value"
            :disOptionList="disOptionList.value"
            v-model="value.value"
          />

          <template v-for="(item, index) in formList.value">
            <template v-if="item.type === 'inp'">
              <fj-input
                :key="index"
                v-model="form.value[item.prop]"
                :prop="item.prop"
                :label="item.label"
                :rulesFlag="item.rulesFlag"
              />
            </template>
            <template v-if="item.type === 'sel'">
              <fj-select
                :key="index"
                v-model="form.value[item.prop]"
                :prop="item.prop"
                :label="item.label"
                :rulesFlag="item.rulesFlag"
                :optionList="optionList.value"
                :disOptionList="disOptionList.value"
                :showSearch="true"
                multiple
              />
            </template>

            <template v-if="item.type === 'dates'">
              <fj-dates
                :key="index"
                :startDate.sync="form.value[item.startProp]"
                :endDate.sync="form.value[item.endProp]"
                :startProp="item.startProp"
                :endProp="item.endProp"
                :startLabel="item.startLabel"
                :endLabel="item.endLabel"
                @getStartDateType="getDateType($event, 'start')"
                @getEndDateType="getDateType($event, 'end')"
                format="yyyy-MM-dd"
                value-format-return="yyyyMMdd"
              />
            </template>
          </template>
          <el-form-item>
            <fj-pagination />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import fjRegexRule from '@/components/fjComponents/fjRegexRule'
import {
  fjInput,
  fjSelect,
  fjDates,
  fjSelect2,
  fjPagination
} from '@/components/fjComponents'

import { ref, reactive, onMounted } from '@vue/composition-api'

export default {
  name: 'FormTest',
  components: {
    fjInput,
    fjSelect,
    fjDates,
    fjPagination,
    fjSelect2
  },
  setup() {
    let value = reactive({ value: [] })

    let formList = reactive({
      value: [
        { type: 'inp', prop: 'name', rulesFlag: 'NAME', label: '姓名' },
        { type: 'sel', prop: 'region', label: '区域' },
        {
          type: 'dates',
          startProp: 'startDate',
          endProp: 'endDate',
          startLabel: '开始日期',
          endLabel: '结束日期'
        }
      ]
    })

    let optionList = reactive({ value: [] })

    let disOptionList = reactive({ value: [] })

    let form = reactive({
      value: {
        name: '我',
        region: '',
        resource: '小天才',
        startDate: '2021-08-09',
        endDate: '2021-08-31'
      }
    })

    let formRef = ref(null)

    onMounted(() => {
      setTimeout(() => {
        optionList.value = [
          { label: '区域一', value: '1' },
          { label: '区域二', value: '2' },
          { label: '区域三', value: '3' },
          { label: '区域四', value: '4' },
          { label: '区域五', value: '5' }
        ]
        disOptionList.value = [
          { label: '区域一', value: '1' },
          { label: '区域二', value: '2' }
        ]

        value.value = ['3']
      }, 2000)
    })

    function submitForm(formName) {
      formRef.value.validate((valid) => {
        if (valid) {
          alert('submit!')
          console.log(form.value)
          // console.log(this.form.endDate)
          // console.log(this.form.startDate)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    function resetForm(formName) {
      formRef.value.resetFields()
    }

    function getDateType(val, option) {
      if (option === 'start') {
        form.value.startDate = val
      } else {
        form.value.endDate = val
      }
    }

    return {
      value,
      formList,
      optionList,
      disOptionList,
      form,
      formRef,
      submitForm,
      resetForm,
      getDateType
    }
  }
}
</script>
