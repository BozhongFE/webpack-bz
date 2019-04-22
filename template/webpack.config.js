const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const address = require('address');{{#htmlwebpackPlugin}}
const HtmlWebpackPlugin = require('html-webpack-plugin');{{/htmlwebpackPlugin}}{{#less}}
const autoprefixer = require('autoprefixer');{{/less}}{{#source}}
const shell = require('shelljs');
const fs = require('fs');

const sourcePath = process.env.npm_config_source;

if (typeof sourcePath === 'undefined') {
  console.log('请先配置打包输出的source根目录');
  console.log('Example: npm config set source "D:\\source"');
  throw new Error('没有配置模块路径');
} else if (!fs.existsSync(sourcePath)) {
  throw new Error('source根目录不存在，请检查配置的source根目录是否正确');
}
// 按项目路径修改打包输出的路径_filePath，如activity/health，_filepath改成'./activity/health'
const outputPath = path.resolve(sourcePath, '_filePath');
// 将分享图复制到输出目录
class CopyShareImg {
  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      console.log('开始将分享图复制到输出目录');
      
      fs.exists(path.resolve(__dirname, './src/assets/img/share'), (exists) => {
        if (!exists) return console.log('分享源图目录不存在');
        shell.cp('-R', path.resolve(__dirname, './src/assets/img/share'), path.resolve(outputPath, './share'));
        console.log(`分享图已复制到${path.resolve(outputPath, './share')}`);
      });
    });
  }
};{{/source}}

// 获取ip
const getAddressIP = () => {
  let lanUrlForConfig = address.ip();
  if (!/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanUrlForConfig)) {
    lanUrlForConfig = undefined;
  }
  return lanUrlForConfig;
}

module.exports = { {{#if_eq htmlwebpackPlugin false}}
  entry: './src/main.js',{{/if_eq}}{{#htmlwebpackPlugin}}
  entry: {
    main: './src/main.js',
    vendor: './src/vendor.js'
  },{{/htmlwebpackPlugin}}
  output: { {{#source}}
    // 按项目路径修改打包输出的路径_filePath，如activity/health，_filepath改成'./activity/health'
    path: outputPath,{{/source}}
    {{#if_eq source false}}
    path: path.resolve(__dirname, './dist'),
    {{/if_eq}}{{#if_eq htmlwebpackPlugin false}}publicPath: '/dist/',
    filename: 'build.js',
    {{/if_eq}}{{#htmlwebpackPlugin}}
    filename: process.env.NODE_ENV === 'production' ? '[name].js?[chunkhash]' : '[name].js',
    {{/htmlwebpackPlugin}}chunkFilename: '[id].js?[chunkhash]',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          {{#less}}
          postcss: [autoprefixer({
            browsers: ['iOS >= 8', 'Android >= 4.1'],
          })],
          {{/less}}
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {{#less}}
      // 需单独打包↓↓
      // {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use:[
      //       'css-loader?-autoprefixer',
      //       'less-loader',
      //     ],
      //   }),
      // },
      {{/less}}
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 12 * 1024,
          name: './images/[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      src: path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: getAddressIP() || '0.0.0.0',
    port: 8000,
    disableHostCheck: true,
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',{{#htmlwebpackPlugin}}
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),{{#if_eq redirected false}}
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['main', 'manifest', 'vendor'],
      bzConfigPath: 'https://scdn.bozhong.com/source/common/js/config.js',
      nodeEnv: process.env.NODE_ENV,
    }),{{/if_eq}}
  ]{{/htmlwebpackPlugin}}
}

if (process.env.NODE_ENV !== 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FriendlyErrorsPlugin(),
    {{#if_and htmlwebpackPlugin redirected}}
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['main', 'manifest', 'vendor'],
      chunksSortMode: 'dependency',
      bzConfigPath: 'https://source.office.bzdev.net/common/js/config.js',
      nodeEnv: process.env.NODE_ENV,
    }),
    {{/if_and}}
  ])
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new BundleAnalyzerPlugin(),
    {{#if_and htmlwebpackPlugin redirected}}
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['main', 'manifest', 'vendor'],
      chunksSortMode: 'dependency',
      inject: false,
      nodeEnv: process.env.NODE_ENV,
      {{#source}}bzConfigPath: '../../common/js/config.js',{{/source}}
      {{#if_eq source false}}bzConfigPath: 'https://scdn.bozhong.com/source/common/js/config.js',{{/if_eq}}
    }),
    {{/if_and}}
    {{#source}}
    new CopyShareImg(),{{/source}}
  ])
}
