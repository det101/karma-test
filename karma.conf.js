'use strict';
const path = require('path');

module.exports = function(config) {
  config.set({
    /***
     * 基础路径，用在files，exclude属性上
     */
    basePath: '',

    /**
     * 测试框架
     * 可用的框架：https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['mocha'],

    /**
     * 需要加载到浏览器的文件列表
     */
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/*_spec.jsx'
    ],
    /**
     * 注册插件
     */
    plugins: ['karma-webpack', 'karma-mocha', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-coverage', 'karma-spec-reporter'],
    /**
     * 要测试的浏览器平台
     */
    browsers: ['Chrome', 'PhantomJS'],
    /**
     * 在浏览器使用之前处理匹配的文件
     * 可用的预处理: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      'test/*_spec.jsx': ['webpack']
    },

    /**
     * 使用测试结果报告者
     * 可能的值: "dots", "progress"
     * 可用的报告者：https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['spec', 'coverage'],

    /**
     * 使用reporters为"coverage"时报告输出的类型和那目录
     */
    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'json',
        subdir: '.',
        file: 'coverage.json',
      }, {
        type: 'lcov',
        subdir: '.'
      }, {
        type: 'text-summary'
      }]
    },

    /**
     * webpack 配置， 和webpack配置一致，主要用于前置和转换
     */
    webpack: {
      module: {
        rules: [
          {
              test: /\.jsx?/,
              use: ['babel-loader']
          },
          {
              test: /\.jsx?$/,
              enforce: "pre",
              include: [path.resolve('src/')],
              use: 'isparta-loader'
          }
        ]
      }
    },
  /**
   * 启用或禁用自动检测文件变化进行测试
   */
    autoWatch: true,

    /**
     * 设置webpack-dev-middleware（实现webpack的打包，但可以控制输入和输出）插件的相关参数
     */
    webpackMiddleware: {
      noInfo: true
    }
  });
};