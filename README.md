# vue-cli@3 请前往 [bz-cli vue](https://github.com/BozhongFE/bz-cli/wiki/bz-vue)
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

打包到source的项目：assets/img/share目录下的图片将自动复制到对应目录下


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
|#|v0.3.1|20190423| 去除打包后的sourceMap/修复插件CopyShareImg对BundleAnalyzerPlugin的影响
|#|v0.4.0|20190806| 新增 vue-routers history 模式，优化动态加载 js 的脚本
|#|v0.4.1|20190819| 更新 less 版本为3.9.0（fix Class constructor FileManager cannot be invoked without 'new'）


### Vue-Router History Mode

当前域名启用 history mode

```conf
# source.xxx.com
location /activity/wiki/ {
  try_files $uri $uri/ /activity/wiki/index.html;
}
```

代理跨域名，除了需要配置上面的，还需要再另外的域名配置下面，如：

```conf
# m.xxxx.com
location ^~ /wiki/ {
  proxy_set_header Host source.xxxx.com;
  include proxy_params;
  proxy_pass https://127.0.0.1/activity/wiki/;
}
```
