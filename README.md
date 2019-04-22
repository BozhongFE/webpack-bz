# BozhongFE/webpack-bz

### Usage

This is a project template.

``` bash
$ npm install -g vue-cli
$ vue init BozhongFE/webpack-bz my-project
// or $ vue init BozhongFE/webpack-bz#v0.2.0 my-project
$ cd my-project
$ npm install
$ npm run dev
```

### 分享图复制

打包到source的项目：src/img/share目录下的图片将自动复制到对应目录下


### What's Included

- `npm run dev`: Webpack + `vue-loader` with proper config for source maps & hot-reload.

- `npm run build`: build with HTML/CSS/JS minification.

### Reference

[播种前端-vue统一目录结构](http://blog.work.bzdev.net/2018/03/30/vue-directory-structure/#more)

### HISTORY

|#|标签|日期|开发内容|
|---|---|---|---|
|#|v0.1.0|20180712| 可选择性安装vuex/vue-router 内置.eslintrc等
|#|v0.2.0|20180713| 开发环境自动匹配本机ip，port写定8000
|#|v0.2.0|20180716| 修正重定向项目用ip访问被判断为生产环境bug
|#|v0.2.1|20180719| 内置函数bug修复/静态图片文件夹名调整
|#|v0.3.0|20190422| 新增分享图自动复制/bzConfig引入/打包的静态html去掉多余代码
