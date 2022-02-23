# vue-manage-system

## 开发问题

1.在设置 mock 数据的时候，接口名字不用相同，就是一个接口比较长，
短的接口刚好完全和长的一部分重合，就不会请求长的接口，列入
短的接口：/sever/table  
长的接口：/sever/tablejson （不会请求到，因为和短的重合）
