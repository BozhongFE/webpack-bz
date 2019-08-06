
const {
  printMessage,
} = require('./utils');

module.exports = {
  helpers: {
    if_or (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    if_and (v1, v2, options) {
      if (v1 && v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      label: 'Project name'
    },
    description: {
      type: 'string',
      required: true,
      label: 'Project description',
      default: 'A Vue.js project'
    },
    author: {
      type: 'string',
      label: 'Author'
    },
    license: {
      type: 'string',
      label: 'License',
      default: 'MIT'
    },
    less: {
       type: 'confirm',
       message: 'Use less?',
       default: false
    },
    router: {
      type: 'confirm',
      message: 'Install vue-router?',
      default: false
    },
    vuex: {
      type: 'confirm',
      message: 'Install vuex?',
      default: false
    },
    htmlwebpackPlugin: {
      type: 'confirm',
      message: 'Use html-webpack-plugin?',
      default: false
    },
    routerHistory: {
      when: 'router && htmlwebpackPlugin',
      type: 'confirm',
      message: 'Use vue-router history mode?',
      default: false
    },
    redirected: {
      when: 'htmlwebpackPlugin',
      type: 'confirm',
      message: 'Will be redirected?',
      default: false
    },
    source: {
      type: 'confirm',
      message: 'output to source repository?',
      default: false
    },
  },
  filters: {
    'src/index.html': 'htmlwebpackPlugin',
    'index.html': '!htmlwebpackPlugin',
    'src/vuex/**/*': 'vuex',
    'src/router/**/*': 'router',
    'src/router/history.js': 'htmlwebpackPlugin && routerHistory',
    'src/page/404.vue': 'router',
    'src/page/sitemap.vue': 'router',
    'src/page/home/components/nav.vue': 'router',
    'src/vendor.js': 'htmlwebpackPlugin',
    'bz.config.js': 'source || (htmlwebpackPlugin && routerHistory)',
  },
  complete(data) {
    let tips = '';
    if (data.inPlace) {
      tips += '\n   To get started:\n\n     npm install\n     npm run dev';
    } else {
      tips += `\n   To get started:\n\n     cd ${data.destDirName}\n     npm install\n     npm run dev\n`
    }
    if (data.source) tips += '\n     check ./bz.config.js projectPath';
    if (data.routerHistory) tips += '\n     check ./bz.config.js publicPath';
    if (data.source) tips += '\n     wechat share img: ./src/assets/img/share/xxx';
    
    console.log(tips)
  }
}
