import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';{{#routerHistory}}
import history from './history';

const router = new VueRouter(history.transformBefore({
  routes,
  mode: 'history',
  // 外链访问的路径，publicPath 在 webpack 中配置
  base: publicPath,
}));{{else}}
const router = new VueRouter({
  routes,
});{{/routerHistory}}

Vue.use(VueRouter);

router.beforeEach((to, form, next) => {
  if (to.meta && to.meta.title) document.title = to.meta.title;
  return next();
});

export default router;
