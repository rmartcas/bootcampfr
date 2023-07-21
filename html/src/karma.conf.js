// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const playwright = require('playwright');

process.env.CHROME_BIN = playwright.chromium.executablePath();
process.env.FIREFOX_BIN = playwright.firefox.executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      // leave Jasmine Spec Runner output visible in browser
      clearContext: false
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../target/karma-coverage'),
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 60,
        lines: 60,
        branches: 60,
        functions: 60
      },
      subdir: '.',
        reporters: [
        { type: 'html'},
        { type: 'lcovonly'},
        { type: 'text-summary'}
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      },
      FirefoxHeadlessNoSandbox: {
        base: 'FirefoxHeadless',
        flags: ['--no-sandbox']
      }
    },
    browsers: ['ChromeHeadlessNoSandbox', 'Chrome', 'Firefox', 'FirefoxHeadlessNoSandbox'],
    singleRun: false,
    restartOnFileChange: true
  });
};
