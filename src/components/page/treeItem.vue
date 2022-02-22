<!--
 * @Description: nav侧边栏
 * @Version: 1.0
 * @Autor: Nanke_南柯
 * @Date: 2020-09-03 17:22:19
 * @LastEditors: Nanke_南柯
 * @LastEditTime: 2020-09-19 15:55:27
-->
<template>
      <ul class="tab-nav" v-if="flag">   
        <li v-for="(i, index) in navList" :key="index" style="margin-top:10px">
            <div class="nav" @click="openNav(i,index, i.list)" 
            :style="{color:aa===i.name?'pink':''}"
            >
                <i class="el-icon-s-home"></i>
                <span>{{ i.title }}</span>
                <i v-if="i.list" id="right-btn" class="el-icon-arrow-right"></i>
            </div>
            <!-- <div class="nav-n-box"> -->
         
            <tree-item :navList = "i.list" v-if="aa===i.name"/>
        
  
        </li>
      </ul>
</template>

<script>
export default {
    name:"treeItem",
    components: {},
    props: {
      navList:{
        type:Array,
        default:()=>{
          return []
        }
      }
    },
    data() {
        return {
          aa:"BusinessIntroduction3",
          flag:true 
        };
    },
    watch: {},
    computed: {},
    methods: {
        openNav(item,index, num) {
          this.flag = false;
          console.log(item,index,num)
          this.aa = item.name
          this.flag = true;
            // let _this = this;
            // let nav = document.querySelectorAll('.nav'); //获取父级菜单栏，以便添加选中样式
            // let items = document.querySelectorAll('.nav-n-box'); //获取容纳子级菜单栏的容器，以便动态设置高度，实现下拉效果

            // //-----------------可注释部分开始------注释后则不是手风琴效果------------------
            // // 遍历菜单栏，移除所有选中后的样式   添加此段可实现手风琴效果，注释则实现多展示效果
            // for (let i = 0; i < nav.length; i++) {
            //     if (
            //         items[i].style.height == '' ||
            //         items[i].style.height == '0rem' ||
            //         nav[index].classList.contains('nav-n-box-active') //判断标签内是否含有该class属性，以布尔值类型返回
            //     ) {
            //         let height = items[index].style.height;
            //         items[index].style.height = height;
            //     } else {
            //         items[i].style.height = '0rem';
            //     }
            //     nav[i].classList.remove('nav-n-box-active');
            // }
            // //-----------------可注释部分结束------------------------

            // //根据子菜单栏的高度判断，是否展开菜单栏，若有进行遍历操作，那么每次点击某个菜单栏的时候 height 都为 0
            // if (items[index].style.height == '' || items[index].style.height == '0rem') {
            //     //num 为子菜单栏的个数，根据子菜单栏确定容器的高度
            //     items[index].style.height = num * 2 + 'rem';
            //     //添加右箭头旋转样式
            //     nav[index].classList.add('nav-n-box-active');
            // } else {
            //     items[index].style.height = '0rem';
            //     //移除右箭头旋转样式
            //     nav[index].classList.remove('nav-n-box-active');
            // }
            // //------------------------------------------
        },
    },
    created() {},
    mounted() {},
};
</script>
<style lang="scss" scoped>

.tab-nav{
  margin: 10px 30px 0;
  list-style: none;
  cursor: pointer; 
}
.nav{
  &:hover{
    background: paleturquoise;
    color: white;
  }
}
 .a {
  display: none;
 }
  .b {
  display: block;
  
  }
    
</style>