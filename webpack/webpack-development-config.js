let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require("extract-text-webpack-plugin")
let path = require('path')

// this module includes our common configuration and constants
let commonConfig = require('./webpack-common-config.js')


const configure = function() {
  /*
    configure() returns a Javascript object with
    some configuration settings that are common to all environments
  */
  let developmentConfig = commonConfig.configure()

  developmentConfig.devtool = 'eval-source-map'

  // the point where webpack begins inspecting our code and looking for import statments
  developmentConfig.entry = './src/main.ts'

  // webpack expects a 'resolve' object that contains additonal configuration properties
  developmentConfig.output = {
    // the actual folder where webpack writes files to
    path: './built/dev',

    // once webpack has crawled our code and bundled it, output it to this file
    filename: '[name].bundle.[hash].js',
  }

  /*
    webpack expects a 'resolve' object that tells webpack how to resolve file requests for modules
  */
  developmentConfig.resolve = {
    //Cache generated modules and chunks to improve performance for multiple incremental builds.
    cache: true,

    // tell webpack which extensions to process
    extensions: [
      '', // no extension (this includes folders)
      '.js', // javascript
      '.ts', // typescript
      '.css'// css
    ]
    ,
    root: [path.join(__dirname, './src')]
  }

  // webpack expects a 'module' object that contains additonal configuration properties
  developmentConfig.module = {
     loaders: [
       // Typescript
       {
         test: /\.ts$/,
         loader: 'awesome-typescript-loader',
         exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
       }
       ,
       // CSS
       {
          test: /\.css$/,
          exclude: path.join('src', 'app'),
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }
     ]
  }

  // plugins
  developmentConfig.plugins = [
    // create script & style tags
    new HtmlWebpackPlugin({
       template: './src/index.html'
    })
    ,
    // output all found css to this file
    new ExtractTextPlugin("[name].[hash].css")
  ]

  return developmentConfig
}

module.exports = {
  configure: configure
}