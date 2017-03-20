var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pxtorem = require('postcss-pxtorem');

var env = 2;

var config = {
    context: path.join(__dirname),
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json'],
        alias: {
            common     : path.resolve(__dirname, './common'),
            components : path.resolve(__dirname, './components'),
            decorators : path.resolve(__dirname, './decorators'),
            pages      : path.resolve(__dirname, './pages'),
            stores     : path.resolve(__dirname, './stores'),
            styles     : path.resolve(__dirname, './styles'),
        },
    },
    entry: {
        index: './entry/index.js',
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: './[name].bundle.js',
        chunkFilename: './chunk/[name].chunk.js',
    },
    module: {
        loaders:[{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel',
        }, {
            test: /\.less$/,
            loader: 'style!css!postcss!less',
            //loader: 'style!css?modules&importLoaders=1&localIdentName=[path]-[local]!postcss!less',
            //[path][name]__[local]_[hash:base64:4]
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss',
        }, {
            //test: /\.(woff|svg|eot|ttf)\??.*$/,
            test: /\.(woff|eot|ttf)\??.*$/,
            loader: 'url?limit=51200&name=fonts/[name]_[hash:6].[ext]',
        }, {
            test: /\.(svg)$/i,
            loader: 'svg-sprite',
            //把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            include: [
                require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
                path.resolve(__dirname, 'common/svg'),  // 2. 自己私人的 svg 存放目录
            ],  
        },{
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=4096&name=images/[name]_[hash:6].[ext]',
        }]
    },
    postcss: [
        autoprefixer,
        pxtorem({
            rootValue: 100,
            propWhiteList: [],
        }),
    ],
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: process.env.NODE_ENV == 'development', //development, production
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
        }),
        new webpack.ProvidePlugin({
            Const : path.resolve(__dirname, './common/constants'),
            Utils : path.resolve(__dirname, './common/utils'),
            Ajax  : path.resolve(__dirname, './common/ajax'),
        }),
    ],
};

switch (env){
    //正式环境
    case 0:
    case 'build':
        config.output.path = path.resolve(__dirname, '../build/');
        config.output.publicPath = '/static/build/';
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
        break;

    //开发环境1
    case 1:
    default:
        break;
   
    //开发环境 webpack-dev-server
    case 2:
    case 'hot':
        config.entry[1] = 'webpack-dev-server/client?http://localhost:8080/';
        config.entry[2] = 'webpack/hot/only-dev-server';
        config.output.publicPath = 'http://localhost:8080/';
        config.devServer = { inline: true };
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        break;
}

module.exports = config;