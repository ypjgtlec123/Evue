// 打包vue的主配置
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

let vueConfig = {
    devServer : {
        port : 8090,
    },
    entry : {
        main : path.join(__dirname,'../src/vue-render/main.js')
    },

    output : {
        path : path.join(__dirname,'../dist/vue'),
        filename : '[name].[hash].js',
    },

    resolve : {
        alias : {
            '@' : path.join(__dirname,'../src/vue-render'),
            'vue$' : 'vue/dist/vue.esm.js'
        },
        extensions : ['.js','.vue','.json','.css','.node'],
        plugins: [new TsconfigPathsPlugin({ configFile: path.join(__dirname,"../tsconfig.json") })]
    },

    module : {
        rules : [
            {
                test : /\.(sass|scss)$/,
                use : ['vue-style-loader','style-loader','css-loader','sass-loader']
            },
            {
                test : /\.less$/,
                use : ['vue-style-loader','style-loader','css-loader','less-loader']
            },
            {
                test : /\.css$/,
                use : ['vue-style-loader','style-loader','css-loader',]
            },
            {
                test : /\.html$/,
                use : 'vue-html-loader'
            },
            {
                test : /\.js$/,
                use : 'babel-loader',
                exclude : /node_modules/
            },
            {
                test : /\.vue$/,
                use : {
                    loader : 'vue-loader',
                    options : {
                        extractCSS : process.env.NODE_ENV == 'production',
                        loaders : {
                            sass : 'vue-style-loader!style-loader!css-loader!sass-loader',
                            scss : 'vue-style-loader!style-loader!css-loader!sass-loader',
                            less : 'vue-style-loader!style-loader!css-loader!less-loader'
                        }
                    }
                }
            },
            {
                test : /\.ts$/,
                loader : 'ts-loader',
                options : { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test : /\.(png|jpe?g|gif|svg)$/,
                use : {
                    loader : 'url-loader',
                    options : {
                        esModule: false, // 设置为false后，图片显示不再为[Object Modules]
                        limit : 10000,
                        name : 'imgs/[name]--[folder].[ext]'
                    }
                }
            },
            {
                test : /\.(mp3|mp4|webm|ogg|wav|flac|aac)$/,
                use : {
                    loader : 'url-loader',
                    options : {
                        limit : 10000,
                        name : 'media/[name]--[folder].[ext]'
                    }
                }
            },
            {
                test : /\.(woff2?|eot|ttf|otf)$/,
                use : {
                    loader : 'url-loader',
                    options : {
                        limit : 10000,
                        name : 'fonts/[name]--[folder].[ext]'
                    }
                }
            }
        ]
    },

    node : {
        __dirname : process.env.NODE_ENV !== 'production'
    },

    plugins : [
        new VueLoaderPlugin(),
        // 提取css
        new MiniCssExtractPlugin({filename : 'style.css'}),
        // 编辑出错时，跳过输出阶段
        // new webpack.NoEmitOnErrorsPlugin(),
        // html处理
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : path.join(__dirname,'../src/vue-render/index.html'),
            minify : {
                // 清除html空格，换行
                collapseWhitespace : true,
                // 在可能的情况下删除引号
                removeAttributeQuotes : true,
                // 清除html的注释
                removeComments : true
            },
            nodeModules : process.env.NODE_ENV == 'production' ? false : path.join(__dirname,'../node_modules')
        })
    ],
};

console.log(`now environment of vue building is : ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV != 'production') {
    vueConfig.mode = 'development';
    vueConfig.devtool = '#cheap-module-eval-source-map';
    // vueConfig.plugins.push(new webpack.NamedModulesPlugin());
    vueConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    vueConfig.target = 'electron-renderer';
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
} 

if (process.env.NODE_ENV == 'production') {
    vueConfig.mode = 'production';
    vueConfig.plugins.push(new CleanWebpackPlugin());
    vueConfig.target = 'electron-main';
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
}

module.exports = vueConfig;