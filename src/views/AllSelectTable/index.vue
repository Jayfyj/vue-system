<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 选中所有表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-check" @click="handleSearch"
          >输出选中数据</el-button
        >
      </div>

      <el-table
        :data="tableData.value"
        border
        class="table"
        ref="multipleTable"
        row-key="id"
      >
        <el-table-column width="55" :render-header="renderProductId">
          <template slot-scope="scope">
            <el-checkbox
              :value="scope.row.checked"
              @change="changCheck(scope.row)"
            ></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column label="账户余额">
          <template slot-scope="scope">￥{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.state === '成功'
                  ? 'success'
                  : scope.row.state === '失败'
                  ? 'danger'
                  : ''
              "
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column prop="date" label="注册时间"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.value.pageIndex"
          :page-size="query.value.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { tableDataUrl, tabjsonUrl } from './api'
import { ref, reactive, onMounted } from '@vue/composition-api'

export default {
  name: 'AllSelectTable',
  setup() {
    //请求参数
    let query = reactive({
      value: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      }
    })

    //数组
    let tableData = reactive({ value: [] })

    //选终的数组
    let multipleSelection = reactive({ value: [] })

    //请求的总页数
    let pageTotal = ref(0)

    //全选勾选
    let checked = ref(false)

    //勾选的状态
    let indeterminate = ref(false)

    //请求方式
    const getData = async (val) => {
      let result = ''
      tableData.value = []
      if (val === 2) {
        result = await tabjsonUrl(query.value)
      } else {
        result = await tableDataUrl(query.value)
      }
      let { list, total } = result
      if (!checked.value) {
        if (multipleSelection.value.length > 0) {
          multipleSelection.value.forEach((ele) => {
            list.forEach((eles) => {
              if (eles.id === ele) {
                eles.checked = true
                return
              }
            })
          })
        }
      } else {
        list.forEach((eles) => {
          eles.checked = true
        })
      }

      tableData.value = list
      pageTotal.value = total || 50
    }

    //渲染表头
    function renderProductId(createElement) {
      return createElement('el-checkbox', {
        // style: 'margin-left: 5px;',
        on: {
          change: change
        },
        props: {
          value: checked.value,
          indeterminate: indeterminate.value
        }
      })
    }

    //全选勾选
    function change(val) {
      let value = val
      if (val) {
        value = true
        multipleSelection.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else {
        value = false
        multipleSelection.value = []
      }
      checked.value = value
      indeterminate.value = false
      let list = JSON.parse(JSON.stringify(tableData.value))
      tableData.value = []
      list.forEach((eles) => {
        eles.checked = value
      })
      tableData.value = list
    }

    //列表勾选
    function changCheck(row) {
      let { id } = row
      if (multipleSelection.value.indexOf(id) === -1) {
        row.checked = true
        multipleSelection.value.push(id)
      } else {
        row.checked = false
        let index = multipleSelection.value.indexOf(id)
        multipleSelection.value.splice(index, 1)
      }

      if (multipleSelection.value.length === pageTotal.value) {
        checked.value = true
        indeterminate.value = false
      } else if (multipleSelection.value.length > 0) {
        indeterminate.value = true
        checked.value = false
      } else {
        checked.value = false
        indeterminate.value = false
      }
    }

    // 触发搜索按钮
    function handleSearch() {
      console.log(multipleSelection.value)
    }

    // 分页导航
    function handlePageChange(val) {
      getData(val)
    }

    onMounted(() => {
      getData()
    })

    return {
      query,
      tableData,
      multipleSelection,
      pageTotal,
      checked,
      indeterminate,
      renderProductId,
      change,
      changCheck,
      handleSearch,
      handlePageChange
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

/* .el-table /deep/.disabledCheck .cell .el-checkbox__inner {
  display: none !important;
}

.el-table /deep/.disabledCheck .cell:before {
  content: '';

  position: absolute;

  right: 11px;
} */
</style>
