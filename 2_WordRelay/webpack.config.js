const path = require('path'); //node에서 제공
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name: 'word-relay-setting', //없어도 되는부분
    mode: 'development', //실서비스: production
    devtool: 'eval', //빠르게
    resolve: {
        extensions: ['.js', '.jsx'] //아래 entry파일에 해당하는 확장자
    },

    entry: { // 입력
        app: ['./client'], // client.jsx에서 /WordRelay.jsx를 부르고 있기 때문에 안써도됨.

    },

    module: {
      rules: [{ //여러개의 규칙
          test: /\.jsx?/,
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
          },
      }],
    },

    plugins:[
        new RefreshWebpackPlugin() // 플러그인 장착
    ],
    output: { //출력
        path: path.join( __dirname, 'dist'), // 현재 폴더(__dirname)에서 dist를 자동으로 만들어줌
        filename: 'app.js', // 파일명
    },

    devServer: {
        devMiddleware: {publicPath: '/dist'},
        static: {directory: path.resolve(__dirname)},
        hot: true
    }
    //npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D
    // npm i -D webpack-dev-server   
    //package.json을 확인해보면 두가지가 추가되어있음 --> 자동으로 수정사항 반영해줌. npm run webpack하지 않아도됨

};