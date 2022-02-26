# vue-manage-system

####

####

####

####

#### 开发

# 1)

开发页面的时候类似开发小程序，例如:在对应的页面的 views 文件夹，
新建 home 文件夹，里面新建 api.js(接口文件),.vue 文件(组件页面),route.js(路由文件)

# 2)

reactive 声明的响应式对象被 arr 代理，操作代理对象需要有代理对象的前缀，直接覆盖会丢失响应式，
所以，vue3 使用 proxy，对于对象和数组都不能直接整个赋值 需要这样：对象添加一个属性再赋值
let formValue = reactive({ value: {} })
let arr = reactive({ value: [] })

# 3)

使用美化插件，(在 vscode 下载插件，Prettier - Code formatter)，
配置步骤：

（1）在根目录创建.prettierrc 文件，里面内容，本次项目添加(百度自己了解，按照自己要求添加):
{
"semi": false,  
 "singleQuote": true,  
 "trailingComma": "none",
"bracketSpacing": true  
}

（2）在文件 -> 首选择 -> 设置 -> 文本编译器 -> 格式化 -> 勾选 Format On Save

（3）在随意一个.vue 的文件，右键选择使用...格式化文档，然后选择配置默认格式化程序，然后选择 Prettier - Code formatter

注意:以为在开发移动端的时候(PC 端可以忽略),，不想 px 转化 rem，会写成大写 PX，但是因为使用了美化插件，也会将 PX 转化 px，所以为了不转化，需要配置 setting.json,
配置步骤:

(1)在文件 -> 首选择 -> 设置 ,选择右上边的文件图标，一般都是第一个图标，

（2）打开 setting.json 文件，在里面添加内容（这样 PX 不会转化了）:
{
"vetur.format.defaultFormatter.css": "none",
"vetur.format.defaultFormatter.scss": "none",
"vetur.format.defaultFormatter.less": "none",
"[vue]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
}

# 4)

在设置 mock 数据的时候，接口名字不用相同，就是一个接口比较长，短的接口刚好完全和长的一部分重合，
就不会请求长的接口，例如：

短的接口：/sever/table，
长的接口：/sever/tablejson （不会请求到，因为和短的重合）

# 5)

因为还是使用 vue-router4.0 以下 的路由配合组合 API，如果需要路由进行响应操作，所以也要将路由赋予响应模式，进行操作,例如：

import router from '@/router'
setup() {

    //设置变量用于路由赋值,用于监听路由变化
    let routers = reactive({ value: router })

    //监听路由变化
    watch(
      () => routers.value.currentRoute,
      (val) => {
        //要执行的方法
        setTags(val)
      }
    )

}

####

####

####

####

#### 遇到问题

# 1)

compression-webpack-plugin 插件问题:

报错：TypeError: Cannot read property ‘tapPromise‘ of undefined
解决：先执行卸载命令->npm uninstall compression-webpack-plugin，执行安装命令->npm i compression-webpack-plugin@5.0.1

####

####

#### 使用 git 的小乌龟上传代码问题

# 1）

因为是使用 ssh，进行代买的管理，所以需要对可视化工具进行操作配置 ssh client，步骤：

1.打开工具的 setting，选择 netWork 选项，

2.在 ssh client 填入 git 的 '安装地址\user\bin\ssh.exe',我这里是‘D:\Program Files\Git\usr\bin\ssh.exe’
