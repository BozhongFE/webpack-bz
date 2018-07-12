import 'es6-promise/auto';
import Vue from 'vue';
import App from './App.vue';{{#router}}
import router from './router';{{/router}}{{#vuex}}
import store from './vuex';{{/vuex}}
import './assets/js';

new Vue({
  el: '#app',{{#router}}
  router,{{/router}}{{#vuex}}
  store,{{/vuex}}
  components: {
    App,
  },
  template: '<app></app>',
});
