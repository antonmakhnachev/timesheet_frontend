const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const WebpackMd5Hash = require ('webpack-md5-hash');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin'); 
const OptimizeCssAssetsPlugin = require ('optimize-css-assets-webpack-plugin'); // подключаем плагин
const isDev = process.env.NODE_ENV === 'development'; // создаем переменную для development-сборки
const execFile = require('child_process').execFile;
const pngquant = require('pngquant-bin');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const { resolve } = require('path');
const pngquantExec = execFile(pngquant, ['-o', 'output.png', 'input.png']);
module.exports = {
  entry: { 
          main: __dirname + '/src/main.js',
          timesheet: __dirname + '/src/timesheet/timesheet.js',
          staff: __dirname + '/src/staff/staff.js'
        },
  output: {
    path: path.resolve (__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader'
        ],
      }, // настройкa плагина image-webpack-loader
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development") }
    }),
    new MiniCssExtractPlugin ({
      filename: '[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin ({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require ('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin ({
      inject: false,
      template: __dirname + '/src/main.html',
      // filename: 'auth.html',
    }),
    new HtmlWebpackPlugin ({
      inject: false,
      template: __dirname + '/src/timesheet/timesheet.html',
      // filename: 'main.html',
    }),
    new HtmlWebpackPlugin ({
      inject: false,
      template: __dirname + '/src/staff/staff.html',
      // filename: 'staff.html',
    }),
    new webpack.DefinePlugin ({
      NODE_ENV: JSON.stringify (process.env.NODE_ENV),
    }),
    new WebpackMd5Hash (),    
  ],
};
execFile (pngquant, ['-o', 'output.png', 'input.png'], err => {
  console.log ('Image minified!');
});