<template>
  <div class="sitemap">
    <p>站点地图</p>
    <ul>
      <li v-for="(r, i) in routes" :key="i" v-if="r.name">
        <router-link tag="a" :to="r.path">\{{r.meta && r.meta.title ? r.meta.title : r.name}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import routes from 'src/router';
  
  export default {
    data() {
      return {
        routes: routes.options.routes,
      };
    },
  };
</script>
<style scoped>
.sitemap {
  padding: 20px;
}
.sitemap > p {
  padding-bottom: 10px;
}
.sitemap li {
  padding: 5px 10px;
}
.sitemap li a {
  text-decoration: underline;
  color: #42b983;
}
</style>

