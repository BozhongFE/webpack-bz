const { existsSync } = require('fs');
const { resolve } = require('path');
const assert = require('assert');
const shell = require('shelljs');

const publicPath = '';
const projectPath = '';
const sourcePath = process.env.npm_config_source;
const outputPath = resolve(sourcePath, `.${projectPath}`);
// exp: publicPath = '/wiki/' projectPath = '/activity/wiki/'
assert(publicPath, 'publicPath 填写项目发布地址的路径');
assert(projectPath, 'projectPath 填写项目打包输出的路径');

if (typeof sourcePath === 'undefined') {
  console.log('请先配置打包输出的source根目录');
  console.log('Example: npm config set source "D:\\source"');
  throw new Error('没有配置模块路径');
} else if (!existsSync(sourcePath)) {
  throw new Error('source根目录不存在，请检查配置的 source 根目录是否正确');
}
/**
 * 将分享图复制到输出目录
 */
class CopyShareImg {
  apply(compiler) {
    compiler.plugin('done', (compilation, callback) => {
      console.log('开始将分享图复制到输出目录');
      const shareExists =  existsSync(resolve(__dirname, './src/assets/img/share'));
      if (!shareExists) {
        return console.log('分享源图目录不存在', './src/assets/img/share/');
      }
      shell.cp('-R', resolve(__dirname, './src/assets/img/share'), resolve(outputPath));
      console.log(`分享图已复制到${resolve(outputPath, './share')}`);
      return callback && callback;
    });
  }
};
module.exports = {
  publicPath,{{#source}}
  projectPath,
  CopyShareImg,
  outputPath,{{/source}}
};