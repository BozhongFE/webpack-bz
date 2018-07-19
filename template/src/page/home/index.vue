<template>
  <div id="home">
    <!-- html内引入资源带~ -->
    <img src="~src/assets/img/logo.png">
    <h1>\{{ msg }}</h1>{{#router}}
    <home-nav></home-nav>{{/router}}
  </div>
</template>

<script>{{#vuex}}
import { mapGetters } from 'vuex';{{/vuex}}{{#router}}
import HomeNav from './components/nav.vue';{{/router}}

export default {
  data() {
    return { {{#if_eq vuex false}}
      msg: 'Welcome to Your Vue.js App',{{/if_eq}}
    };
  },{{#router}}
  components: {
    HomeNav,
  },{{/router}}{{#vuex}}
  computed: {
    ...mapGetters({
      msg: 'home/msg',
    }),
  },{{/vuex}}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style{{#less}} lang="less"{{/less}}>
#home {
  text-align: center;
  margin-top: 60px;
}
</style>
