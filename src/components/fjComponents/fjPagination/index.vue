<template>
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
  </div>
</template>

<script>
export default {
    name: 'fjPagination',
    props:{
      value:{
        default:""
      },
    },
    data(){
      return{
        currentPage4: 4,
        paginationShow:true,
        pageSize:100
      }
    },

    methods: {
      handleSizeChange(val) {
        
        this.pageSize = val;

        let pageMax = Math.ceil(400/this.pageSize)

        if(this.currentPage4>pageMax){
          this.currentPage4  = pageMax
        }
        console.log(this.currentPage4,this.pageSize)

       
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage4 = val
        console.log(this.currentPage4,this.pageSize)
      }
    },
};
</script>