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
      <!-- <el-checkbox :checked="checked" :indeterminate="indeterminate" @change="change"></el-checkbox> -->

      <el-table
        :data="tableData"
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
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { tableData, table } from './api'
export default {
  name: 'basetable',
  data() {
    return {
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      checked: false,
      indeterminate: false
    }
  },
  created() {
    this.getData()
    table().then((res) => {
      console.log(res)
    })
  },
  mounted() {},
  methods: {
    //在渲染表头的时候，会调用此方法，h为createElement的缩写版  添加on.change事件即可
    renderProductId(createElement) {
      return createElement('el-checkbox', {
        // style: 'margin-left: 5px;',
        on: {
          change: this.change
        },
        props: {
          value: this.checked,
          indeterminate: this.indeterminate
        }
      })
    },
    change(val) {
      let value = val
      if (val) {
        value = true
        this.multipleSelection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      } else {
        value = false
        this.multipleSelection = []
      }
      this.checked = value
      this.indeterminate = false
      this.tableData
      let list = JSON.parse(JSON.stringify(this.tableData))
      this.tableData = []
      list.forEach((eles) => {
        eles.checked = value
        // this.$set(eles, 'checked', val);
      })
      this.tableData = list
    },
    // 获取 easy-mock 的模拟数据
    async getData(val) {
      let result = ''
      this.tableData = []
      if (val === 2) {
        result = await table(this.query)
      } else {
        result = await tableData(this.query)
      }
      let { list, pageTotal } = result
      if (!this.checked) {
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach((ele) => {
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

      this.tableData = list
      this.pageTotal = pageTotal || 50
    },

    changCheck(row) {
      let { id } = row
      if (this.multipleSelection.indexOf(id) === -1) {
        row.checked = true
        this.multipleSelection.push(id)
      } else {
        row.checked = false
        let index = this.multipleSelection.indexOf(id)
        this.multipleSelection.splice(index, 1)
      }

      if (this.multipleSelection.length === this.pageTotal) {
        this.checked = true
        this.indeterminate = false
      } else if (this.multipleSelection.length > 0) {
        this.indeterminate = true
        this.checked = false
      } else {
        this.checked = false
        this.indeterminate = false
      }
    },
    // 触发搜索按钮
    handleSearch() {
      console.log(this.multipleSelection)
    },

    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val)
      this.getData(val)
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

.el-table /deep/.disabledCheck .cell .el-checkbox__inner {
  display: none !important;
}

.el-table /deep/.disabledCheck .cell:before {
  content: '';

  /* position: absolute; */

  /* right: 11px; */
}
</style>
