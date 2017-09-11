'use strict';
const path = require('path');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/*_spec.jsx'
    ],
    plugins: ['karma-webpack', 'karma-mocha', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-coverage', 'karma-spec-reporter'],
    browsers: ['Chrome', 'PhantomJS'],
    preprocessors: {
      'test/*_spec.jsx': ['webpack']
    },
    reporters: ['spec', 'coverage'],
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
    webpackMiddleware: {
      noInfo: true
    }
  });
};