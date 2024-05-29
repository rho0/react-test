const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval', //hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'] //아래 entry파일에 해당하는 확장자
    },

    entry: {
        app: './client',
    },

    module: {
        rules:[ {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'] //preset-env 에대한 plugin 설정 (browserslist)
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'],
                plugins: [],
            }
        }]

    },

    output: {
        filename: 'app.js', // 파일명
        path: path.join( __dirname, 'dist'), // 현재 폴더(__dirname)에서 dist를 자동으로 만들어줌
    }
}