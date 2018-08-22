// 파일 및 디렉토리 경로 작업을 위한 경로 유틸리티
const path = require('path');
// 웹팩 모듈 불러오기

module.exports = {
  mode: 'production',
  // 웹팩이 파일 읽는 부분
  entry: './src/app',
  output: {
    // path: output으로 나올 파일이 저장될 경로
                    // __dirname: 현재 모듈의 현재 폴더 위치
    path: path.resolve(__dirname, 'dist'),
    // entry에 {app, vendor}로 들어가 app.js, vendor.js로 결과물이 나와야 한다면
    // filename: '[name].js'으로 써준다.
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ["env"]
        }
      }, {
        loader: 'ts-loader'
      }],
      // 패키지 폴더니까 제외하기 위해 설정
    },
    {
      test: /\.scss$/,
      use: [{
        // CSS를 DOM의 style태그에 출력한다
        loader: 'style-loader',
      }, {
        // 자바스크립트 안에 CSS를 해석한다. 의존성 해결
        loader: 'css-loader',
      }, {
        // Sass를 CSS로 컴파일 한다.
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', 'json'],
    modules: ['node_modules']
  },
  devtool: 'inline-source-map', 
};