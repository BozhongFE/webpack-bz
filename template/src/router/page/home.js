import 'es6-promise/auto';

const home = () => import(/* webpackChunkName: "home" */ 'src/page/home/index.vue');

export default {
  path: '/',
  name: 'home',
  component: home,
  meta: {
    title: '首页',
    // keepAlive: true, // 开启缓存
  },
}