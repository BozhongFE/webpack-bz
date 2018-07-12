import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
  routes,
});

Vue.use(VueRouter);

router.beforeEach((to, form, next) => {
  if (to.meta && to.meta.title) document.title = to.meta.title;
  return next();
});

export default router;
