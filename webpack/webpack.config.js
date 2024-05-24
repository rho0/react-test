const path = require('path'); //node에서 제공

module.exports = {
    name: 'word-relay-setting', //없어도 되는부분
    mode: 'development', //실서비스: production
    devtool: 'eval', //빠르게
    resolve: {
        extensions: ['.js', 'jsx'] //아래 entry에 확장자 안써도 되는 기능
    },

    entry: { // 입력
        app: ['./client'], // client.jsx에서 /WordRelay.jsx를 부르고 있기 때문에 안써도됨.

    },
    output: { //출력
        path: path.join( __dirname, 'dist'), // 현재 폴더(__dirname)에서 dist를 자동으로 만들어줌
        filename: 'app.js' // 파일명
    },

};