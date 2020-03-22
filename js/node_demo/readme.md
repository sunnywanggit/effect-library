#### node.js 搭建服务器初探

##### 目录结构

```
static
  |-css
  |   |-style.css
  |-images
  |   |-panda1.jpeg
  |-js
  |   |-b.js
  |-index.html
  |-server.js
    
```
##### 请求路由
1. /submit post 请求，返回 html ,包含提交表单内容
2. 其他请求， static目录下静态文件内容直接返回

#### 运行
`node server.js`