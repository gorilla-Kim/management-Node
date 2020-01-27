# Server

React server 와 Express server 둘다 실행하여 둘간의 REST 통신 하기

<https://chaewonkong.github.io/posts/express-with-react.html>
. 


## 프록시(Proxy) 설정하기

react-scripts의 버전이 2 이상인 경우 http-proxy-middleware를 설치해 setupProxy.js라는 파일을 통해 proxy 설정을 해줘야 한다.



### react-scripts 버전이 2 이상인 경우

```
yarn add http-proxy-middleware
```

이후 client/src에 setupProxy.js라는 파일을 생성, 다음 코드를 입력하고 저장한다.

```
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "http://localhost:5000" }));
};
```

http-proxy-middleware는 앱이 실행될 때 src/ 디렉토리 내에서 setupProxy.js 파일을 찾고, 있을 경우 이 파일의 설정을 참고해 proxy를 설정해준다. 우리는 “/api”이라는 상대 경로로 요청이 들어올 경우, localhost:5000의 서버를 이용하도록 설정했다.