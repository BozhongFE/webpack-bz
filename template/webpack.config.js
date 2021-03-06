const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const address = require('address');{{#htmlwebpackPlugin}}
const HtmlWebpackPlugin = require('html-webpack-plugin');{{/htmlwebpackPlugin}}{{#less}}
const autoprefixer = require('autoprefixer');{{/less}}{{#if_or routerHistory source}}
const { {{#routerHistory}}publicPath{{/routerHistory}}{{#if_and routerHistory source}}, {{/if_and}}{{#source}}projectPath, outputPath, CopyShareImg{{/source}} } = require('./bz.config');{{/if_or}}

/**
 * 获取 ip
 */
const getAddressIP = () => {
  const ip = address.ip();
  if (/192(\.[0-9]{1,3}){3}/.test(ip)) return ip;
  return address.ip('以太网') || ip;
};

module.exports = { {{#if_eq htmlwebpackPlugin false}}
  entry: './src/main.js',{{/if_eq}}{{#htmlwebpackPlugin}}
  entry: {
    main: './src/main.js',
    vendor: './src/vendor.js'
  },{{/htmlwebpackPlugin}}
  output: { {{#source}}
    path: outputPath,{{/source}} {{#if_eq source false}}
    path: path.resolve(__dirname, './dist'),{{/if_eq}}{{#if_eq htmlwebpackPlugin false}}
    publicPath: '/dist/',
    filename: 'build.js',
    {{/if_eq}}{{#htmlwebpackPlugin}}
    publicPath: process.env.NODE_ENV === 'production' ? projectPath : undefined,
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
          name: './img/[name].[ext]?[hash]',
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
  devtool: '#eval-source-map',
  plugins: [{{#htmlwebpackPlugin}}
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
      bzConfigPath: '/common/js/config.js',
      nodeEnv: process.env.NODE_ENV,
      inject: false,
      projectPath,
    }),{{/if_eq}}{{/htmlwebpackPlugin}}{{#routerHistory}}
    new webpack.DefinePlugin({
      publicPath: JSON.stringify(publicPath),
      projectPath: JSON.stringify(projectPath),
    }),
    {{/routerHistory}}
  ]
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
      inject: false,{{#source}}
      projectPath,{{/source}}
    }),
    {{/if_and}}
  ])
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false;
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
      nodeEnv: process.env.NODE_ENV,{{#source}}
      projectPath,
      bzConfigPath: '/common/js/config.js',{{/source}}
    }),
    {{/if_and}}
    {{#source}}
    new CopyShareImg(),{{/source}}
  ])
}
