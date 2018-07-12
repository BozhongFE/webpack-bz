<template>
  <div id="app">{{#router}}
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>{{/router}}{{#if_eq router false}}
    <home></home>{{/if_eq}}
  </div>
</template>

<script>{{#if_eq router false}}
import home from './page/home/index.vue';{{/if_eq}}

export default {
  name: 'app',
  data() {
    return {
    };
  },{{#if_eq router false}}
  components: {
    home,
  },{{/if_eq}}
};
</script>

<style{{#less}} lang="less"{{/less}}>
@import './assets/css/reset.css';
</style>
