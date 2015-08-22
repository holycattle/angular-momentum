var compileSass = require('broccoli-sass');
var compileTypeScript = require('broccoli-typescript');
var compileJade = require('broccoli-jade');
var BroccoliMergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var stew = require('broccoli-stew');

var tsDir = 'src/assets/js';
var scssDir = 'src/assets/css';

var css = compileSass([scssDir], 'app.scss', 'assets/css/app.css');
var js = new Funnel(compileTypeScript(tsDir), {
    destDir: 'assets/js',
});
var html = new Funnel(compileJade('src/assets/html'), {
    destDir: 'assets/html'
});
var indexHtml = compileJade(new Funnel('src', {
    include: ['index.jade']
}));
var lib = new Funnel('src/assets/lib', {
    destDir: 'assets/lib'
});
var img = new Funnel('src/assets/img', {
    destDir: 'assets/img'
});

module.exports = new BroccoliMergeTrees([css, js, html, indexHtml, lib, img]);
